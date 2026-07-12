#!/usr/bin/env python3
"""Validate the deterministic Founder intervention and discussion-round contract."""
import json
import pathlib
import re

src = pathlib.Path(__file__).resolve().parents[2] / "site" / "cache.js"
match = re.fullmatch(r"window\.BOARDROOM = (\{.*\});\n?", src.read_text(), re.S)
assert match, "cache.js must match window.BOARDROOM = {...};"
data = json.loads(match.group(1))
discussion = data["acts"]["act3_discussion"]
assert discussion["founder_prompt"]["default_text"].strip(), "Founder prompt must be preloaded"
assert len(discussion["rounds"]) == 3, "expected three discussion rounds"
indexes = [index for round_ in discussion["rounds"] for index in round_["event_indexes"]]
assert indexes == list(range(len(data["acts"]["act3_debate"]))), "rounds must cover the transcript once, in order"
page = (pathlib.Path(__file__).resolve().parents[2] / "site" / "index.html").read_text()
act4 = page[page.index("async act4(run)"):page.index("async act5(run)")]
assert act4.index("showFounderComposer(run);") < act4.index("await playDiscussionRound(0, run);"), "Founder composer must exist before round one starts"
print("FOUNDER DISCUSSION CACHE OK")
