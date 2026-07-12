#!/usr/bin/env python3
"""Validate cache.js format, required fields, and deliberation beats."""
import json, re, pathlib
src = pathlib.Path(__file__).parent.parent / "site" / "cache.js"
m = re.fullmatch(r"window\.BOARDROOM = (\{.*\});\n?", src.read_text(), re.S)
assert m, "cache.js must match window.BOARDROOM = {...};"
d = json.loads(m.group(1))
for k in ["meta", "roles", "datasets", "acts", "memo"]:
    assert k in d, f"missing {k}"
assert {r["id"] for r in d["roles"]} == {"cfo", "cmo", "customer_rep", "clo", "opposite", "secretary"}
assert len(d["acts"]["act2_blind"]) == 5
# board block: fixed seats + adaptive slots must be coherent with the deliberating cast
assert {p["id"] for p in d["board"]["permanent"]} == {"cfo", "cmo", "customer_rep", "clo"}
assert d["board"]["adaptive_slots"] == 2 and "opposite" in d["board"]["recommended"]
assert len(d["memo"]["dissent"]) >= 2, "expected dissents from both CLO and Mr. Opposite"
hs = [e.get("highlight") for e in d["acts"]["act3_debate"]]
assert "revision" in hs and "dissent_survives" in hs, "missing required deliberation beats"
assert d["memo"]["ruling"] is None and d["memo"]["dissent"] and d["memo"]["kill_criteria"]
for e in d["acts"]["act2_blind"]:
    assert e["evidence"], f"{e['role']} blind review has no evidence citation"
print("CACHE OK:", len(d["acts"]["act3_debate"]), "debate events")
