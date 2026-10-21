import { getPlayersForClub } from "../data/players.js";
import { escapeHTML } from "./helpers.js";

const positionOrder = ["GK","RB","CB","LB","RWB","LWB","DM","CM","AM","RW","LW","SS","CF","ST"];

export function renderSquad(app, { career, onBack }) {
  const squad = getPlayersForClub(career.club.id);
  let filter = "ALL";
  let sortBy = "shirtNumber";
  let query = "";
  const render = () => {
    const filtered = squad.filter(p => (filter === "ALL" || p.position === filter) &&
      p.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a,b) => sortBy === "overall" ? b.overall-a.overall : sortBy === "age" ? a.age-b.age : a.shirtNumber-b.shirtNumber);
    app.innerHTML = `
      <div class="screen-heading">
        <div><p class="eyebrow">SQUAD MANAGEMENT · SEASON ${career.season}</p><h1>First-team squad.</h1><p>${escapeHTML(career.club.name)} · ${squad.length} registered players</p></div>
        <button class="back-button" id="squad-back">← Dashboard</button>
      </div>
      <section class="panel">
        <div class="squad-toolbar">
          <div class="squad-summary">
            <div class="stat-box"><span>Squad size</span><strong>${squad.length}/22</strong></div>
            <div class="stat-box"><span>Average age</span><strong>${(squad.reduce((sum,p)=>sum+p.age,0)/squad.length).toFixed(1)}</strong></div>
            <div class="stat-box"><span>Average rating</span><strong>${Math.round(squad.reduce((sum,p)=>sum+p.overall,0)/squad.length)}</strong></div>
          </div>
          <div class="squad-controls">
            <input id="player-search" type="search" placeholder="Search players..." value="${escapeHTML(query)}" aria-label="Search players" />
            <select id="player-sort" aria-label="Sort players">
              <option value="shirtNumber" ${sortBy==="shirtNumber"?"selected":""}>Sort: Shirt number</option>
              <option value="overall" ${sortBy==="overall"?"selected":""}>Sort: Rating</option>
              <option value="age" ${sortBy==="age"?"selected":""}>Sort: Age</option>
            </select>
          </div>
        </div>
        <div class="position-filters">
          <button class="filter-chip ${filter==="ALL"?"active":""}" data-filter="ALL">All (${squad.length})</button>
          ${positionOrder.filter(pos=>squad.some(p=>p.position===pos)).map(pos=>`<button class="filter-chip ${filter===pos?"active":""}" data-filter="${pos}">${pos} (${squad.filter(p=>p.position===pos).length})</button>`).join("")}
        </div>
        <div class="table-wrap">
          <table class="player-table">
            <thead><tr><th>No.</th><th>Player</th><th>Pos.</th><th>Age</th><th>Foot</th><th>Rating</th><th>Wage / week</th><th>Value</th></tr></thead>
            <tbody>
              ${filtered.map(p=>`<tr>
                <td class="shirt-number">${p.shirtNumber}</td>
                <td><strong>${escapeHTML(p.name)}</strong><small>${escapeHTML(p.positionName)}</small></td>
                <td><span class="position-tag">${p.position}</span></td>
                <td>${p.age}</td><td>${p.preferredFoot}</td>
                <td><span class="rating ${p.overall>=65?"rating-good":p.overall<45?"rating-low":""}">${p.overall}</span></td>
                <td>₦${p.wage.toLocaleString("en-NG")}</td><td>₦${p.estimatedValue.toLocaleString("en-NG")}</td>
              </tr>`).join("")}
            </tbody>
          </table>
          ${filtered.length ? "" : `<div class="empty-state">No players match your search.</div>`}
        </div>
        <p class="notice squad-footnote">All 22 players are fictional. Ratings are prototype estimates, not real-world scouting grades. Match stats will populate once the match engine is introduced.</p>
      </section>
      <footer class="app-footer"><span>GI GRASSROOTS FOOTBALL</span><span>V0.2 · SQUAD DATABASE</span></footer>`;
    app.querySelector("#squad-back").addEventListener("click", onBack);
    app.querySelector("#player-search").addEventListener("input", e => { query=e.target.value; const start=e.target.selectionStart; render(); const input=app.querySelector("#player-search"); input.focus(); input.setSelectionRange(start,start); });
    app.querySelector("#player-sort").addEventListener("change", e => { sortBy=e.target.value; render(); });
    app.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{filter=btn.dataset.filter;render();}));
  };
  render();
}
