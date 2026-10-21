import { escapeHTML } from "./helpers.js";

export function renderCareerSetup(app, options) {
  const { clubs, mode, selectedClubId, onModeChange, onSelectClub, onBack, onCreate } = options;
  const selected = clubs.find(club => club.id === selectedClubId);
  app.innerHTML = `
    <div class="screen-heading">
      <div><p class="eyebrow">CAREER SETUP · STEP 1</p><h1>Choose your beginning.</h1><p>Take over an established side or create a new grassroots identity.</p></div>
      <button class="back-button" id="back-home">← Main menu</button>
    </div>
    <div class="panel">
      <h2>Your career, your club</h2>
      <p class="panel-intro">Creating a club replaces the selected club in this prototype, keeping the league at 16 teams. Club squads and match play arrive in later builds.</p>
      <div class="choice-row">
        <button class="choice-chip ${mode === "existing" ? "active" : ""}" data-mode="existing">Manage Existing Club</button>
        <button class="choice-chip ${mode === "create" ? "active" : ""}" data-mode="create">Create My Club</button>
      </div>
      ${mode === "create" ? `
        <div class="form-row">
          <div class="field"><label for="club-name">Club name</label><input id="club-name" maxlength="36" placeholder="e.g. Masaka City FC" /></div>
          <div class="field"><label for="club-short">Short name / initials</label><input id="club-short" maxlength="4" placeholder="e.g. MCF" /></div>
          <div class="field"><label for="club-location">Home location</label><select id="club-location">
            <option>Masaka, Nasarawa</option><option>Kaduna, Kaduna</option><option>Jos, Plateau</option><option>Makurdi, Benue</option><option>Abuja, FCT</option><option>Enugu, Enugu</option><option>Kano, Kano</option><option>Ibadan, Oyo</option><option>Uyo, Akwa Ibom</option><option>Calabar, Cross River</option><option>Gombe, Gombe</option><option>Akure, Ondo</option><option>Lokoja, Kogi</option><option>Yenagoa, Bayelsa</option><option>Abakaliki, Ebonyi</option><option>Damaturu, Yobe</option>
          </select></div>
          <div class="field"><label for="club-style">Playing identity</label><select id="club-style"><option>Balanced</option><option>High Press</option><option>Compact Defence</option><option>Quick Transitions</option><option>Possession</option><option>Direct Play</option><option>Wide Attacks</option><option>Attacking Football</option></select></div>
        </div>
        <p class="notice">Your created club will start with a basic budget and a placeholder squad until the player database is implemented.</p>
      ` : ""}
      <h2 class="club-list-title">${mode === "create" ? "Choose the club slot to replace" : "Select your club"}</h2>
      <p class="panel-intro">16 fictional clubs across different regions of Nigeria. Choose a club to view its starting identity.</p>
      <div class="club-grid">
        ${clubs.map(club => `<button class="club-card ${selectedClubId === club.id ? "selected" : ""}" data-club="${club.id}">
          <span class="club-badge" style="background:${club.colors}">${escapeHTML(club.shortName)}</span>
          <span class="club-name">${escapeHTML(club.name)}</span><span class="club-meta">${escapeHTML(club.location)}</span><span class="club-style">${escapeHTML(club.style)}</span>
        </button>`).join("")}
      </div>
      <div class="form-row">
        <div class="field"><label for="manager-name">Manager name</label><input id="manager-name" maxlength="40" placeholder="Enter your manager name" /></div>
        <div class="field"><label>Selected club</label><input id="selected-club-display" readonly value="${selected ? escapeHTML(selected.name) : "Select a club above"}" /></div>
      </div>
      <div class="form-actions"><span class="notice">Prototype save data stays in this browser on this device.</span><button class="button button-primary" id="create-career">Begin Career →</button></div>
    </div>
    <footer class="app-footer"><span>GI GRASSROOTS FOOTBALL</span><span>V0.1 · CAREER SETUP</span></footer>`;
  app.querySelector("#back-home").addEventListener("click", onBack);
  app.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => onModeChange(button.dataset.mode)));
  app.querySelectorAll("[data-club]").forEach(button => button.addEventListener("click", () => onSelectClub(button.dataset.club)));
  app.querySelector("#create-career").addEventListener("click", () => {
    const customName = app.querySelector("#club-name")?.value || "";
    if (mode === "create" && !customName.trim()) {
      app.querySelector("#club-name").focus();
      app.querySelector("#club-name").setCustomValidity("Enter a name for your club.");
      app.querySelector("#club-name").reportValidity();
      return;
    }
    onCreate({
      mode, clubId: selectedClubId,
      managerName: app.querySelector("#manager-name").value,
      customName,
      customShort: app.querySelector("#club-short")?.value || "",
      location: app.querySelector("#club-location")?.value || "",
      style: app.querySelector("#club-style")?.value || ""
    });
  });
}
