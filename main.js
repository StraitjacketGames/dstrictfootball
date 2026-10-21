import { getCareer, saveCareer, clearCareer } from "./gameState.js";
import { clubs } from "./data/clubs.js";
import { renderHome } from "./ui/navigation.js";
import { renderCareerSetup } from "./ui/careerSetup.js";
import { renderDashboard } from "./ui/dashboard.js";
import { renderSquad } from "./ui/squadView.js";
import { showToast } from "./ui/helpers.js";

const app = document.querySelector("#app");
let state = { screen: "home", selectedClubId: null, career: null, setupMode: "existing" };

function navigate(screen) {
  state.screen = screen;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function render() {
  if (state.screen === "home") renderHome(app, {
    hasSave: Boolean(getCareer()),
    onStart: () => { state.setupMode = "existing"; state.selectedClubId = null; navigate("setup"); },
    onLoad: loadCareer,
    onSettings: showSettings
  });
  if (state.screen === "setup") renderCareerSetup(app, {
    clubs,
    mode: state.setupMode,
    selectedClubId: state.selectedClubId,
    onModeChange: mode => { state.setupMode = mode; state.selectedClubId = null; render(); },
    onSelectClub: id => { state.selectedClubId = id; render(); },
    onBack: () => navigate("home"),
    onCreate: createCareer
  });
  if (state.screen === "squad") renderSquad(app, { career: state.career || getCareer(), onBack: () => navigate("dashboard") });
  if (state.screen === "dashboard") renderDashboard(app, {
    career: state.career || getCareer(),
    onHome: () => navigate("home"),
    onSave: () => { if (state.career) saveCareer(state.career); showToast("Career saved on this device."); },
    onReset: resetCareer,
    onSquad: () => navigate("squad")
  });
}
function createCareer(payload) {
  const chosen = clubs.find(c => c.id === payload.clubId);
  if (!chosen) { showToast("Choose a club to continue."); return; }
  const custom = payload.mode === "create";
  const club = custom ? {
    ...chosen,
    id: chosen.id,
    name: payload.customName.trim(),
    shortName: payload.customShort.trim().toUpperCase() || payload.customName.trim().slice(0, 3).toUpperCase(),
    location: payload.location,
    colors: payload.colors || chosen.colors,
    style: payload.style || "Balanced"
  } : { ...chosen };
  state.career = {
    version: 1,
    managerName: payload.managerName.trim() || "Club Manager",
    club,
    season: 2026,
    league: { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    finances: { balance: custom ? 750000 : chosen.startingBalance, wageBudget: chosen.wageBudget },
    createdAt: new Date().toISOString()
  };
  saveCareer(state.career);
  navigate("dashboard");
  showToast(`${club.name} is ready for the new season.`);
}
function loadCareer() {
  const career = getCareer();
  if (!career) { showToast("No saved career found on this device yet."); return; }
  state.career = career;
  navigate("dashboard");
}
function resetCareer() {
  if (!window.confirm("Delete the saved career from this device? This cannot be undone.")) return;
  clearCareer();
  state.career = null;
  navigate("home");
  showToast("Saved career deleted.");
}
function showSettings() {
  window.alert("GI Grassroots Football V0.1\\n\\nThis is an early prototype. Settings and match systems will be added in later versions.");
}
document.querySelector("#brand-home").addEventListener("click", event => { event.preventDefault(); navigate("home"); });
render();
