#!/usr/bin/env python3
"""Ensure displayed director scores use an intuitive 0–100% support scale."""
import pathlib

page = (pathlib.Path(__file__).resolve().parents[2] / "site" / "index.html").read_text()
assert "function supportPercent(value)" in page, "missing shared support-percent formatter"
assert "SUPPORT FOR THIS DECISION" in page, "memo must explain the score"
assert "DIRECTOR POSITIONS & SUPPORT SCORES" in page, "memo heading must use support scores"
assert "PROBABILITY OF NET BENEFIT" not in page, "legacy probability label must not be viewer-facing"
print("SUPPORT SCORE PRESENTATION OK")
