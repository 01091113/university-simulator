function getSaveKey(slot) {
  return `uni_sim_save_${slot}`;
}
function getEndingsKey() {
  return "uni_sim_endings";
}
function getAchievementsKey() {
  return "uni_sim_achievements";
}

function saveGameToSlot(slot) {
  player.profile.slot = slot;
  localStorage.setItem(getSaveKey(slot), JSON.stringify(player));
}

function loadGameFromSlot(slot) {
  const raw = localStorage.getItem(getSaveKey(slot));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveUnlockedEnding(key) {
  const current = getUnlockedEndings();
  if (!current.includes(key)) {
    current.push(key);
    localStorage.setItem(getEndingsKey(), JSON.stringify(current));
  }
}

function getUnlockedEndings() {
  try {
    return JSON.parse(localStorage.getItem(getEndingsKey()) || "[]");
  } catch (e) {
    return [];
  }
}

function saveAchievement(key) {
  const current = getSavedAchievements();
  if (!current.includes(key)) {
    current.push(key);
    localStorage.setItem(getAchievementsKey(), JSON.stringify(current));
  }
}

function getSavedAchievements() {
  try {
    return JSON.parse(localStorage.getItem(getAchievementsKey()) || "[]");
  } catch (e) {
    return [];
  }
}
