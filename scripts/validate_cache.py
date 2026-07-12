#!/usr/bin/env python3
"""校验 site/cache.js:格式=window.BOARDROOM = <JSON>; 且必备字段/节拍齐全。"""
import json, re, pathlib
src = pathlib.Path(__file__).parent.parent / "site" / "cache.js"
m = re.fullmatch(r"window\.BOARDROOM = (\{.*\});\n?", src.read_text(), re.S)
assert m, "cache.js 必须是 window.BOARDROOM = {...};"
d = json.loads(m.group(1))
for k in ["meta", "roles", "datasets", "acts", "memo"]:
    assert k in d, f"缺 {k}"
assert {r["id"] for r in d["roles"]} == {"cfo", "customer", "opposite", "market", "secretary"}
assert len(d["acts"]["act2_blind"]) == 4
hs = [e.get("highlight") for e in d["acts"]["act3_debate"]]
assert "revision" in hs and "dissent_survives" in hs, "缺两大节拍"
assert d["memo"]["ruling"] is None and d["memo"]["dissent"] and d["memo"]["kill_criteria"]
for e in d["acts"]["act2_blind"]:
    assert e["evidence"], f"{e['role']} 盲评无证据引用"
print("CACHE OK:", len(d["acts"]["act3_debate"]), "debate events")
