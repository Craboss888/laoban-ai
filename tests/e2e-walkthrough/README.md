# Test: Six-Act End-to-End Walkthrough

- **Validates:** `site/index.html` moves from the landing screen through all six acts (assemble → agenda → blind review → cross-examination → adjourn → memo), plus **Skip to Memo** and the `#act5` / `#act2!` deep links.
- **Pass conditions:**
  1. The browser console reports zero errors throughout.
  2. Act 2 streams four isolated director statements in parallel, reveals all four positions (0.78 / 0.35 / 0.15 / 0.70), moves the divergence gauge to 0.26 in the red zone, and exposes the **Reveal All Evidence** action.
  3. Act 3 displays both highlighted beats (**Position Revised** and **Dissent Survives**), narrows divergence to approximately 0.21, and exposes the founder-only adjourn action.
  4. Act 5 makes four elements legible within three seconds: probability estimates, dissent log, kill criteria, and founder's ruling. A ruling produces a seal, and **Reset Ruling** restores the unsigned state.
  5. Left/right arrow keys move between acts, and the layout remains intact at a 900px viewport.
- **Run:** Open `site/index.html` directly, or run the local development server and open port 8899. Walk the checklist and save evidence to `output/screenshots/`.
- **Known test-environment constraint:** An embedded browser may mark its panel as hidden and throttle requestAnimationFrame. Streaming should be observed in a foreground tab. Transition classes use a requestAnimationFrame + timer fallback for reliability.
