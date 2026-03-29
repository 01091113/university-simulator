let player = deepClone(STARTING_PLAYER);

function initializeGame() {
  populateCollegeOptions();
  const firstCollege = document.getElementById("player-college").value || getCollegeEntries()[0][0];
  document.getElementById("player-college").value = firstCollege;
  populateMajorOptions(firstCollege);
  document.getElementById("player-theme").value = "pastel-sky";

  document.getElementById("player-college").addEventListener("change", e => populateMajorOptions(e.target.value));
  document.getElementById("player-major").addEventListener("change", updateMajorInfoBox);
  document.getElementById("player-theme").addEventListener("change", e => applyTheme(e.target.value));
  document.getElementById("start-game-btn").addEventListener("click", createPlayerFromForm);
  document.getElementById("load-slot-btn").addEventListener("click", loadSelectedSlot);
  document.getElementById("save-now-btn").addEventListener("click", () => {
    saveGameToSlot(player.profile.slot);
    addStoryLog("저장 완료", `${player.profile.slot.replace("slot", "슬롯 ")}에 현재 진행 상황을 저장했다.`);
    renderLog();
  });
  document.getElementById("open-gallery-btn").addEventListener("click", openGallery);
  document.getElementById("manual-gallery-btn").addEventListener("click", openGallery);
  document.getElementById("close-gallery-btn").addEventListener("click", closeGallery);
  document.getElementById("back-start-btn").addEventListener("click", backToStart);
  renderGallery();
}

function createPlayerFromForm() {
  player = deepClone(STARTING_PLAYER);

  const name = document.getElementById("player-name").value.trim() || "플레이어";
  const gender = document.getElementById("player-gender").value;
  const collegeKey = document.getElementById("player-college").value;
  const majorKey = document.getElementById("player-major").value;
  const theme = document.getElementById("player-theme").value;
  const slot = document.getElementById("save-slot").value;

  const college = COLLEGE_DATA[collegeKey];
  const major = getMajorData(collegeKey, majorKey);

  player.profile.name = name;
  player.profile.gender = gender;
  player.profile.collegeKey = collegeKey;
  player.profile.collegeLabel = college.name;
  player.profile.majorKey = majorKey;
  player.profile.majorLabel = major.name;
  player.profile.theme = theme;
  player.profile.slot = slot;

  applyMajorBonus();
  addDepartmentIntroLog();

  showScreen("game-screen");
  syncTurn();
  openTurnMainScene();
  renderAll();
}

function loadSelectedSlot() {
  const slot = document.getElementById("save-slot").value;
  const loaded = loadGameFromSlot(slot);
  if (!loaded) {
    alert("선택한 슬롯에 저장된 데이터가 없다.");
    return;
  }
  player = loaded;
  showScreen("game-screen");
  syncTurn();
  openTurnMainScene();
  renderAll();
}

function backToStart() {
  showScreen("start-screen");
  renderGallery();
}

function openGallery() {
  renderGallery();
  showScreen("gallery-screen");
}

function closeGallery() {
  showScreen(player.progress.gameEnded ? "start-screen" : "game-screen");
}

function syncTurn() {
  const index = (player.progress.currentTurn - 1) % TURN_FLOW.length;
  player.progress.currentMonthIndex = index;
  player.progress.turnType = TURN_FLOW[index].turnType;
  player.progress.currentGrade = Math.min(4, Math.ceil(player.progress.currentTurn / 14));
}

function applyMajorBonus() {
  const bonus = getMajorData(player.profile.collegeKey, player.profile.majorKey)?.bonus || {};
  Object.entries(bonus).forEach(([key, value]) => {
    player.stats[key] = clamp((player.stats[key] || 0) + value);
  });
}

function addDepartmentIntroLog() {
  const introMap = {
    humanities: "인문대 건물 복도를 걸으면 종이 냄새와 오래된 공기가 느껴진다. 조용한데 이상하게 많은 이야기가 숨어 있는 곳이다.",
    social: "사회과학대에서는 사람을 읽는 일이 곧 생존 기술처럼 느껴진다. 표정과 말투, 공기까지도 자꾸 신경 쓰이게 된다.",
    business: "경영대 로비에는 늘 바쁘게 움직이는 사람들이 있다. 여기서는 가만히 있어도 누군가 준비 중인 것처럼 보인다.",
    engineering: "공대 복도는 늘 프로젝트와 피로와 커피 냄새로 가득하다. 여기서는 밤샘도 실력의 일부처럼 취급된다.",
    science: "자연과학대의 하루는 조용해 보이지만 안쪽에서는 늘 실험과 고민이 반복된다.",
    arts: "예술대는 감정과 마감이 같이 움직인다. 아름답고 피곤하고, 그래서 기억에 오래 남는다.",
    theology: "신학대학 건물 앞 공기는 묘하게 고요하다. 사람과 삶을 오래 바라보게 되는 곳이다.",
    education: "사범대는 어쩐지 차분하면서도 단단하다. 누군가를 가르칠 사람이 되기 전에 자신부터 오래 다듬게 된다."
  };

  addStoryLog(
    "새내기의 첫 장면",
    `${player.profile.name}는 ${player.profile.collegeLabel} ${player.profile.majorLabel}의 학생이 되었다.
${introMap[player.profile.collegeKey] || "대학생활은 생각보다 금방 시작되었다."}`
  );
}

function addStoryLog(title, body) {
  player.logs.unshift({ title, body });
  if (player.logs.length > 40) player.logs.pop();
}

function getTurnFlavorText() {
  return sample(TURN_FLAVOR[player.progress.turnType] || ["이번 달에는 무엇을 할까?"]);
}

function getRecommendedActions() {
  const list = ACTIONS_BY_GRADE[player.progress.currentGrade] || [];
  return shuffle(list).slice(0, 4);
}

function openTurnMainScene() {
  const desc = `${getTurnFlavorText()}

이번 달에는 무엇을 할까?`;
  const actions = getRecommendedActions();

  renderEvent(
    `${player.progress.currentGrade}학년 ${TURN_FLOW[player.progress.currentMonthIndex].label}`,
    desc,
    actions.map(action => ({
      text: action.text,
      onClick: () => handleAction(action)
    }))
  );
}

function handleAction(action) {
  applyEffect(action.effect);
  addStoryLog(getActionTitle(action.id), getActionStory(action.id));
  applyActionSideEffects(action.id);
  updateRelationshipState();
  updateWarningsAndAchievements();

  const forced = getForcedEvent(action.id);
  if (forced) {
    openEvent(forced);
    renderAll();
    return;
  }

  const randomEvent = getRandomEvent();
  if (randomEvent) {
    openEvent(randomEvent);
    renderAll();
    return;
  }

  endTurn();
}

function getActionTitle(actionId) {
  const map = {
    study: "공부했다",
    play: "놀았다",
    sleep: "푹 잤다",
    club: "동아리 방에 갔다",
    drink: "술을 마셨다",
    friends: "친구를 만났다",
    otaku: "덕질에 몰입했다",
    teamProject: "팀플을 붙들었다",
    toeic: "토익 준비를 했다",
    confession: "마음을 들여다봤다",
    militaryThink: "입대를 고민했다",
    contest: "공모전에 집중했다",
    internship: "인턴 지원서를 다시 열었다",
    certificate: "자격증 공부를 했다",
    date: "데이트를 했다",
    interview: "면접을 상상했다",
    jobSearch: "취업 준비를 했다",
    graduatePrep: "대학원을 고민했다",
    travel: "잠시 학교 밖으로 나갔다"
  };
  return map[actionId] || "이번 달을 보냈다";
}

function getActionStory(actionId) {
  const deptKey = player.profile.majorKey;
  const deptStories = {
    computer: {
      internship: "컴퓨터공학과 학생답게 저장소와 프로젝트 파일을 다시 열었다. 정리되지 않은 코드들 사이에서도, 지금까지 버텨온 시간이 보였다.",
      study: "에러를 잡고 개념을 다시 훑는 일은 지루하고 피곤했지만, 어느 순간 머릿속에서 연결되는 쾌감이 있었다."
    },
    film: {
      club: "영화영상학과의 밤은 길다. 작품 이야기와 촬영 이야기로 떠드는 시간은 이상하게 피곤함보다 먼저 기억된다.",
      contest: "아이디어를 장면으로 바꾸는 과정은 어렵지만 묘하게 짜릿하다. 결국 이 학과 사람들은 머릿속에서 먼저 영화를 찍는다."
    },
    psychology: {
      friends: "심리학과라고 해서 남의 마음을 다 아는 건 아니지만, 적어도 예전보다 더 오래 들어주게 되긴 했다."
    },
    theology: {
      sleep: "신학과에서의 쉼은 단순한 휴식보다 조금 더 깊은 느낌을 남긴다. 잠깐 멈추는 일이 꼭 나쁜 것만은 아니라는 걸 알게 된다."
    },
    visualDesign: {
      study: "시안을 몇 번이고 뒤집어 보고 다시 맞추는 사이 시간이 훌쩍 지나버렸다. 시각디자인학과에서는 '조금만 더'라는 말이 너무 쉽게 나온다."
    }
  };

  const general = {
    study: "하기 싫다는 마음과 해내야 한다는 마음이 부딪혔지만, 오늘은 도망치지 않기로 했다.",
    play: "잠시라도 숨을 돌리기로 했다. 대학 생활은 생각보다 길고, 사람은 계속 긴장만 한 채로 버틸 수 없다.",
    sleep: "모든 걸 잠시 내려놓고 잤다. 잠은 많은 문제를 해결해주진 않지만, 버틸 힘은 남겨준다.",
    club: "동아리방의 어수선한 분위기 속으로 들어갔다. 사람들 사이를 오가며 웃고 떠드는 동안 학교가 조금 덜 낯설게 느껴졌다.",
    drink: "잔을 기울이며 하루를 흘려보냈다. 농담인지 진심인지 모를 말들이 밤 공기 속에 섞여 흘렀다.",
    friends: "친구를 만나 사소한 이야기를 나눴다. 별것 아닌 대화 같았지만 그런 시간이 대학 생활을 버티게 만든다.",
    otaku: "한 편만 볼 생각이었는데 어느새 시간이 너무 많이 흘러버렸다. 이상하게도 이런 밤이 지나고 나면 조금은 살 것 같기도 하다.",
    teamProject: "조별과제 채팅방을 열어보며 한숨을 쉬었다. 대학생의 인간관계는 대개 이런 식으로 단련된다.",
    toeic: "미래에 대한 막연한 불안을 점수와 표로 바꾸어보려 했다. 마음은 답답했지만 이것도 준비라고 믿고 싶었다.",
    confession: "말하면 달라질 수도 있고, 아무 말도 하지 않으면 영영 그대로일 수도 있었다.",
    militaryThink: "언젠가는 결론을 내려야 하는 문제였고, 그 시기가 생각보다 빨리 다가오고 있었다.",
    contest: "잘될지 아닐지는 모르지만, 이 시도 하나가 자신을 조금 더 앞으로 밀어줄 것 같았다.",
    internship: "이력서와 자기소개서를 다시 열었다. 아직은 부족해 보여도, 지금이 아니면 시작조차 못 할 것 같았다.",
    certificate: "자격증 공부는 재미보다 불안이 더 크지만, 그래도 미래를 붙잡는 손잡이처럼 느껴진다.",
    date: "학교 밖으로 잠깐 걸어나온 시간은 의외로 오래 기억에 남는다. 사랑은 대단한 사건보다 작은 장면으로 쌓이는지도 모른다.",
    interview: "예상 질문을 되뇌며 표정과 목소리 톤을 연습했다. 준비된 척하는 일도 준비의 일부였다.",
    jobSearch: "마감이 있는 인생처럼 여러 공고를 열어보고 닫았다. 누군가는 벌써 어딘가로 가고 있다는 사실이 자꾸 마음을 흔든다.",
    graduatePrep: "공부를 더 한다는 건 낭만 같기도 하고, 더 오래 버텨야 한다는 압박 같기도 했다.",
    travel: "학교를 잠시 떠나 다른 풍경 속에 몸을 두는 것만으로도 마음이 조금 가벼워졌다."
  };

  return deptStories?.[deptKey]?.[actionId] || general[actionId] || "이번 달도 선택의 결과로 조용히 흘러갔다.";
}

function applyActionSideEffects(actionId) {
  if (actionId === "internship") player.state.intern = true;
  if (actionId === "confession" && player.stats.love >= 60) player.state.some = true;
}

function applyEffect(effect) {
  Object.entries(effect).forEach(([key, value]) => {
    const resolved = resolveRandomRange(value);
    if (player.stats[key] !== undefined) {
      player.stats[key] = clamp(player.stats[key] + resolved);
    }
  });
}

function updateRelationshipState() {
  const love = player.stats.love;
  player.state.some = love >= 40 && love < 70;
  player.state.dating = love >= 70;
  player.state.conflict = player.state.dating && player.stats.stress >= 75;
  player.state.brokenUp = love <= 5;
}

function getForcedEvent(actionId) {
  if (actionId === "confession" && player.stats.love >= 55) {
    return { title: "이제는 말해야 할 것 같다", description: "계속 마음에 두고 있던 사람이 있다. 지금 말하면 달라질 수도 있고, 아무 말도 하지 않으면 계속 그대로일 수도 있다.", choices: CHOICE_TEMPLATES.confession };
  }
  if (actionId === "militaryThink" && player.profile.gender === "male") {
    return { title: "입대 이야기를 더는 피할 수 없다", description: "주변 친구들 사이에서도 군대 이야기가 자연스럽게 나온다. 미뤄왔던 현실이 점점 가까워진다.", choices: CHOICE_TEMPLATES.military };
  }
  return null;
}

function eventMatchesConditions(event) {
  if (event.grades && !event.grades.includes(player.progress.currentGrade)) return false;
  if (event.turnTypes && !event.turnTypes.includes(player.progress.turnType)) return false;
  if (event.conditions?.gender && event.conditions.gender !== player.profile.gender) return false;
  if (event.conditions?.minLove && player.stats.love < event.conditions.minLove) return false;
  if (event.conditions?.minRelationship && player.stats.relationship < event.conditions.minRelationship) return false;
  if (event.conditions?.minOtaku && player.stats.otaku < event.conditions.minOtaku) return false;
  if (event.conditions?.minGradePoint && player.stats.gradePoint < event.conditions.minGradePoint) return false;
  if (event.conditions?.dating && !player.state.dating) return false;
  return true;
}

function getRandomEvent() {
  if (Math.random() > 0.2) return null;

  const departmentPool = DEPARTMENT_EVENTS[player.profile.majorKey] || [];
  const majorEvent = departmentPool.length && Math.random() < 0.35 ? sample(departmentPool) : null;
  if (majorEvent) return majorEvent;

  const pool = GENERAL_EVENTS.filter(eventMatchesConditions);
  return pool.length ? sample(pool) : null;
}

function openEvent(event) {
  const choices = event.choices || CHOICE_TEMPLATES[event.templateKey] || [];
  addStoryLog(`이벤트: ${event.title}`, event.description);

  renderEvent(
    event.title,
    event.description,
    choices.slice(0, 4).map(choice => ({
      text: choice.text,
      onClick: () => handleEventChoice(choice)
    }))
  );
}

function handleEventChoice(choice) {
  applyEffect(choice.effect || {});
  addStoryLog(`선택: ${choice.text}`, `${player.profile.name}는 "${choice.text}" 쪽으로 마음을 기울였다. 순간의 선택처럼 보여도 대학 생활은 이런 작은 결정을 꽤 오래 기억한다.`);

  if (choice.specialResult === "ENTER_MILITARY") {
    player.state.military = true;
    addStoryLog("특수 루트 진입", "입대는 대학 생활의 시간을 잠시 다른 방향으로 꺾어놓았다. 주변의 속도와 자신의 시간이 어긋나는 감각이 현실이 되었다.");
    player.progress.currentTurn += 4;
  }
  if (choice.specialResult === "GRAD_ROUTE") {
    player.state.graduateOffer = true;
  }

  updateRelationshipState();
  updateWarningsAndAchievements();
  endTurn();
}

function updateWarningsAndAchievements() {
  player.state.pinnedWarning = "";

  const displayGrade = Number(convertGradeToDisplay(player.stats.gradePoint));
  if (displayGrade <= 1.5) {
    player.state.warningCount += 1;
    player.state.pinnedWarning = "❗ 학사경고 위험. 지금부터는 회복보다 학점 복구를 먼저 생각해야 한다.";
  }
  if (player.stats.stress >= 95) {
    player.state.burnoutCount += 1;
    player.state.pinnedWarning = "⚠ 한계치에 가까워졌다. 지금은 버티는 것보다 회복이 더 중요하다.";
  } else if (player.stats.stress >= 70 && !player.state.pinnedWarning) {
    player.state.pinnedWarning = "⚠ 스트레스가 매우 높다. 작은 선택도 회복을 고려해야 한다.";
  }

  if (player.stats.love >= 70) unlockAchievement("캠퍼스 커플");
  if (player.stats.otaku >= 70) unlockAchievement("깊어진 덕심");
  if (player.stats.career >= 50) unlockAchievement("스펙의 맛");
  if (displayGrade >= 4.0) unlockAchievement("성적 장인");
}

function unlockAchievement(name) {
  if (!player.achievements.includes(name)) {
    player.achievements.push(name);
    saveAchievement(name);
  }
}

function endTurn() {
  const immediate = checkImmediateEnding();
  if (immediate) {
    renderEnding(immediate);
    renderAll();
    return;
  }

  player.progress.currentTurn += 1;
  syncTurn();

  if (player.progress.currentTurn > player.progress.totalTurns) {
    const ending = checkFinalEnding();
    renderEnding(ending);
    renderAll();
    return;
  }

  saveGameToSlot(player.profile.slot);
  openTurnMainScene();
  renderAll();
}
