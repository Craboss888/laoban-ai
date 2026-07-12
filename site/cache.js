window.BOARDROOM = {
  "meta": {
    "title": "laoban.ai",
    "tagline": "AI might agree with you. Your board won't.",
    "question_raw": "We have outgrown $29, but if we ask $49, will readers who trusted us feel punished?",
    "question_structured": {
      "decision": "Should the monthly subscription price move from $29 to $49?",
      "context": "AI news subscription with existing-reader price commitments",
      "deadline": "Decision required within two weeks",
      "options": ["Keep $29", "Move everyone to $49", "$49 for new customers + grandfather existing customers"]
    },
    "hidden_bias": "The founder leans toward raising the price (hidden from directors during blind review)"
  },
  "board": {
    "founder": { "id": "founder", "name": "Founder", "subtitle": "Head of the table · Final ruling" },
    "permanent": [
      { "id": "cfo", "name": "CFO", "subtitle": "Finance", "color": "#0E7C66" },
      { "id": "cmo", "name": "CMO", "subtitle": "Market & Growth", "color": "#1D4ED8" },
      { "id": "customer_rep", "name": "Customer Representative", "subtitle": "Voice of real customers", "color": "#B45309" },
      { "id": "clo", "name": "CLO", "subtitle": "Legal & Compliance", "color": "#6D28D9" }
    ],
    "adaptive_slots": 2,
    "recommended": ["opposite", null],
    "candidates": [
      { "id": "opposite", "name": "Mr. Opposite", "subtitle": "Mandated dissenter", "expertise": "Challenges the founder's strongest assumption", "why": "Recommended because this decision begins with a stated founder preference", "color": "#B91C1C", "recommended": true },
      { "id": "cto", "name": "CTO", "subtitle": "Technology & Delivery", "expertise": "Technical constraints, delivery cost, and platform risk", "color": "#0369A1" },
      { "id": "cpo", "name": "Chief Product Officer", "subtitle": "Product & Adoption", "expertise": "Packaging, product value, and adoption trade-offs", "color": "#7C3AED" },
      { "id": "cdo", "name": "Chief Design Officer", "subtitle": "Experience & Communication", "expertise": "Experience quality, trust, and communication clarity", "color": "#DB2777" },
      { "id": "psychologist", "name": "Behavioral Psychologist", "subtitle": "Behavior & Decision Science", "expertise": "Pricing thresholds, anchoring, and customer response", "color": "#C2410C" },
      { "id": "people", "name": "Chief People Officer", "subtitle": "People & Organization", "expertise": "Capacity, incentives, and organizational impact", "color": "#4D7C0F" }
    ]
  },
  "roles": [
    { "id": "cfo", "name": "CFO", "badge": "Financials only", "dataset": "finance", "color": "#0E7C66" },
    { "id": "cmo", "name": "CMO", "badge": "Market intelligence only", "dataset": "market", "color": "#1D4ED8" },
    { "id": "customer_rep", "name": "Customer Representative", "badge": "Customer reviews only", "dataset": "reviews", "color": "#B45309" },
    { "id": "clo", "name": "CLO", "badge": "Terms & compliance only", "dataset": "terms", "color": "#6D28D9" },
    { "id": "opposite", "name": "Mr. Opposite", "subtitle": "Mandated dissenter · Adaptive seat", "badge": "No data pipeline · Agenda only", "dataset": null, "color": "#B91C1C" },
    { "id": "secretary", "name": "Board Secretary", "badge": "Chair · Non-voting", "dataset": null, "color": "#6B7280", "is_secretary": true }
  ],
  "datasets": [
    { "id": "finance", "filename": "finance.csv", "label": "12 months of financials", "preview": "MRR $8,120→$14,790 · CAC $38→$61" },
    { "id": "reviews", "filename": "reviews.json", "label": "30 customer reviews", "preview": "8 price-sensitive · 5 strong value signals" },
    { "id": "terms", "filename": "terms.md", "label": "Terms of Service", "preview": "§4.2 Price protection · §4.3 Notice period" },
    { "id": "market", "filename": "market.md", "label": "Competitors and market", "preview": "Competitors $39–59 · Category increases 30–50%" }
  ],
  "acts": {
    "act1_secretary_note": "I have converted the founder's statement into a formal agenda: the decision, context, deadline, and three options. The founder's preference has been sealed and is invisible to directors during the first round.",
    "act2_blind": [
      {
        "role": "cfo",
        "stance": "support",
        "prob": 0.78,
        "evidence": ["CAC rose from $38 to $61 in 12 months (+61%)", "Monthly MRR growth slowed to 3%", "Gross margin remains stable at 82%"],
        "text": "Over the last 12 months, CAC rose 61%, from $38 to $61, while ARPU did not move. Monthly MRR growth has slowed from roughly 7% to 3%, so the acquisition-led growth model is losing momentum. Gross margin remains stable at 82%, meaning nearly all of the additional $20 would flow to gross profit. Even under a pessimistic 15% subscriber-loss scenario, MRR would still increase at $49. The numbers do not support staying at $29. Support for this decision: 78%."
      },
      {
        "role": "cmo",
        "stance": "support",
        "prob": 0.70,
        "evidence": ["Competitor A $59 / B $45 / C $39", "12 tools raised prices 30–50%; 9 grandfathered existing users", "Current price is 26% below the cheapest competitor"],
        "text": "Competitors charge $59, $45, and $39. Our $29 price is 26% below even the clearly weaker low-end competitor. Twelve comparable products raised prices by 30–50% during 2025–2026; nine grandfathered existing customers. Public complaints peaked within 30 days, while 90-day retention was generally better than expected. A $49 price would sit between Competitors B and A and match our product position. From a market-structure perspective, staying at $29 means surrendering pricing power. Support for this decision: 70%."
      },
      {
        "role": "customer_rep",
        "stance": "oppose",
        "prob": 0.35,
        "evidence": ["8 of 30 reviews are price-sensitive (27%)", "Three users explicitly say they will cancel (r07/r12/r15)", "r28 recalls a promise to grandfather existing users"],
        "text": "Eight of the 30 recent reviews explicitly describe $29 as their budget ceiling: 27% of the sample. Three say they will cancel if the price rises, and r15 names $49 directly. These users are freelancers, students, and independent developers with volatile incomes and high price sensitivity. r28 also recalls an explicit promise to grandfather existing customers, creating a trust cost in addition to churn. Based only on the customer evidence available to me, moving everyone to $49 is likely to trigger concentrated churn and reputational damage. Support for this decision: 35%."
      },
      {
        "role": "clo",
        "stance": "oppose",
        "prob": 0.15,
        "evidence": ["§4.2 freezes prices during continuous subscriptions", "§4.3 requires 60 days' notice", "The decision window is only two weeks"],
        "text": "Section 4.2 is explicit: existing subscribers retain the price in effect when they subscribed for as long as the subscription remains continuous. Raising prices on all 510 existing subscribers would breach that commitment for every continuous subscriber. Section 4.3 also requires 60 days' notice for any change to the terms, while the stated decision window is two weeks. Even a new-customer-only increase must respect the notice process if the terms are amended. As counsel I must state this plainly: this is not merely a commercial judgment; it is a compliance boundary. Support for this decision: 15%. I request that the breach risk be recorded separately."
      },
      {
        "role": "opposite",
        "stance": "oppose",
        "prob": 0.20,
        "evidence": ["Anchoring: $49 is borrowed from competitor price lists, not from customer value evidence", "Asymmetry: churned trust cannot be restored by rolling a price back"],
        "text": "I hold no dataset, by design. My mandate is to build the strongest case against, so here are two challenges to the framing itself. First, anchoring: the $49 figure is borrowed from competitor price lists, not from any evidence that our customers value us at $49 — 'everyone charges more' is what sycophancy sounds like when it wears a spreadsheet. Second, asymmetry: if the increase underperforms, the price can be rolled back, but the customers and trust we lose do not roll back with it. Until this board can name, in numbers, the conditions under which this decision is wrong, my answer is no. Support for this decision: 20%."
      }
    ],
    "act3_debate": [
      { "speaker": "secretary", "text": "All evidence is now public. Blind review split two in support against three opposed, with support scores spanning 15% to 78%. Divergence is high. The disagreement is real, so no forced challenge round is required; cross-examination begins now.", "stance": null, "prob": null, "refs": [] },
      { "speaker": "cfo", "text": "In response to the Customer Representative: 27% is a share of review count, not revenue. Accounts like r03, r12, and r19 contribute less than 20% of MRR. Even if that entire segment churned, monthly revenue at $49 would still rise by roughly 19%.", "stance": "support", "prob": 0.78, "refs": ["finance.csv", "reviews.json"] },
      { "speaker": "customer_rep", "text": "Having seen the full financial picture, I am revising my position. Growth is slowing, and CAC at $61 undermines the logic of acquiring customers at a low price. But my support is conditional: r28 reminds us that existing customers expect the original price promise to hold. For $49 on new customers plus grandfathering, I raise my support to 62%. For a universal increase, I remain at 35%.", "stance": "conditional", "prob": 0.62, "refs": ["finance.csv", "reviews.json"], "highlight": "revision" },
      { "speaker": "cmo", "text": "The Customer Representative's amendment matches the market evidence: 9 of the 12 products that raised prices used grandfathering. It is not merely a compromise; it is the category's established operating pattern, and keeping the promise can become a positive message in its own right.", "stance": "support", "prob": 0.72, "refs": ["market.md"] },
      { "speaker": "clo", "text": "Precedent is not compliance. Even with grandfathering, §4.3 imposes a hard 60-day notice period. Making the new price effective within two weeks would still violate the procedure. I require the 60-day period to be written into any execution plan, without exception.", "stance": "oppose", "prob": 0.15, "refs": ["terms.md"] },
      { "speaker": "cfo", "text": "I accept the 60-day window. Delaying implementation by two months costs approximately $6,800 in foregone revenue, which is a rational price for removing a breach exposure. Finance does not oppose the notice period, and I raise my support to 80%.", "stance": "support", "prob": 0.80, "refs": ["finance.csv", "terms.md"] },
      { "speaker": "opposite", "text": "Precedent tells us what usually happens; it does not tell us when we are wrong. My demand is procedural: this board does not sign a memo without kill criteria. Name the numbers that void this decision automatically — otherwise optimism gets to grade its own homework.", "stance": "oppose", "prob": 0.20, "refs": [] },
      { "speaker": "cfo", "text": "Accepted. Here are the tripwires: if new-customer conversion falls by more than 30%, or monthly churn exceeds 5% within the first six weeks, the price rolls back automatically and this board reconvenes.", "stance": "support", "prob": 0.80, "refs": ["finance.csv"] },
      { "speaker": "secretary", "text": "Consensus update: three directors now show 62–80% support, while the CLO and Mr. Opposite remain materially lower. Divergence has narrowed but has not disappeared. Under the charter, surviving dissent will be preserved verbatim in the memo. Final statements, please.", "stance": null, "prob": null, "refs": [] },
      { "speaker": "clo", "text": "I maintain my objection and request that it be entered verbatim. First, the definition of 'continuous subscription' in §4.2 leaves edge cases around payment failures exceeding 30 days, creating a disputed customer cohort. Second, the 60-day notice window creates more reputational exposure than the price change itself: users like r15 may frame the story publicly before implementation. Grandfathering narrows the breach risk, so I move from 15% to 32% support — but a majority vote does not make either risk disappear.", "stance": "oppose", "prob": 0.32, "refs": ["terms.md", "reviews.json"], "highlight": "dissent_survives" },
      { "speaker": "opposite", "text": "The tripwires now exist because someone at this table was paid to say no — that is the seat working as designed. Record my residual objection: the $49 anchor was still born from competitor pricing rather than customer value, and the irreversibility still sits with the customers we lose, not with us. Support for this decision: 28%.", "stance": "oppose", "prob": 0.28, "refs": [] },
      { "speaker": "customer_rep", "text": "I agree that the notice period creates a reputational window. Put the price-protection promise in the first sentence of the email and give customers like r28 a visible 'Confirm my locked price' action. Turn the promise into a product action, not fine print.", "stance": "conditional", "prob": 0.62, "refs": ["reviews.json"] },
      { "speaker": "cmo", "text": "Update the pricing page at the same time. Anchor $49 against Competitor A's $59 and retain the feature-comparison table. New-customer conversion will signal trouble before churn does, so it should be the first monitored metric.", "stance": "support", "prob": 0.72, "refs": ["market.md"] },
      { "speaker": "secretary", "text": "Positions have converged: three directors support '$49 for new customers + grandfather existing customers + 60 days' notice.' Two directors object, and both dissents are preserved verbatim. The board may adjourn pending the founder's instruction.", "stance": null, "prob": null, "refs": [] }
    ],
    "act3_discussion": {
      "founder_prompt": {
        "label": "FOUNDER INPUT · DEMO PROMPT LOADED",
        "default_text": "I hear the financial case, but I will not break a promise to existing readers. What would a compliant, reversible move to $49 look like?",
        "placeholder": "Ask the board a follow-up question…"
      },
      "rounds": [
        { "label": "ROUND 1 · RECONCILE THE EVIDENCE", "event_indexes": [0, 1, 2, 3, 4] },
        { "label": "ROUND 2 · RESPOND TO THE FOUNDER", "event_indexes": [5, 6, 7, 8] },
        { "label": "ROUND 3 · RECORD THE RESIDUAL DISSENT", "event_indexes": [9, 10, 11, 12, 13] }
      ]
    },
    "act4_adjourn": {
      "trigger": "ceo",
      "secretary_line": "Understood. I am drafting the Decision Memo from the blind-review and cross-examination record."
    }
  },
  "memo": {
    "question": "Should the monthly subscription price move from $29 to $49?",
    "recommendation": "Adopt Option 3: charge new customers $49; grandfather existing customers under §4.2; provide the 60 days' notice required by §4.3; update the pricing page; and give existing customers a visible 'Confirm my locked price' action.",
    "positions": [
      { "role": "cfo", "stance": "support", "prob": 0.80, "summary": "CAC rose 61% while price remained unchanged for 12 months. MRR still increases under a pessimistic churn scenario. Accepts the 60-day delay at an estimated cost of $6,800 and supplied the kill-criteria numbers." },
      { "role": "cmo", "stance": "support", "prob": 0.72, "summary": "$49 sits between Competitors B and A. Nine of 12 comparable products used grandfathering. New-customer conversion should be the lead monitoring metric." },
      { "role": "customer_rep", "stance": "conditional", "prob": 0.62, "summary": "Price-sensitive users represent 27% of reviews. Supports only with grandfathering and a visible price-protection promise; gives a universal move to $49 only 35% support." },
      { "role": "clo", "stance": "oppose", "prob": 0.32, "summary": "Grandfathering narrows the §4.2 breach risk, but edge cases in 'continuous subscription' and the reputational exposure during the 60-day notice window remain unresolved." },
      { "role": "opposite", "stance": "oppose", "prob": 0.28, "summary": "Anchoring and irreversibility objections stand: $49 derives from competitor prices, not customer value. Demanded — and obtained — automatic kill criteria before any signature." }
    ],
    "dissent": [
      { "role": "clo", "text": "I maintain my objection and request that it be entered verbatim. The definition of 'continuous subscription' in §4.2 leaves edge cases around payment failures exceeding 30 days, creating a disputed customer cohort. The 60-day notice window may create more reputational exposure than the price change itself. A majority vote does not make either risk disappear." },
      { "role": "opposite", "text": "Record my residual objection: the $49 anchor was born from competitor pricing rather than customer value, and the irreversibility sits with the customers we lose, not with us. The tripwires exist because this seat was paid to say no." }
    ],
    "kill_criteria": "During the first six weeks after the new price takes effect: if monthly churn exceeds 5%, or new-customer conversion falls by more than 30%, this resolution is automatically void. Roll back the price and reconvene the board.",
    "premortem": "If this decision has failed 12 months from now, the postmortem will most likely say: we underestimated the psychological threshold at $49 among price-sensitive customers; new sign-ups collapsed in weeks two and three while the team watched monthly churn, choosing the wrong early-warning window; and nobody managed the negative narrative during the 60-day notice period, so the grandfathering promise failed to reach customers.",
    "ruling": null
  }
};
