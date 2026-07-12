# Test: Seven-Act End-to-End Walkthrough

- **Validates:** `site/index.html` moves from the landing screen through all seven acts (context → assemble → route evidence → blind review → cross-examination → adjourn → memo), plus **Skip to Memo** and the `#act6` / `#act3!` / `#act0!` / `#act4!` deep links.
- **Pass conditions:**
  1. The browser console reports zero errors throughout.
  2. Act 0 plays three scenes: **The Company** (second-person intro + four data cards), **The Pressure** (conflicting signals + "only leader" beat), and **The Board Secretary** (cutout figure slides in, the founder question types itself into an editable composer, **Ask the Board Secretary** reveals the formal decision card and the Assemble CTA). `#act0!` must land on the completed scene 3 directly.
  3. Act 2 shows the four evidence-to-director routes and keeps Mr. Opposite as a mandate-only participant.
  4. Act 3 streams five isolated director statements, reveals all five positions, moves the divergence gauge to 0.26 in the red zone, and exposes the **Reveal All Evidence** action.
  5. Act 4 streams **Round 1**, displays the editable preloaded **Founder input**, records the sent Founder message, then streams **Round 2** and **Round 3**. It must display both highlighted beats (**Position Revised** and **Dissent Survives**), narrow divergence to approximately 0.21, and expose the founder-only adjourn action only after the final round.
  6. Act 6 makes four elements legible within three seconds: director support scores, dissent log, kill criteria, and founder's ruling. A ruling produces a seal, and **Reset Ruling** restores the unsigned state.
  7. Left/right arrow keys move between acts, and the layout remains intact at a 900px viewport.
- **Run:** Open `site/index.html` directly, or run the local development server and open port 8899. Walk the checklist and save evidence to `output/screenshots/`.
- **Known test-environment constraint:** An embedded browser may mark its panel as hidden and throttle requestAnimationFrame. Streaming should be observed in a foreground tab. Transition classes use a requestAnimationFrame + timer fallback for reliability.
- **Known test-tooling constraint:** Playwright's `page.goto` does **not** reload the document when only the URL hash changes, and boot reads the hash once — deep-link checks must force a real reload (e.g. set `location.hash` then call `location.reload()`), or every post-navigation assertion silently inspects the previous state.
