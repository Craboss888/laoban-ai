# 测试:缓存 schema 与节拍完整性

- **验证什么**:`site/cache.js` 是合法的 `window.BOARDROOM = <JSON>;` 格式;五个顶层键齐全;角色 id 恰为 cfo/customer/opposite/market/secretary;盲评恰 4 席且各有证据引用;质证含两大节拍(`revision` 立场修正、`dissent_survives` 异议幸存);memo 含异议记录与否决线且裁决留白(`ruling: null`)。
- **通过标准**:`python3 scripts/validate_cache.py` 输出 `CACHE OK: N debate events`,退出码 0。
- **运行方式**:项目根目录执行 `python3 scripts/validate_cache.py`。
