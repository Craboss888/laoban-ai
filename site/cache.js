window.BOARDROOM = {
  "meta": {
    "title": "The Boardroom",
    "tagline": "ChatGPT will agree with you. Your board won't.",
    "question_raw": "I've been wondering whether we should raise our price. $29 feels far too cheap and every competitor charges more, but I'm worried our existing customers will leave. Should we move to $49?",
    "question_structured": {
      "decision": "Raise the subscription price from $29 to $49?",
      "context": "Solo-founder SaaS, 510 subscribers, $14,790 MRR",
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
    { "id": "cfo", "name": "CFO Director", "badge": "Financials only", "dataset": "finance", "color": "#0E7C66" },
    { "id": "customer", "name": "Customer Director", "badge": "Customer reviews only", "dataset": "reviews", "color": "#B45309" },
    { "id": "opposite", "name": "Mr. Opposite", "subtitle": "Risk Director · Mandated dissenter", "badge": "Terms only", "dataset": "terms", "color": "#B91C1C" },
    { "id": "market", "name": "Market Director", "badge": "Market intelligence only", "dataset": "market", "color": "#1D4ED8" },
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
        "text": "Over the last 12 months, CAC rose 61%, from $38 to $61, while ARPU did not move. Monthly MRR growth has slowed from roughly 7% to 3%, so the acquisition-led growth model is losing momentum. Gross margin remains stable at 82%, meaning nearly all of the additional $20 would flow to gross profit. Even under a pessimistic 15% subscriber-loss scenario, MRR would still increase at $49. The numbers do not support staying at $29. Probability that raising the price creates more value than harm: 0.78."
      },
      {
        "role": "customer",
        "stance": "oppose",
        "prob": 0.35,
        "evidence": ["8 of 30 reviews are price-sensitive (27%)", "Three users explicitly say they will cancel (r07/r12/r15)", "r28 recalls a promise to grandfather existing users"],
        "text": "Eight of the 30 recent reviews explicitly describe $29 as their budget ceiling: 27% of the sample. Three say they will cancel if the price rises, and r15 names $49 directly. These users are freelancers, students, and independent developers with volatile incomes and high price sensitivity. r28 also recalls an explicit promise to grandfather existing customers, creating a trust cost in addition to churn. Based only on the customer evidence available to me, moving everyone to $49 is likely to trigger concentrated churn and reputational damage. Probability that raising the price creates more value than harm: 0.35."
      },
      {
        "role": "opposite",
        "stance": "oppose",
        "prob": 0.15,
        "evidence": ["§4.2 freezes prices during continuous subscriptions", "§4.3 requires 60 days' notice", "The decision window is only two weeks"],
        "text": "Section 4.2 is explicit: existing subscribers retain the price in effect when they subscribed for as long as the subscription remains continuous. Raising prices for all 510 existing subscribers would breach that commitment for every continuous subscriber. Section 4.3 also requires 60 days' notice for any change to the terms, while the stated decision window is two weeks. Even a new-customer-only increase must respect the notice process if the terms are amended. This is not merely a commercial judgment; it is a compliance boundary. Probability that raising the price creates more value than harm: 0.15. I request that the breach risk be recorded separately."
      },
      {
        "role": "market",
        "stance": "support",
        "prob": 0.70,
        "evidence": ["Competitor A $59 / B $45 / C $39", "12 tools raised prices 30–50%; 9 grandfathered existing users", "Current price is 26% below the cheapest competitor"],
        "text": "Competitors charge $59, $45, and $39. Our $29 price is 26% below even the clearly weaker low-end competitor. Twelve comparable products raised prices by 30–50% during 2025–2026; nine grandfathered existing customers. Public complaints peaked within 30 days, while 90-day retention was generally better than expected. A $49 price would sit between Competitors B and A and match our product position. From a market-structure perspective, staying at $29 means surrendering pricing power. Probability that raising the price creates more value than harm: 0.70."
      }
    ],
    "act3_debate": [
      { "speaker": "secretary", "text": "All evidence is now public. Blind-review positions split 2–2, with probabilities ranging from 0.15 to 0.78. Divergence is high. The disagreement is real, so no forced challenge round is required; cross-examination begins now.", "stance": null, "prob": null, "refs": [] },
      { "speaker": "cfo", "text": "In response to the Customer Director: 27% is a share of review count, not revenue. Accounts like r03, r12, and r19 contribute less than 20% of MRR. Even if that entire segment churned, monthly revenue at $49 would still rise by roughly 19%.", "stance": "support", "prob": 0.78, "refs": ["finance.csv", "reviews.json"] },
      { "speaker": "customer", "text": "Having seen the full financial picture, I am revising my position. Growth is slowing, and CAC at $61 undermines the logic of acquiring customers at a low price. But my support is conditional: r28 reminds us that existing customers expect the original price promise to hold. For $49 on new customers plus grandfathering, I raise my probability to 0.62. For a universal increase, I remain at 0.35.", "stance": "conditional", "prob": 0.62, "refs": ["finance.csv", "reviews.json"], "highlight": "revision" },
      { "speaker": "market", "text": "The Customer Director's amendment matches the market evidence: 9 of the 12 products that raised prices used grandfathering. It is not merely a compromise; it is the category's established operating pattern, and keeping the promise can become a positive message in its own right.", "stance": "support", "prob": 0.72, "refs": ["market.md"] },
      { "speaker": "opposite", "text": "Precedent is not compliance. Even with grandfathering, §4.3 imposes a hard 60-day notice period. Making the new price effective within two weeks would still violate the procedure. I require the 60-day period to be written into any execution plan, without exception.", "stance": "oppose", "prob": 0.15, "refs": ["terms.md"] },
      { "speaker": "cfo", "text": "I accept the 60-day window. Delaying implementation by two months costs approximately $6,800 in foregone revenue, which is a rational price for removing a breach exposure. Finance does not oppose the notice period, and I raise my probability to 0.80.", "stance": "support", "prob": 0.80, "refs": ["finance.csv", "terms.md"] },
      { "speaker": "secretary", "text": "Consensus update: three directors have converged between 0.62 and 0.80, while the Risk Director remains materially lower. Divergence has narrowed but has not disappeared. Under the charter, the surviving dissent will be preserved verbatim in the memo. Risk Director, please give your final statement.", "stance": null, "prob": null, "refs": [] },
      { "speaker": "opposite", "text": "I maintain my objection and request that it be entered verbatim. First, the definition of 'continuous subscription' in §4.2 leaves edge cases around payment failures exceeding 30 days, creating a disputed customer cohort. Second, the 60-day notice window creates more reputational risk than the price change itself: users like r15 may frame the story publicly before implementation. A majority vote does not make either risk disappear. Probability that raising the price creates more value than harm: 0.25.", "stance": "oppose", "prob": 0.25, "refs": ["terms.md", "reviews.json"], "highlight": "dissent_survives" },
      { "speaker": "customer", "text": "I agree that the notice period creates a reputational window. Put the price-protection promise in the first sentence of the email and give customers like r28 a visible 'Confirm my locked price' action. Turn the promise into a product action, not fine print.", "stance": "conditional", "prob": 0.62, "refs": ["reviews.json"] },
      { "speaker": "market", "text": "Update the pricing page at the same time. Anchor $49 against Competitor A's $59 and retain the feature-comparison table. New-customer conversion will signal trouble before churn does, so it should be the first monitored metric.", "stance": "support", "prob": 0.72, "refs": ["market.md"] },
      { "speaker": "cfo", "text": "Agreed. Here are the kill criteria: if new-customer conversion falls by more than 30%, or monthly churn exceeds 5%, roll back the price and reconvene the board immediately.", "stance": "support", "prob": 0.80, "refs": ["finance.csv"] },
      { "speaker": "secretary", "text": "Positions have converged: three directors support '$49 for new customers + grandfather existing customers + 60 days' notice.' One director objects, with the dissent preserved. The board may adjourn pending the founder's instruction.", "stance": null, "prob": null, "refs": [] }
    ],
    "act4_adjourn": {
      "trigger": "ceo",
      "secretary_line": "Understood. I am drafting the Decision Memo from the blind-review and cross-examination record."
    }
  },
  "memo": {
    "question": "Raise the subscription price from $29 to $49?",
    "recommendation": "Adopt Option 3: charge new customers $49; grandfather existing customers under §4.2; provide the 60 days' notice required by §4.3; update the pricing page; and give existing customers a visible 'Confirm my locked price' action.",
    "positions": [
      { "role": "cfo", "stance": "support", "prob": 0.80, "summary": "CAC rose 61% while price remained unchanged for 12 months. MRR still increases under a pessimistic churn scenario. Accepts the 60-day delay at an estimated cost of $6,800." },
      { "role": "customer", "stance": "conditional", "prob": 0.62, "summary": "Price-sensitive users represent 27% of reviews. Supports only with grandfathering and a visible price-protection promise; remains opposed at 0.35 if everyone is moved to $49." },
      { "role": "opposite", "stance": "oppose", "prob": 0.25, "summary": "Grandfathering reduces the §4.2 breach risk, but edge cases in 'continuous subscription' and the reputational exposure during the 60-day notice window remain unresolved." },
      { "role": "market", "stance": "support", "prob": 0.72, "summary": "$49 sits between Competitors B and A. Nine of 12 comparable products used grandfathering. New-customer conversion should be the lead monitoring metric." }
    ],
    "dissent": [
      { "role": "opposite", "text": "I maintain my objection and request that it be entered verbatim. The definition of 'continuous subscription' in §4.2 leaves edge cases around payment failures exceeding 30 days, creating a disputed customer cohort. The 60-day notice window may create more reputational risk than the price change itself. A majority vote does not make either risk disappear." }
    ],
    "kill_criteria": "During the first six weeks after the new price takes effect: if monthly churn exceeds 5%, or new-customer conversion falls by more than 30%, this resolution is automatically void. Roll back the price and reconvene the board.",
    "premortem": "If this decision has failed 12 months from now, the postmortem will most likely say: we underestimated the psychological threshold at $49 among price-sensitive customers; new sign-ups collapsed in weeks two and three while the team watched monthly churn, choosing the wrong early-warning window; and nobody managed the negative narrative during the 60-day notice period, so the grandfathering promise failed to reach customers.",
    "ruling": null
  }
};
