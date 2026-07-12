# Founder Multi-Round Discussion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the post-reveal discussion into a deterministic, multi-round board meeting with one editable, preloaded Founder message.

**Architecture:** Keep the demo fully static. `site/cache.js` supplies the three discussion rounds and the default Founder prompt; `site/index.html` streams a round, pauses at the Founder composer, then streams the remaining rounds after the message is sent. The existing memo remains the fixed conclusion of that precomputed meeting.

**Tech Stack:** Static HTML/CSS/vanilla JavaScript, local cache, Python cache validator, Playwright CLI.

## Global Constraints

- All participant-facing copy is English.
- No network calls, LLM calls, logins, or new dependencies.
- The Founder may edit the preloaded input; director replies remain visibly precomputed demo playback.
- Existing Context → Assemble → Route → Blind sequence remains unchanged.
- Preserve the user’s uncommitted work and do not commit this incremental demo change.

---

### Task 1: Define the deterministic discussion contract

**Files:**
- Create: `tests/founder-discussion/validate.py`
- Create: `tests/founder-discussion/README.md`
- Modify: `site/cache.js`
- Modify: `scripts/validate_cache.py`

**Interfaces:**
- Consumes: `acts.act3_debate` as the existing ordered board transcript.
- Produces: `acts.act3_discussion = { founder_prompt, rounds }`, where `rounds` contains three ordered ranges of transcript events.

- [x] **Step 1: Write the failing cache-contract test**

```python
discussion = data["acts"]["act3_discussion"]
assert discussion["founder_prompt"]["default_text"]
assert len(discussion["rounds"]) == 3
assert sum(len(round_["event_indexes"]) for round_ in discussion["rounds"]) == len(data["acts"]["act3_debate"])
```

- [x] **Step 2: Run the test to verify it fails before the contract exists**

Run: `python3 tests/founder-discussion/validate.py`

Expected: `KeyError: 'act3_discussion'`.

- [x] **Step 3: Add the prompt and three transcript ranges**

```json
"act3_discussion": {
  "founder_prompt": {
    "label": "FOUNDER INPUT · DEMO PROMPT LOADED",
    "default_text": "I hear the financial case, but I will not break a promise to existing readers. What would a compliant, reversible move to $49 look like?"
  },
  "rounds": [
    {"label": "ROUND 1 · RECONCILE THE EVIDENCE", "event_indexes": [0,1,2,3,4]},
    {"label": "ROUND 2 · RESPOND TO THE FOUNDER", "event_indexes": [5,6,7,8]},
    {"label": "ROUND 3 · RECORD THE RESIDUAL DISSENT", "event_indexes": [9,10,11,12,13]}
  ]
}
```

- [x] **Step 4: Run both cache validators**

Run: `python3 tests/founder-discussion/validate.py && python3 scripts/validate_cache.py`

Expected: both commands print their success lines and exit 0.

### Task 2: Build the founder pause and multi-round playback

**Files:**
- Modify: `site/index.html`

**Interfaces:**
- Consumes: `B.acts.act3_discussion`, `B.acts.act3_debate`, `streamText`, `latest`, and `makeGauge`.
- Produces: `showFounderComposer(run)`, `sendFounderMessage()`, and a complete Act 4 interaction that only reveals the Memo CTA after all three rounds.

- [x] **Step 1: Add the meeting transcript visual states**

```css
.round-divider { /* round label between transcript groups */ }
.founder-composer { /* editable Founder input block */ }
.msg.founder { /* dark, visually distinct Founder message */ }
```

- [x] **Step 2: Replace the flat Act 4 loop with a round runner**

```js
async function playDiscussionRound(index, run) {
  const round = B.acts.act3_discussion.rounds[index];
  appendRoundDivider(round.label);
  for (const eventIndex of round.event_indexes) {
    await appendDiscussionMessage(B.acts.act3_debate[eventIndex], run);
  }
}
```

- [x] **Step 3: Pause after round one and send the editable Founder message**

```js
function sendFounderMessage() {
  const text = $("#founderMessage").value.trim() || B.acts.act3_discussion.founder_prompt.default_text;
  appendFounderMessage(text);
  playDiscussionRound(1, Discussion.run).then(() => playDiscussionRound(2, Discussion.run));
}
```

- [x] **Step 4: Verify the post-send final state**

Run: `awk '/<script>/{n++; if(n==2){p=1; next}} /<\/script>/{if(p)exit} p' site/index.html | node --check`

Expected: exit 0.

### Task 3: Exercise the actual meeting path

**Files:**
- Modify: `tests/e2e-walkthrough/README.md`

- [x] **Step 1: Update the walkthrough contract**

The checklist must require the Founder composer after round one, a sent Founder message in the transcript, the three round labels, and the final Memo CTA.

- [x] **Step 2: Run the browser path**

Run: open `http://localhost:8899/#act4`, wait for the composer, edit/send the Founder input, verify Round 2 and Round 3 appear, then select the Memo CTA.

Expected: the URL advances to `#act5` and then `#act6`, with 0 console errors.

- [x] **Step 3: Verify regression paths**

Run: `python3 scripts/validate_cache.py`, the inline `node --check`, `git diff --check`, and direct loads of `#act3!`, `#act4!`, and `#act6`.

Expected: all commands exit 0 and the browser console remains clean.
