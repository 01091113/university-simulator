function showScreen(id) {
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

function applyTheme(themeKey) {
  document.body.setAttribute("data-theme", themeKey);
}

function populateCollegeOptions() {
  const select = document.getElementById("player-college");
  select.innerHTML = "";
  getCollegeEntries().forEach(([key, value]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = value.name;
    select.appendChild(option);
  });
}

function populateMajorOptions(collegeKey) {
  const select = document.getElementById("player-major");
  select.innerHTML = "";
  getMajorEntries(collegeKey).forEach(([key, value]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = value.name;
    select.appendChild(option);
  });
  updateMajorInfoBox();
}

function updateMajorInfoBox() {
  const collegeKey = document.getElementById("player-college").value;
  const majorKey = document.getElementById("player-major").value;
  const infoBox = document.getElementById("major-info-box");
  const major = getMajorData(collegeKey, majorKey);

  if (!major) {
    infoBox.textContent = "선택한 학과의 특징과 보정치가 여기에 표시됩니다.";
    return;
  }

  const bonusText = Object.entries(major.bonus)
    .map(([k, v]) => `${translateStatKey(k)} ${v >= 0 ? "+" : ""}${v}`)
    .join(" / ");

  infoBox.innerHTML = `
    <strong>${major.name}</strong><br />
    ${major.description}<br /><br />
    <strong>기본 보정:</strong> ${bonusText}
  `;
}

function translateStatKey(key) {
  const map = {
    stress: "스트레스",
    gradePoint: "학점",
    relationship: "인간관계",
    career: "취업역량",
    otaku: "덕질",
    love: "연애",
    money: "돈"
  };
  return map[key] || key;
}

function createProgressBar(value) {
  const safe = clamp(value, 0, 100);
  return `
    <div class="progress-row">
      <span>0</span>
      <div class="progress-track">
        <div class="progress-fill" style="width:${safe}%;"></div>
        <div class="progress-dot" style="left:${safe}%;"></div>
      </div>
      <span>100</span>
    </div>
  `;
}

function renderTopBar() {
  document.getElementById("profile-line").textContent =
    `${player.profile.name} / ${getGenderText(player.profile.gender)} / ${player.profile.collegeLabel} ${player.profile.majorLabel}`;
  document.getElementById("grade-pill").textContent = `${player.progress.currentGrade}학년`;
  document.getElementById("turn-pill").textContent = `${Math.min(player.progress.currentTurn, player.progress.totalTurns)} / ${player.progress.totalTurns}턴`;
  document.getElementById("month-pill").textContent = TURN_FLOW[player.progress.currentMonthIndex].label;
  document.getElementById("slot-pill").textContent = player.profile.slot.replace("slot", "슬롯 ");
}

function getGenderText(gender) {
  if (gender === "male") return "남성";
  if (gender === "female") return "여성";
  return "기타";
}

function renderStatus() {
  document.getElementById("status-title").textContent = `${player.profile.name}의 상태`;

  const displayGrade = Number(convertGradeToDisplay(player.stats.gradePoint));
  const gradeCls = displayGrade >= 4.0 ? "grade-strong" : "";

  const cards = [
    { label: "스트레스", value: player.stats.stress, bar: true },
    { label: "학점", value: `${displayGrade} / 4.5`, cls: gradeCls },
    { label: "인간관계", value: player.stats.relationship },
    { label: "취업역량", value: player.stats.career },
    { label: "덕질 농도", value: player.stats.otaku, bar: true },
    { label: "연애 수치", value: player.stats.love, bar: true },
    { label: "돈", value: player.stats.money }
  ];

  const box = document.getElementById("status-list");
  box.innerHTML = cards.map(card => `
    <div class="status-card">
      <div class="status-head">
        <span class="status-label">${card.label}</span>
        <span class="status-value ${card.cls || ""}">${card.value}</span>
      </div>
      ${card.bar ? createProgressBar(Number(card.value)) : ""}
    </div>
  `).join("");

  const badges = [];
  const stressState = getStressLabel(player.stats.stress);
  badges.push(`<span class="badge ${stressState.cls}">${stressState.text}</span>`);
  if (player.state.some) badges.push(`<span class="badge love">썸</span>`);
  if (player.state.dating) badges.push(`<span class="badge love">연애중</span>`);
  if (player.state.conflict) badges.push(`<span class="badge warning">갈등중</span>`);
  if (player.state.military) badges.push(`<span class="badge special">군복무중</span>`);
  if (player.state.graduateOffer) badges.push(`<span class="badge special">대학원 제안</span>`);
  document.getElementById("state-badges").innerHTML = badges.join("");

  const warnings = [];
  if (displayGrade <= 1.5) warnings.push("❗ 학사경고 위험");
  if (player.stats.stress >= 70) warnings.push("⚠ 스트레스가 상당히 높다");
  if (player.state.burnoutCount >= 2) warnings.push("⚠ 번아웃 직전");
  document.getElementById("warning-box").innerHTML =
    warnings.length ? warnings.map(t => `<div class="warning-text">${t}</div>`).join("") : `<div class="badge">현재 큰 경고 없음</div>`;

  const savedAchievements = [...new Set([...getSavedAchievements(), ...player.achievements])];
  document.getElementById("achievement-box").innerHTML =
    savedAchievements.length
      ? savedAchievements.map(a => `<span class="badge achievement">${a}</span>`).join("")
      : `<span class="badge">아직 해금된 업적 없음</span>`;
}

function renderEvent(title, desc, choices, mode = "normal") {
  document.getElementById("event-title").textContent = title;
  document.getElementById("event-description").textContent = desc;

  const box = document.getElementById("choice-buttons");
  box.innerHTML = "";
  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.text;
    btn.addEventListener("click", choice.onClick);
    box.appendChild(btn);
  });
}

function renderLog() {
  const pinBox = document.getElementById("log-warning-pin");
  pinBox.innerHTML = player.state.pinnedWarning ? `<div class="log-warning">${player.state.pinnedWarning}</div>` : "";

  const box = document.getElementById("story-log");
  box.innerHTML = player.logs.map(log => `
    <div class="log-entry">
      <div class="log-entry-title"><span class="log-bullet"></span>${log.title}</div>
      <div class="log-entry-body">${log.body}</div>
    </div>
  `).join("");
}

function renderGallery() {
  const unlocked = getUnlockedEndings();
  const box = document.getElementById("gallery-list");
  box.innerHTML = Object.entries(ENDINGS).map(([key, value]) => {
    const open = unlocked.includes(key);
    return `
      <div class="gallery-item ${open ? "" : "locked"}">
        <strong>${open ? value.title : "??? 잠김"}</strong><br />
        ${open ? value.variants[0] : "아직 해금하지 못한 엔딩이다."}
      </div>
    `;
  }).join("");
}

function renderAll() {
  applyTheme(player.profile.theme);
  renderTopBar();
  renderStatus();
  renderLog();
}
