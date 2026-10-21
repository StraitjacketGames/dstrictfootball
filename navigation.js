export function renderHome(app, { hasSave, onStart, onLoad, onSettings }) {
  app.innerHTML = `
    <section class="hero-panel">
      <div class="hero-copy">
        <p class="eyebrow">NIGERIAN GRASSROOTS FOOTBALL</p>
        <h1>Every legend<br /><span>starts somewhere.</span></h1>
        <p class="hero-description">Build your club, shape your squad and earn your place in grassroots football history.</p>
        <div class="hero-actions">
          <button class="button button-primary" id="start-career">Start Career <span>→</span></button>
          <button class="button button-secondary" id="load-career" ${hasSave ? "" : "disabled"}>${hasSave ? "Load Career" : "No Saved Career"}</button>
        </div>
        <p class="small-note">${hasSave ? "A saved career is available on this device." : "Your next football story starts here."}</p>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="stadium-glow"></div><div class="pitch-lines"><div class="pitch-center"></div><div class="pitch-box pitch-box-left"></div><div class="pitch-box pitch-box-right"></div></div>
        <div class="hero-ball">⚽</div><div class="hero-stamp">GI<br /><small>GF</small></div>
      </div>
    </section>
    <section class="feature-row" aria-label="Game features">
      <article class="feature-card"><span class="feature-icon">⚽</span><div><h3>Grassroots to Glory</h3><p>Start with local clubs and build your reputation.</p></div></article>
      <article class="feature-card"><span class="feature-icon">📋</span><div><h3>Your Football Decisions</h3><p>Squad building, tactics and recruitment are ahead.</p></div></article>
      <article class="feature-card"><span class="feature-icon">🏆</span><div><h3>One League. One Dream.</h3><p>Compete for the title in a 16-club league.</p></div></article>
    </section>
    <footer class="app-footer"><span>GI GRASSROOTS FOOTBALL</span><span>EARLY BUILD · V0.1</span></footer>`;
  app.querySelector("#start-career").addEventListener("click", onStart);
  app.querySelector("#load-career").addEventListener("click", onLoad);
  document.querySelector("#settings-button")?.addEventListener("click", onSettings);
}
