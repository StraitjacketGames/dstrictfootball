import { escapeHTML } from "./helpers.js";

export function renderDashboard(app, { career, onHome, onSave, onReset, onSquad }) {
  const club = career.club;
  const stats = career.league;
  const money = new Intl.NumberFormat("en-NG", { style:"currency", currency:"NGN", maximumFractionDigits:0 }).format(career.finances.balance);
  const wage = new Intl.NumberFormat("en-NG", { style:"currency", currency:"NGN", maximumFractionDigits:0 }).format(career.finances.wageBudget);
  const tiles = [
    ["👥","Squad","Player profiles · Coming soon",true],
    ["📅","Fixtures & Results","League schedule · Coming soon",true],
    ["⚽","Match Centre","Live commentary and pitch view · Coming soon",true],
    ["🧭","Recruitment","Scouting and player market · Coming soon",true],
    ["📈","League Table","16-club competition · Coming soon",true],
    ["💳","Club Finances","Budget overview · Available in V0.1",false]
  ];
  app.innerHTML = `
    <div class="screen-heading">
      <div><p class="eyebrow">MANAGER DASHBOARD · SEASON ${career.season}</p><h1>Welcome, ${escapeHTML(career.managerName)}.</h1><p>Your grassroots journey has officially begun. Make this club count.</p></div>
      <button class="back-button" id="dashboard-home">Main menu</button>
    </div>
    <div class="dashboard-grid">
      <section class="panel">
        <div class="club-banner"><span class="club-badge" style="background:${club.colors}">${escapeHTML(club.shortName)}</span><div><h2>${escapeHTML(club.name)}</h2><p>${escapeHTML(club.location)} · ${escapeHTML(club.ground)}</p><span class="status-label">${escapeHTML(club.style)}</span></div></div>
        <div class="stat-grid">
          <div class="stat-box"><span>League points</span><strong>${stats.points}</strong></div>
          <div class="stat-box"><span>Matches played</span><strong>${stats.played}/30</strong></div>
          <div class="stat-box"><span>Club reputation</span><strong>${club.reputation}/100</strong></div>
        </div>
        <div style="height:18px"></div>
        <h2>Season objectives</h2>
        <p class="panel-intro">Your first season is being prepared. Fixtures, squad selection and match management will be activated in upcoming versions.</p>
        <div class="empty-state"><strong>Pre-season is underway</strong><br><span style="font-size:12px">The next milestone is adding your 22-player squad and league schedule.</span></div>
      </section>
      <aside class="panel">
        <h2>Club finances</h2><p class="panel-intro">Starting financial position</p>
        <div class="stat-box"><span>Available balance</span><strong style="font-size:22px">${money}</strong></div>
        <div style="height:10px"></div>
        <div class="stat-box"><span>Weekly wage budget</span><strong style="font-size:18px">${wage}</strong></div>
        <div style="height:22px"></div>
        <h2>Manager actions</h2><p class="panel-intro">Your career saves locally to this browser.</p>
        <div class="hero-actions"><button class="button button-primary" id="save-career">Save Career</button><button class="button button-secondary" id="delete-career">Delete Save</button></div>
      </aside>
    </div>
    <section class="panel" style="margin-top:16px">
      <h2>Clubhouse</h2><p class="panel-intro">Game systems will unlock as development progresses.</p>
      <div class="nav-grid">${tiles.map(([icon,title,desc,disabled]) => `<button class="nav-tile ${disabled ? "coming-soon" : ""}" data-tile="${title}"><span class="tile-icon">${icon}</span><span><strong>${title}</strong><small>${desc}</small></span></button>`).join("")}</div>
    </section>
    <footer class="app-footer"><span>GI GRASSROOTS FOOTBALL</span><span>CAREER ACTIVE · V0.1</span></footer>`;
  app.querySelector("#dashboard-home").addEventListener("click", onHome);
  app.querySelector("#save-career").addEventListener("click", onSave);
  app.querySelector("#delete-career").addEventListener("click", onReset);
  app.querySelectorAll("[data-tile]").forEach(tile => tile.addEventListener("click", () => {
    if (tile.dataset.tile === "Squad") onSquad();
    else if (tile.dataset.tile === "Club Finances") window.alert("Finances overview is available in V0.1. Income, expenses and wage calculations will be added later.");
    else window.alert(`${tile.dataset.tile} is planned for a future version.`);
  }));
}
