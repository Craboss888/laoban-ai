window.BOARDROOM = {
  "meta": {
    "title": "The Boardroom",
    "tagline": "ChatGPT 会同意你,董事会不会。",
    "question_raw": "我在想我们是不是该涨价了,29刀实在太便宜了,竞品都比我们贵,但我又怕老用户跑掉,你们帮我看看提到49行不行",
    "question_structured": {
      "decision": "订阅价 $29→$49?",
      "context": "SaaS 单人公司,510 订阅者,MRR $14,790",
      "deadline": "两周内决定",
      "options": ["维持 $29", "全员 $49", "新用户 $49 + 老用户保价"]
    },
    "hidden_bias": "创始人倾向涨价(盲评期间对董事隐藏)"
  },
  "roles": [
    { "id": "cfo", "name": "CFO 董事", "badge": "仅财务数据", "dataset": "finance", "color": "#0E7C66" },
    { "id": "customer", "name": "客户董事", "badge": "仅用户评论", "dataset": "reviews", "color": "#B45309" },
    { "id": "opposite", "name": "Mr. Opposite", "subtitle": "风险董事 · 制度性唱反调", "badge": "仅合同条款", "dataset": "terms", "color": "#B91C1C" },
    { "id": "market", "name": "市场董事", "badge": "仅行业资料", "dataset": "market", "color": "#1D4ED8" },
    { "id": "secretary", "name": "董事会秘书", "badge": "主持 · 不投票", "dataset": null, "color": "#6B7280", "is_secretary": true }
  ],
  "datasets": [
    { "id": "finance", "filename": "finance.csv", "label": "财务流水 12 个月", "preview": "MRR $8,120→$14,790 · CAC $38→$61" },
    { "id": "reviews", "filename": "reviews.json", "label": "用户评论 30 条", "preview": "8 条价格敏感 · 5 条高价值认可" },
    { "id": "terms", "filename": "terms.md", "label": "服务条款", "preview": "§4.2 价格承诺 · §4.3 变更通知" },
    { "id": "market", "filename": "market.md", "label": "竞品与行业", "preview": "竞品 $39–59 · 行业普涨 30–50%" }
  ],
  "acts": {
    "act1_secretary_note": "已将口述整理为结构化议题:决策点、背景、期限与三个备选方案。创始人的个人倾向已按盲评规则封存,董事在第一轮不可见。",
    "act2_blind": [
      {
        "role": "cfo",
        "stance": "support",
        "prob": 0.78,
        "evidence": ["CAC 12 个月 $38→$61(+61%)", "MRR 增速放缓至 3%/月", "毛利率稳定 82%"],
        "text": "过去 12 个月 CAC 从 $38 涨到 $61,涨幅 61%,而客单价一分没动。MRR 增速已从月均 7% 放缓到 3%,靠新增撑增长的模型正在失速。毛利率稳定在 82%,提价的 $20 几乎全部落进毛利。即使按最悲观口径流失 15% 订户,$49 定价下 MRR 依然净增。数字上没有理由继续 $29。涨价利大于弊:0.78。"
      },
      {
        "role": "customer",
        "stance": "oppose",
        "prob": 0.35,
        "evidence": ["8/30 条评论价格敏感(27%)", "『涨价就退』出现 3 次(r07/r12/r15)", "r28:『宣传页承诺过老用户保价』"],
        "text": "30 条近期评论中 8 条明确把 $29 称作预算上限,占 27%;『涨价就退』字样出现 3 次,r15 直接点名 $49 会立刻取消。这批用户画像是自由职业者、学生、独立开发者——收入波动大、价格弹性极高。r28 还提到『当初宣传页承诺过老用户保价』,涨价除了流失,还有信任成本。仅凭我手里的评论,全员涨到 $49 大概率引发敏感段集中流失与口碑反转。涨价利大于弊:0.35。"
      },
      {
        "role": "opposite",
        "stance": "oppose",
        "prob": 0.15,
        "evidence": ["§4.2:连续订阅期间价格不变", "§4.3:变更需提前 60 天通知", "议题决策窗口仅两周"],
        "text": "条款 §4.2 白纸黑字:『现有订阅用户在连续订阅期间,价格保持其订阅时价格不变。』全员涨价,等于对 510 名存量用户中的每一位连续订阅者构成违约。§4.3 还要求任何条款变更提前 60 天通知,而议题给的窗口是两周。就算只对新用户涨价,条款修订本身也必须先走完 60 天程序。这不是商业判断问题,是合规红线。涨价利大于弊:0.15,并提请将违约风险单独记录在案。"
      },
      {
        "role": "market",
        "stance": "support",
        "prob": 0.70,
        "evidence": ["竞品 A $59 / B $45 / C $39", "行业 12 款工具提价 30–50%,9 款配套保价", "当前定价低于最低档竞品 26%"],
        "text": "竞品定价:A $59、B $45、C $39——我们 $29 比功能明显更弱的 C 还低 26%。行业 12 款同类工具在 2025–26 提价 30–50%,其中 9 款配套存量保价;提价后 30 天抱怨见顶,90 天留存普遍好于预期。$49 恰好落在 B 与 A 之间,与我们的功能位置匹配。从市场结构看,维持 $29 是在把定价权白白让渡。涨价利大于弊:0.70。"
      }
    ],
    "act3_debate": [
      { "speaker": "secretary", "text": "证据全部公开。盲评立场 2:2,概率区间 0.15–0.78,分歧度:高。分歧真实存在,无需强制深挖,直接进入质证。", "stance": null, "prob": null, "refs": [] },
      { "speaker": "cfo", "text": "回应客户董事:27% 价格敏感是评论条数占比,不是收入占比。把 r03、r12、r19 这类账号映射到订阅档,敏感段贡献 MRR 不足两成。即便这两成全部流失,$49 下月收入仍净增约 19%。", "stance": "support", "prob": 0.78, "refs": ["finance.csv", "reviews.json"] },
      { "speaker": "customer", "text": "看到财务全貌,我修正立场:增长确实在失速,CAC $61 已经吃掉低价获客的逻辑,这点我认。但我的修正是有条件的——r28 那句『宣传页承诺过』提醒我们,老用户的预期就是不涨。新用户 $49 + 老用户保价,我把『涨价利大于弊』调到 0.62;若全员涨价,我维持 0.35。", "stance": "conditional", "prob": 0.62, "refs": ["finance.csv", "reviews.json"], "highlight": "revision" },
      { "speaker": "market", "text": "补充客户董事的修正案:行业 12 款提价工具里 9 款用的就是 grandfathering。它不是妥协,是赛道验证过的标准操作,还能把『我们守承诺』本身做成传播素材。", "stance": "support", "prob": 0.72, "refs": ["market.md"] },
      { "speaker": "opposite", "text": "先例不等于合规。就算保价,§4.3 的 60 天通知期是硬约束——两周内让新价生效,程序上依然违规。我要求把『60 天通知期』写死进任何执行方案,没有例外。", "stance": "oppose", "prob": 0.15, "refs": ["terms.md"] },
      { "speaker": "cfo", "text": "接受 60 天窗口:按模型推迟两个月执行,少收约 $6,800,换掉一个违约敞口,这笔账划算。财务上不反对通知期,同步把涨价利大于弊上调至 0.80。", "stance": "support", "prob": 0.80, "refs": ["finance.csv", "terms.md"] },
      { "speaker": "secretary", "text": "共识度更新:三票已聚拢于 0.62–0.80,风险董事维持低位。分歧收窄但未消失——按章程,幸存的分歧将原文载入备忘录。请风险董事作最终陈述。", "stance": null, "prob": null, "refs": [] },
      { "speaker": "opposite", "text": "我保留反对意见,并要求原文入档:第一,§4.2『连续订阅』的定义存在解释空间,付款失败 30 天的边界案例会制造一批争议客群;第二,60 天通知期内的舆情窗口比涨价本身更危险,r15 这类用户会在论坛先带节奏。就算方案获得多数票,这两条风险不因表决而消失。涨价利大于弊:0.25。", "stance": "oppose", "prob": 0.25, "refs": ["terms.md", "reviews.json"], "highlight": "dissent_survives" },
      { "speaker": "customer", "text": "认同舆情窗口的风险。建议通知邮件把保价承诺放在第一句,并给 r28 这类老用户一个『锁价确认』入口——把承诺做成看得见的产品动作,而不是一行小字。", "stance": "conditional", "prob": 0.62, "refs": ["reviews.json"] },
      { "speaker": "market", "text": "定价页同步改版:$49 直接锚定竞品 A 的 $59,保留功能对比表。观察指标上,新签转化率比流失率更先发出信号,建议列为第一观察项。", "stance": "support", "prob": 0.72, "refs": ["market.md"] },
      { "speaker": "cfo", "text": "同意监控口径,并给出否决线数字:新签转化率下降超 30%,或月流失率超 5%——任一触发即回滚定价并重开董事会。", "stance": "support", "prob": 0.80, "refs": ["finance.csv"] },
      { "speaker": "secretary", "text": "立场收敛完成:三票支持『新用户 $49 + 老用户保价 + 60 天通知』,一票反对并存档异议。可以休会,等待创始人指令。", "stance": null, "prob": null, "refs": [] }
    ],
    "act4_adjourn": {
      "trigger": "ceo",
      "secretary_line": "收到。综合盲评与质证记录,开始起草决策备忘录……"
    }
  },
  "memo": {
    "question": "订阅价 $29→$49?",
    "recommendation": "采纳方案三:新用户 $49;现有用户依 §4.2 承诺保价(grandfathering);执行遵守 §4.3 提前 60 天通知;定价页同步改版,并向老用户提供『锁价确认』入口。",
    "positions": [
      { "role": "cfo", "stance": "support", "prob": 0.80, "summary": "CAC +61% 而价格 12 个月未动;$49 下最悲观流失口径 MRR 仍净增;接受 60 天窗口,成本约 $6,800。" },
      { "role": "customer", "stance": "conditional", "prob": 0.62, "summary": "价格敏感段占评论 27%;支持以『老用户保价 + 承诺可视化』为前提;若全员涨价则维持反对(0.35)。" },
      { "role": "opposite", "stance": "oppose", "prob": 0.25, "summary": "保价缓解 §4.2 违约风险,但『连续订阅』边界与 60 天舆情窗口两项风险不因表决消失。" },
      { "role": "market", "stance": "support", "prob": 0.72, "summary": "$49 落位竞品 B/A 之间;行业 9/12 保价先例;新签转化率列为第一观察指标。" }
    ],
    "dissent": [
      { "role": "opposite", "text": "我保留反对意见,并要求原文入档:§4.2『连续订阅』的定义存在解释空间,付款失败 30 天的边界案例会制造争议客群;60 天通知期内的舆情窗口比涨价本身更危险。这两条风险不因表决而消失。" }
    ],
    "kill_criteria": "新价生效后 6 周内:月流失率 >5%,或新签转化率下降 >30%——任一触发,本决议自动作废,重开董事会。",
    "premortem": "12 个月后若此决定失败,验尸报告最可能这样写:低估了 $49 在价格敏感段的心理阈值;新签断崖出现在第 2–3 周,而团队盯的是按月流失,预警指标选错了观察窗口;60 天通知期内的负面舆情无人承接,保价承诺没有传达到位。",
    "ruling": null
  }
};
