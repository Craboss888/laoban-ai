#!/usr/bin/env python3
"""Validate the Act 0 three-scene narrative: company -> pressure -> secretary formalization."""
import pathlib

root = pathlib.Path(__file__).resolve().parents[2]
page = (root / "site" / "index.html").read_text()

# Three scene containers drive the in-act progression.
for sid in ("a0s1", "a0s2", "a0s3"):
    assert f'id="{sid}"' in page, f"Act 0 must contain scene container #{sid}"

# Scene 1: second-person company intro with the mock data below it.
assert "Imagine you run an AI newsletter company" in page, "Scene 1 must open with the company intro"
assert "The data on your desk" in page, "Scene 1 must present the mock data as the founder's own files"

# Scene 2: the pressure of deciding alone.
assert "only leader" in page, "Scene 2 must state the founder decides alone"

# Scene 3: secretary figure, editable founder input, formalization output.
assert "assets/secretary.png" in page, "Scene 3 must render the secretary cutout"
assert 'id="secretaryComposer"' in page and 'id="secretaryQuestion"' in page, "Scene 3 must contain the founder question composer"
assert "Ask the Board Secretary" in page, "the composer must submit to the Board Secretary"
assert "Board Secretary" in page and "Formal decision" in page, "Act 0 must identify the Secretary formalization"
assert "existing-reader commitments" in page, "formal decision must record decision scope"

# The cutout asset itself must exist and be non-trivial.
img = root / "site" / "assets" / "secretary.png"
assert img.exists() and img.stat().st_size > 10_000, "site/assets/secretary.png missing or empty"

print("SECRETARY FORMALIZATION OK")
