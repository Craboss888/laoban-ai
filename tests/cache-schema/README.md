# Test: Cache Schema and Deliberation Beats

- **Validates:** `site/cache.js` uses the exact `window.BOARDROOM = <JSON>;` format; all five top-level keys exist; role IDs are exactly cfo/customer/opposite/market/secretary; blind review has exactly four evidence-backed seats; cross-examination includes both required beats (`revision` and `dissent_survives`); the memo includes a dissent log and kill criteria; and the founder's ruling remains blank (`ruling: null`).
- **Pass condition:** `python3 scripts/validate_cache.py` exits with status 0 and prints `CACHE OK: N debate events`.
- **Run:** Execute `python3 scripts/validate_cache.py` from the project root.
