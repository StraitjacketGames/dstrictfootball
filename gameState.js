const SAVE_KEY = "giGrassrootsFootball.career.v1";

export function getCareer() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Could not read saved career:", error);
    return null;
  }
}
export function saveCareer(career) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(career));
    return true;
  } catch (error) {
    console.error("Could not save career:", error);
    return false;
  }
}
export function clearCareer() {
  localStorage.removeItem(SAVE_KEY);
}
