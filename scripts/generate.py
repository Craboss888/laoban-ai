#!/usr/bin/env python3
"""The Boardroom orchestrator — hand-rolled and framework-free.

Isolation is enforced by construction: director_blind() receives only that
director's evidence slice. It receives neither peer positions nor the founder's
private preference. Anti-sycophancy is therefore a program constraint, not a
request in a shared prompt.

Pipeline (matching the demo cache schema):
    intake → 4 isolated blind reviews → consensus check → evidence reveal
    → cross-examination → Decision Memo

Usage:
    With a key: ANTHROPIC_API_KEY=... python3 scripts/generate.py
    Without a key: python3 scripts/generate.py --dry-run
"""
import argparse
import json
import pathlib

DATA = pathlib.Path(__file__).parent.parent / "data"

ROLES = {
    "cfo": ("finance.csv", "You are the CFO Director. Support every claim with financial evidence."),
    "customer": ("reviews.json", "You are the Customer Director. Focus on customer voice and churn risk."),
    "opposite": (
        "terms.md",
        "You are Mr. Opposite, the Risk Director. Your performance is measured by the strongest objection you uncover, not by harmony.",
    ),
    "market": ("market.md", "You are the Market Director. Focus on competitors and category trends."),
}

OUT_SPEC = (
    'Return strict JSON: {"stance":"support|oppose|conditional","prob":0.0,'
    '"evidence":["..."],"text":"..."}. "prob" is your subjective probability '
    'that raising the price creates more value than harm. Give a number, not a vague attitude.'
)


def slice_for(role: str) -> str:
    """Return the role's exclusive evidence slice; no other dataset enters the prompt."""
    return (DATA / ROLES[role][0]).read_text()


def call(client, system: str, user: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1200,
        system=system,
        messages=[{"role": "user", "content": user}],
    )
    return response.content[0].text


def director_blind(client, role: str, question: str) -> dict:
    """Blind review: role mandate plus one evidence slice, with no peer or founder context."""
    system = (
        ROLES[role][1]
        + " You cannot see any other director's work or the founder's private preference. "
        + OUT_SPEC
    )
    user = f"Decision: {question}\n\nYour exclusive evidence:\n{slice_for(role)}"
    return json.loads(call(client, system, user))


def consensus_check(blind: dict) -> float:
    """Divergence is probability standard deviation; values below .05 require challenge."""
    probs = [position["prob"] for position in blind.values()]
    mean = sum(probs) / len(probs)
    return (sum((prob - mean) ** 2 for prob in probs) / len(probs)) ** 0.5


def debate(client, question: str, blind: dict) -> list:
    """Reveal all evidence and positions, then let every director revise with attribution."""
    dossier = json.dumps(blind, ensure_ascii=False)
    all_data = "\n\n".join(f"[{role}]\n{slice_for(role)}" for role in ROLES)
    events = []
    for role in ROLES:
        system = (
            ROLES[role][1]
            + ' All evidence is now public. You may revise your position, but must name the evidence that changed it. '
            + 'Return strict JSON: {"text":"...","stance":"support|oppose|conditional","prob":0.0,"refs":["filename"]}.'
        )
        user = (
            f"Decision: {question}\n\nBlind-review record: {dossier}"
            f"\n\nAll revealed evidence:\n{all_data}"
        )
        events.append({"speaker": role, **json.loads(call(client, system, user))})
    return events


def memo(client, question: str, blind: dict, events: list) -> dict:
    """Draft the Decision Memo while preserving minority opinions verbatim."""
    system = (
        "You are the Board Secretary. Draft a strict JSON Decision Memo from the blind-review and cross-examination record: "
        '{"recommendation":"...","positions":[{"role":"...","stance":"...","prob":0.0,"summary":"..."}],'
        '"dissent":[{"role":"...","text":"verbatim minority opinion"}],'
        '"kill_criteria":"quantified automatic revocation thresholds",'
        '"premortem":"how this decision failed 12 months later","ruling":null}. '
        "Never synthesize away a minority opinion. The ruling must remain null for the founder."
    )
    user = json.dumps({"question": question, "blind": blind, "debate": events}, ensure_ascii=False)
    return json.loads(call(client, system, user))


def run(dry_run: bool) -> None:
    case = json.loads((DATA / "case.json").read_text())
    question = case["question_structured"]["decision"]

    if dry_run:
        print(
            json.dumps(
                {
                    "pipeline": [
                        "intake",
                        "blind×4 (isolated)",
                        "consensus_check",
                        "reveal",
                        "cross_examination",
                        "memo (founder's ruling left blank)",
                    ],
                    "roles": list(ROLES),
                    "isolation": {role: ROLES[role][0] for role in ROLES},
                    "question": question,
                },
                ensure_ascii=False,
                indent=2,
            )
        )
        return

    import anthropic  # Lazy import: --dry-run needs neither the SDK nor an API key.

    client = anthropic.Anthropic()
    blind = {role: director_blind(client, role, question) for role in ROLES}
    divergence = consensus_check(blind)
    if divergence < 0.05:
        print(
            f"⚠ Divergence is too low ({divergence:.2f}); the charter requires a forced challenge round.",
            flush=True,
        )
    events = debate(client, question, blind)
    result = {
        "acts": {
            "act2_blind": [{"role": role, **position} for role, position in blind.items()],
            "act3_debate": events,
        },
        "divergence": {"blind": round(divergence, 2)},
        "memo": memo(client, question, blind, events),
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="The Boardroom orchestrator")
    parser.add_argument("--dry-run", action="store_true", help="Print the pipeline without calling an API")
    run(parser.parse_args().dry_run)
