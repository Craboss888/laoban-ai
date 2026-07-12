#!/usr/bin/env python3
"""The Boardroom orchestrator — 手写编排,无框架。

隔离按构造实现:director_blind() 的 prompt 只包含该董事自己的数据切片,
没有其他董事的立场,也没有创始人的倾向——反谄媚是程序保证,不靠恳求。

流程(与 demo 缓存 schema 同构):
    intake → 盲评 ×4(隔离并行)→ 共识度检测 → 证据全公开 → 质证 → memo

用法:
    有 key:ANTHROPIC_API_KEY=... python3 scripts/generate.py
    无 key:python3 scripts/generate.py --dry-run   # 打印管线结构
"""
import argparse
import json
import pathlib

DATA = pathlib.Path(__file__).parent.parent / "data"

ROLES = {
    "cfo": ("finance.csv", "你是 CFO 董事,只能用财务数字论证。"),
    "customer": ("reviews.json", "你是客户董事,只看用户之声与流失风险。"),
    "opposite": ("terms.md", "你是风险董事 Mr. Opposite,绩效按你找出的最强反对理由衡量,不按和气程度。"),
    "market": ("market.md", "你是市场董事,只谈竞品与行业趋势。"),
}

OUT_SPEC = '输出严格 JSON:{"stance":"support|oppose|conditional","prob":0~1,"evidence":[...],"text":"..."}。prob 是你对「涨价综合利大于弊」的主观概率——给数字,不给态度。'


def slice_for(role: str) -> str:
    """该董事的专属数据切片——隔离的技术落点:别的数据根本不进 prompt。"""
    return (DATA / ROLES[role][0]).read_text()


def call(client, system: str, user: str) -> str:
    r = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1200,
        system=system,
        messages=[{"role": "user", "content": user}],
    )
    return r.content[0].text


def director_blind(client, role: str, question: str) -> dict:
    """盲评:prompt 仅含角色授权 + 自己的数据。看不到同侪,看不到创始人倾向。"""
    system = ROLES[role][1] + " 你看不到其他董事,也看不到创始人的倾向。" + OUT_SPEC
    user = f"议题:{question}\n\n你的专属数据:\n{slice_for(role)}"
    return json.loads(call(client, system, user))


def consensus_check(blind: dict) -> float:
    """分歧度 = 概率标准差。过低(<0.05)时应触发强制追问轮而非庆祝。"""
    probs = [b["prob"] for b in blind.values()]
    mean = sum(probs) / len(probs)
    return (sum((p - mean) ** 2 for p in probs) / len(probs)) ** 0.5


def debate(client, question: str, blind: dict) -> list:
    """墙落:全部立场与全部数据公开,每位董事可修正立场(修正要给理由)。"""
    dossier = json.dumps(blind, ensure_ascii=False)
    all_data = "\n\n".join(f"[{r}]\n{slice_for(r)}" for r in ROLES)
    events = []
    for role in ROLES:
        system = ROLES[role][1] + ' 现在全部证据公开,你可以修正立场,修正必须说明是哪条证据说服了你。输出严格 JSON:{"text":"...","stance":"support|oppose|conditional","prob":0~1,"refs":["文件名"]}'
        user = f"议题:{question}\n\n盲评全记录:{dossier}\n\n全部公开数据:\n{all_data}"
        events.append({"speaker": role, **json.loads(call(client, system, user))})
    return events


def memo(client, question: str, blind: dict, events: list) -> dict:
    """秘书起草 Decision Memo。少数派意见原文保留,不许被综合掉。"""
    system = (
        "你是董事会秘书。基于盲评与质证记录起草决策备忘录,输出严格 JSON:"
        '{"recommendation":"...","positions":[{"role","stance","prob","summary"}],'
        '"dissent":[{"role","text"}](少数派原文,禁止和稀泥),"kill_criteria":"可量化否决线",'
        '"premortem":"12 个月后失败的验尸报告怎么写","ruling":null(裁决永远留给创始人)}'
    )
    user = json.dumps({"question": question, "blind": blind, "debate": events}, ensure_ascii=False)
    return json.loads(call(client, system, user))


def run(dry_run: bool) -> None:
    case = json.loads((DATA / "case.json").read_text())
    question = case["question_structured"]["decision"]

    if dry_run:
        print(json.dumps({
            "pipeline": ["intake", "blind×4 (isolated)", "consensus_check",
                         "reveal", "debate", "memo (ruling: 留白给创始人)"],
            "roles": list(ROLES),
            "isolation": {r: ROLES[r][0] for r in ROLES},
            "question": question,
        }, ensure_ascii=False, indent=2))
        return

    import anthropic  # lazy:无 key 环境跑 --dry-run 不需要 SDK
    client = anthropic.Anthropic()

    blind = {r: director_blind(client, r, question) for r in ROLES}  # 生产版可 asyncio 并行
    divergence = consensus_check(blind)
    if divergence < 0.05:
        print(f"⚠ 分歧度过低({divergence:.2f}):按章程应触发强制追问轮", flush=True)
    events = debate(client, question, blind)
    result = {
        "acts": {"act2_blind": blind, "act3_debate": events},
        "divergence": {"blind": round(divergence, 2)},
        "memo": memo(client, question, blind, events),
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="The Boardroom orchestrator")
    ap.add_argument("--dry-run", action="store_true", help="不调 API,打印管线结构")
    run(ap.parse_args().dry_run)
