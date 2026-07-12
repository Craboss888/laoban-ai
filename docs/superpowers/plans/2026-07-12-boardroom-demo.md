# The Boardroom Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 一个 `file://` 直开、零依赖的六幕董事会 demo(缓存回放)+ 评委可读的真编排代码 + 提交材料,18:00 前交付。

**Architecture:** 三单元经一个 schema 通信:mock 数据包 → 手写 Python 编排器(不运行,评委可读)→ 缓存 `site/cache.js` → 静态单页 `site/index.html`(inline CSS/JS,六幕状态机 + 流式渲染)。

**Tech Stack:** 纯 HTML/CSS/JS(无框架无 CDN)· Python3 stdlib(校验器)· anthropic SDK 仅出现在 generate.py 代码文本中(lazy import,不安装不运行)。

## Global Constraints

- 零外部依赖:site/ 不得有任何网络请求/CDN;`file://` 直开必须完整可用
- 数据全 mock(评委已豁免);无 API key,不做 live 重跑
- 提交文案不出现 persona/roleplay/模拟开会词系(上位 spec §6)
- 每个任务结束 commit;任何时刻 `site/index.html` 打开不报错(骨架铁律)
- schema 以本文档 Task 2 的定义为唯一权威,后续任务不得擅改字段名
- deadline 18:00;各任务附时间盒,超盒即启用「降级阶梯」

## 降级阶梯(超时才用,按序砍)

1. 幕 2 打字动画 → 简单渐显(省 ~20min)
2. 幕 0 交互选角 → 静态已选卡片(省 ~15min)
3. 墙落转场动画 → 直接切换 + 文案提示(省 ~15min)
4. 幕 1 秘书整理动画 → 前后对照静态卡(省 ~10min)
5. generate.py 从"完整可跑"降为"核心函数 + 清晰注释"(省 ~15min)
6. **永不砍**:幕 5 Memo 屏、幕 3 两大节拍(立场修正/异议幸存)、分歧仪表、README 首图

## File Structure

```
data/finance.csv reviews.json terms.md market.md case.json   # Task 1
site/cache.js                                                 # Task 2(纯 JSON 体)
scripts/validate_cache.py                                     # Task 2
tests/cache-schema/README.md                                  # Task 2
site/index.html                                               # Task 3(壳+幕5)、Task 4(幕0–4)
tests/e2e-walkthrough/README.md                               # Task 5
output/screenshots/act0.png … act5.png memo-hero.png          # Task 5
scripts/generate.py                                           # Task 6
README.md + docs/submission.md                                # Task 7
```

---

### Task 1: Mock 数据包(时间盒 12:05–12:25)

**Files:** Create: `data/finance.csv`, `data/reviews.json`, `data/terms.md`, `data/market.md`, `data/case.json`

**Interfaces:** Produces: 五个文件,内容与 Task 2 缓存中董事引用的证据**数字/条款一字对应**(评委可能交叉核对)。

内容要求(具体数字,缓存必须引用一致):
- `finance.csv` 列:`month,mrr_usd,subscribers,new_subs,churned,cac_usd,gross_margin_pct`,2025-07 至 2026-06 共 12 行;MRR 从 8,120 涨到 14,790;订阅数 280→510;CAC 从 38 升到 61(获客变贵=涨价论据);毛利率稳定 ~82%
- `reviews.json`:数组 30 条 `{id,user,rating,text,date}`;8 条明确价格敏感("$29 已经是我预算上限"类);5 条盛赞价值("比 $100 的竞品还好用");其余中性
- `terms.md`:服务条款节选;**§4.2 价格承诺:"现有订阅用户在连续订阅期间,价格保持订阅时价格不变"**(幸存分歧引爆点);另含 §4.3 条款变更需提前 60 天通知
- `market.md`:竞品定价表(竞品 A $59/B $45/C $39 功能更弱)+ 一段"同类工具 2025–26 普遍提价 30–50%"行业摘要
- `case.json`:`{"question_raw":"我在想我们是不是该涨价了,29刀实在太便宜了,竞品都比我们贵,但我又怕老用户跑掉,你们帮我看看提到49行不行","question_structured":{"decision":"订阅价 $29→$49?","context":"SaaS 单人公司,510 订阅者,MRR $14,790","deadline":"两周内决定","options":["维持$29","全员$49","新用户$49+老用户保价"]},"hidden_bias":"创始人倾向涨价(盲评期间对董事隐藏)"}`

- [ ] **Step 1:** 写全五个文件(内容按上述要求,一次写完)
- [ ] **Step 2:** 验证:`python3 -c "import csv,json;list(csv.DictReader(open('data/finance.csv')));json.load(open('data/reviews.json'));json.load(open('data/case.json'));print('DATA OK')"` → 输出 `DATA OK`
- [ ] **Step 3:** `git add data/ && git commit -m "feat: mock data pack with terms hook"`

---

### Task 2: 缓存内容 + 校验器(时间盒 12:25–13:10)

**Files:** Create: `site/cache.js`, `scripts/validate_cache.py`, `tests/cache-schema/README.md`

**Interfaces:** Produces: `window.BOARDROOM = <JSON>;`(cache.js 全文格式:首行前缀 `window.BOARDROOM = `,尾 `;`,中间为严格 JSON——校验器据此解析)。schema(**唯一权威,字段名不可改**):

```json
{
  "meta": {"title":"The Boardroom","tagline":"ChatGPT 会同意你,董事会不会。","question_raw":"…","question_structured":{…同case.json…},"hidden_bias":"…"},
  "roles":[{"id":"cfo","name":"CFO 董事","badge":"仅财务数据","dataset":"finance","color":"#0E7C66"},
           {"id":"customer","name":"客户董事","badge":"仅用户评论","dataset":"reviews","color":"#B45309"},
           {"id":"opposite","name":"Mr. Opposite","subtitle":"风险董事·制度性唱反调","badge":"仅合同条款","dataset":"terms","color":"#B91C1C"},
           {"id":"market","name":"市场董事","badge":"仅行业资料","dataset":"market","color":"#1D4ED8"},
           {"id":"secretary","name":"董事会秘书","badge":"主持·不投票","dataset":null,"color":"#6B7280","is_secretary":true}],
  "datasets":[{"id":"finance","filename":"finance.csv","label":"财务流水 12 个月","preview":"MRR $8,120→$14,790 · CAC $38→$61"},
              {"id":"reviews","filename":"reviews.json","label":"用户评论 30 条","preview":"8 条价格敏感 · 5 条高价值认可"},
              {"id":"terms","filename":"terms.md","label":"服务条款","preview":"§4.2 价格承诺 · §4.3 变更通知"},
              {"id":"market","filename":"market.md","label":"竞品与行业","preview":"竞品 $39–59 · 行业普涨 30–50%"}],
  "acts":{
    "act1_secretary_note":"秘书把口述整理为结构化议题的一句说明",
    "act2_blind":[{"role":"cfo","stance":"support","prob":0.78,"evidence":["CAC 12 个月内 $38→$61","毛利率 82% 稳定","MRR 增速放缓至 4%/月"],"text":"从数字看…(120–180字,只引用财务数据)"} ,"…customer(oppose,0.35 留存信心)、opposite(oppose,引§4.2)、market(support,0.7,引竞品价)同结构…"],
    "act3_debate":[{"speaker":"market","text":"…","stance":"support","prob":0.7,"refs":["market.md"]},
                   {"speaker":"customer","text":"看到财务数据后修正…","stance":"conditional","prob":0.62,"refs":["finance.csv","reviews.json"],"highlight":"revision"},
                   {"speaker":"opposite","text":"§4.2 白纸黑字…全员涨价即违约…","stance":"oppose","prob":null,"refs":["terms.md"],"highlight":"dissent_survives"},
                   "…共 10–14 条,含 cfo 回应、secretary 共识度播报 2 条…"],
    "act4_adjourn":{"trigger":"ceo","secretary_line":"收到,开始起草决策备忘录。"}
  },
  "memo":{"question":"订阅价 $29→$49?","recommendation":"新用户 $49,现有用户按 §4.2 保价(grandfathering);6 周观察期",
    "positions":[{"role":"cfo","stance":"support","prob":0.78,"summary":"…"},{"role":"customer","stance":"conditional","prob":0.62,"summary":"…"},{"role":"opposite","stance":"oppose","prob":null,"summary":"…"},{"role":"market","stance":"support","prob":0.7,"summary":"…"}],
    "dissent":[{"role":"opposite","text":"少数派意见原文保留:即使保价方案,§4.3 要求任何条款变更提前 60 天通知,两周内全量生效仍有违约风险。"}],
    "kill_criteria":"新价生效后 6 周内:月流失率 >5% 或 新签转化率下降 >30% → 本决议自动作废,重开董事会",
    "premortem":"12 个月后若失败,验尸报告最可能写:低估了 $49 在价格敏感段的心理阈值;新签断崖但按月流失平滑,预警指标选错了观察窗口。",
    "ruling":null}
}
```

内容节拍(撰写要求):盲评四立场基于**且仅基于**各自 dataset;act3 两大 highlight 必在;分歧从盲评的高分歧(0.35 vs 0.78)经修正收窄但**不归零**;memo 推荐"保价折中"使 opposite 异议真正"幸存"而非被和稀泥。

`scripts/validate_cache.py`(完整代码):

```python
#!/usr/bin/env python3
"""校验 site/cache.js:格式=window.BOARDROOM = <JSON>; 且必备字段/节拍齐全。"""
import json, re, sys, pathlib
src = pathlib.Path(__file__).parent.parent / "site" / "cache.js"
m = re.fullmatch(r"window\.BOARDROOM = (\{.*\});\n?", src.read_text(), re.S)
assert m, "cache.js 必须是 window.BOARDROOM = {...};"
d = json.loads(m.group(1))
for k in ["meta","roles","datasets","acts","memo"]: assert k in d, f"缺 {k}"
assert {r["id"] for r in d["roles"]} == {"cfo","customer","opposite","market","secretary"}
assert len(d["acts"]["act2_blind"]) == 4
hs = [e.get("highlight") for e in d["acts"]["act3_debate"]]
assert "revision" in hs and "dissent_survives" in hs, "缺两大节拍"
assert d["memo"]["ruling"] is None and d["memo"]["dissent"] and d["memo"]["kill_criteria"]
for e in d["acts"]["act2_blind"]: assert e["evidence"], f"{e['role']} 盲评无证据引用"
print("CACHE OK:", len(d["acts"]["act3_debate"]), "debate events")
```

- [ ] **Step 1:** 写 `scripts/validate_cache.py`(如上)
- [ ] **Step 2:** 撰写 `site/cache.js` 全部内容(数字与 data/ 一字对应)
- [ ] **Step 3:** `python3 scripts/validate_cache.py` → `CACHE OK: N debate events`
- [ ] **Step 4:** 写 `tests/cache-schema/README.md`:验证什么=缓存符合 schema 且节拍齐全;通过标准=validate_cache.py 输出 CACHE OK;运行方式=上述命令
- [ ] **Step 5:** `git add site/cache.js scripts/ tests/cache-schema/ && git commit -m "feat: scenario cache + schema validator"`

---

### Task 3: index.html 壳 + 幕 5 Memo 屏(时间盒 13:10–14:30)

**Files:** Create: `site/index.html`(单文件,inline CSS/JS,`<script src="cache.js">` 唯一外引)

**Interfaces:** Consumes: `window.BOARDROOM`(Task 2 schema)。Produces(Task 4 依赖,不可改名):
- 全局状态机:`const App = { act: 0, goto(n), next() }`;每幕一个 `<section id="act0">…"act5">`,`App.goto(n)` 切换 `.active` class
- 流式引擎:`streamText(el, text, {cps=40, onDone})`(requestAnimationFrame 逐字)+ `App.skipAll()`(全部瞬间完成,"跳到结尾"按钮调用)
- 组件渲染均为纯函数:`renderMemo(memo, roles)` 等,输入来自 BOARDROOM

幕 5 结构(治理文件排版,与其他幕的活力形成收束反差):报头(THE BOARDROOM · DECISION MEMO · 日期编号)→ 案由 → 董事会建议(recommendation)→ 四立场行(role 色点+stance 徽章+prob 大数字)→ **异议记录**(独立框,少数派原文,红侧边)→ **否决线**(callout 框)→ Premortem 风险节 → **创始人裁决块**:三按钮「批准建议方案 / 否决 / 修改后批准」,点击后填入裁决文字+时间戳,底注"建议权归董事会,裁决权归创始人"。

- [ ] **Step 1:** 先用 frontend-design skill 定视觉基调(活力简约浅色,选型 token:字体栈/主色/圆角/阴影),再写壳:布局骨架 + App 状态机 + streamText + 幕间导航(底部步进器)
- [ ] **Step 2:** 实现 renderMemo + 裁决交互(此时 act0–4 为占位空 section,不算破骨架)
- [ ] **Step 3:** 浏览器验证:Browser pane 打开 `file://…/site/index.html`,`App.goto(5)`,read_console_messages onlyErrors=空;截图确认异议/概率/否决线/裁决 3 秒可辨
- [ ] **Step 4:** `git add site/index.html && git commit -m "feat: shell + Decision Memo screen (act 5)"`

---

### Task 4: 幕 0–4(时间盒 14:30–16:15,内部按序小提交)

**Files:** Modify: `site/index.html`

**Interfaces:** Consumes: App/streamText/BOARDROOM(Task 3)。各幕实现:
- **幕 0 组建**:圆桌布局(CEO 居中,四董事+秘书环绕,CSS 绝对定位圆周);董事卡=名称+badge 徽章+dataset 徽章;coming soon 行(法务/供应链/公关/电商 PM,灰态);「已连接数据源」四卡(datasets[].label+preview,绿点 ✓);CTA「召开董事会」→ act1
- **幕 1 议题**:question_raw 以口语气泡渐显 → 秘书行(act1_secretary_note)→ question_structured 结构化议题卡(decision/context/deadline/options)滑入;hidden_bias 卡显示后**加锁遮罩**动画+标注"盲评期间对董事隐藏"→ act2
- **幕 2 盲评(墙起)**:四信息舱=圆桌席位外扩为四个独立面板,舱壁边框+「隔离中·仅可见:XX」头;**并行**打字(四路 streamText 同时跑,cps 略错开);完成后各舱翻出立场卡(stance 色徽章+prob 大数字+evidence 列表);**分歧度仪表**(顶部半圆表盘,JS 由四 prob 方差计算,盲评完成时指针摆到"高分歧"红区)→「公开全部证据」按钮
- **幕 3 墙落·讨论**:舱壁 CSS 过渡消失,四数据集卡飞入中央桌面;讨论流=时间线列表逐条流式(speaker 色点+当前 stance chip+refs 小标签);`highlight:"revision"` 条目→立场 chip 从 oppose 滑变 conditional+金色横幅「立场已修正」+仪表指针回摆;`highlight:"dissent_survives"` 条目→红色横幅「异议幸存 → 将载入备忘录」;仪表随每条 stance/prob 更新
- **幕 4 休会**:讨论流尾出现 CEO 专属按钮「结束讨论,请秘书起草备忘录」(全页唯一由"你"触发的推进,视觉强调);点击→秘书行 act4_adjourn.secretary_line→纸张聚合动画→ act5

- [ ] **Step 1:** 幕 0+1,验证(浏览器走查+console 空),`git commit -m "feat: acts 0-1 assemble & intake"`
- [ ] **Step 2:** 幕 2 含分歧仪表,验证四路并行流式无卡顿,`git commit -m "feat: act 2 blind round with isolation pods"`
- [ ] **Step 3:** 幕 3+4,验证两大节拍高亮触发、仪表联动,`git commit -m "feat: acts 3-4 debate & adjourn"`
- [ ] **Step 4:** 全程走查:act0→5 连续走完+「跳到结尾」从 act2 直达 act5 不破状态;console 零报错;`git commit` 收尾修正

---

### Task 5: 打磨 + 自检截图(时间盒 16:15–16:50)

**Files:** Create: `tests/e2e-walkthrough/README.md`, `output/screenshots/act0..act5.png, memo-hero.png`;Modify: `site/index.html`(仅样式微调)

- [ ] **Step 1:** frontend-design 视角过一遍:间距/层级/动效时长;桌面 1280 与窄屏 900 两档不破版
- [ ] **Step 2:** Browser pane 逐幕截图存 `output/screenshots/`;memo-hero.png 为提交首图底稿
- [ ] **Step 3:** 写 `tests/e2e-walkthrough/README.md`:验证什么=六幕连续走查+跳到结尾+裁决交互;通过标准=console 零 error、两大节拍可见、memo 四要素 3 秒可辨;附本次截图路径为证据
- [ ] **Step 4:** `git add -A && git commit -m "polish + e2e walkthrough evidence"`

---

### Task 6: generate.py 真编排代码(时间盒 16:50–17:10)

**Files:** Create: `scripts/generate.py`

**Interfaces:** Consumes: `data/*`;Produces: 与 Task 2 schema 同构的 JSON(写至 stdout)。评委可读性 > 运行性;无 key 环境仅验证 `--dry-run`。

核心结构(完整写入,函数体真实实现,anthropic lazy import):

```python
#!/usr/bin/env python3
"""The Boardroom orchestrator — 手写编排,无框架。
隔离按构造实现:director_blind() 的 prompt 只含该董事自己的数据切片。
用法:ANTHROPIC_API_KEY=… python3 generate.py | 无 key:python3 generate.py --dry-run
"""
import argparse, json, pathlib, sys
DATA = pathlib.Path(__file__).parent.parent / "data"
ROLES = {"cfo": ("finance.csv", "你是 CFO 董事,只能用财务数字论证。"),
         "customer": ("reviews.json", "你是客户董事,只看用户之声与流失风险。"),
         "opposite": ("terms.md", "你是风险董事,绩效按你找出的最强反对理由衡量。"),
         "market": ("market.md", "你是市场董事,只谈竞品与行业趋势。")}
def slice_for(role): return (DATA / ROLES[role][0]).read_text()
def call(client, system, user):
    r = client.messages.create(model="claude-sonnet-5", max_tokens=1200,
        system=system, messages=[{"role":"user","content":user}])
    return r.content[0].text
def director_blind(client, role, question):
    sys_p = ROLES[role][1] + " 输出 JSON:{stance,prob,evidence,text}。你看不到其他董事,也看不到创始人的倾向。"
    return json.loads(call(client, sys_p, f"议题:{question}\n\n你的专属数据:\n{slice_for(role)}"))
def debate(client, question, positions):
    dossier = json.dumps(positions, ensure_ascii=False)  # 墙落:全量证据+立场公开
    events = []
    for role in ROLES:
        sys_p = ROLES[role][1] + " 现在全部证据公开,你可以修正立场。输出 JSON:{text,stance,prob,refs}。"
        events.append({"speaker": role, **json.loads(call(client, sys_p,
            f"议题:{question}\n全部立场与证据:{dossier}\n全部数据:" +
            "\n".join(slice_for(r) for r in ROLES)))})
    return events
def memo(client, question, positions, events):
    sys_p = "你是董事会秘书。起草 Decision Memo JSON:{recommendation,positions,dissent,kill_criteria,premortem,ruling:null}。少数派意见原文保留,不许综合掉。"
    return json.loads(call(client, sys_p, json.dumps({"q":question,"blind":positions,"debate":events}, ensure_ascii=False)))
def run(dry):
    case = json.loads((DATA / "case.json").read_text())
    q = case["question_structured"]["decision"]
    if dry:
        print(json.dumps({"pipeline":["intake","blind×4(isolated)","consensus_check","reveal","debate","memo"],
                          "roles":list(ROLES),"question":q}, ensure_ascii=False, indent=2)); return
    import anthropic; client = anthropic.Anthropic()
    blind = {r: director_blind(client, r, q) for r in ROLES}   # 生产版:asyncio 并行
    events = debate(client, q, blind)
    print(json.dumps({"acts":{"act2_blind":blind,"act3_debate":events},
                      "memo":memo(client, q, blind, events)}, ensure_ascii=False, indent=2))
if __name__ == "__main__":
    run(argparse.ArgumentParser().parse_args(["--dry-run"] if "--dry-run" in sys.argv else []) or "--dry-run" in sys.argv)
```

(执行时把最后两行写规范:`ap.add_argument("--dry-run", action="store_true")`。)

- [ ] **Step 1:** 写文件;`python3 -m py_compile scripts/generate.py` → 无输出即通过
- [ ] **Step 2:** `python3 scripts/generate.py --dry-run` → 打印 pipeline JSON
- [ ] **Step 3:** `git add scripts/generate.py && git commit -m "feat: hand-rolled orchestrator (judge-readable)"`

---

### Task 7: README + 提交材料 + 部署决策(时间盒 17:10–17:40)

**Files:** Create: `README.md`, `docs/submission.md`;Modify: 无

- [ ] **Step 1:** `README.md`:首行 tagline「ChatGPT 会同意你,董事会不会。」+ memo-hero.png 首图 + 三段:是什么(反谄媚决策治理层/dissent log/kill criteria 词系)· 怎么跑(`open site/index.html`)· 机制(盲评隔离→墙落质证→治理文件;роль差异来自数据管道非人设)+ 路线图节(领域语料/异构模型/董事 marketplace,明标路线图)。禁词自查:persona/roleplay/模拟开会不出现
- [ ] **Step 2:** `docs/submission.md`:参赛表单文案(一句话定位/痛点/机制差异/主题对齐 Sovereignty 段)+ 截图清单
- [ ] **Step 3:** **17:00 部署决策点**(问用户):部署→GitHub Pages(`gh-pages` 或 Settings,需用户配合 push 凭证);不部署→提交材料写本地运行说明
- [ ] **Step 4:** `git add -A && git commit -m "docs: README + submission materials"`;若部署:push(需用户凭证)

---

### Task 8: 缓冲 + 最终验收(17:40–18:00)

- [ ] 重跑 `python3 scripts/validate_cache.py` + 浏览器全程走查(console 零报错)
- [ ] 对照 spec §11 验收三条,逐条留证据
- [ ] 最终 commit;向用户报告 ✅/⚠️ 清单

## Self-Review

- **Spec coverage**:六幕 ✓(T3/T4)· mock 数据 ✓(T1)· schema ✓(T2)· 无框架编排 ✓(T6)· README §6 纪律 ✓(T7)· 验收 ✓(T5/T8)· 部署后置 ✓(T7 Step3)· 降级阶梯覆盖超时风险 ✓
- **Placeholder scan**:cache.js 的"…同结构…"为**内容撰写要求**(节拍/数字/立场已完全指定),非实现空洞;其余无 TBD
- **Type consistency**:App.goto/streamText/BOARDROOM 字段在 T2/T3/T4 间一致;role id 五处统一 cfo/customer/opposite/market/secretary
