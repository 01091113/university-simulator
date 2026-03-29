const ENDINGS = {
  expelled: {
    title: "제적 엔딩",
    variants: [
      "버티려 했지만 흐름은 너무 많이 무너져 있었다. 학교는 더 이상 기다려주지 않았다.",
      "몇 번이고 다시 해보려 했지만, 대학 생활은 생각보다 냉정하게 결론을 내렸다."
    ]
  },
  burnout: {
    title: "번아웃 엔딩",
    variants: [
      "끝까지 가보려 했지만 몸과 마음 중 하나가 먼저 멈춰섰다.",
      "해낼 수 있을 줄 알았지만, 회복 없이 버티는 데에도 한계는 있었다."
    ]
  },
  graduate: {
    title: "졸업 엔딩",
    variants: [
      "완벽하진 않았지만 무너지지도 않았다. 그 자체로 꽤 괜찮은 대학 생활이었다.",
      "빛나는 순간만 있었던 건 아니지만, 그래도 끝까지 걸어와 졸업장을 손에 쥐었다."
    ]
  },
  employment: {
    title: "취업 엔딩",
    variants: [
      "준비해온 시간은 생각보다 단단했다. 결국 원하는 방향으로 한 걸음을 내디뎠다.",
      "불안과 준비의 시간을 지나 결국 자리를 얻었다. 꽤 많은 밤이 헛되지 않았다."
    ]
  },
  graduateSchool: {
    title: "대학원 엔딩",
    variants: [
      "대학은 끝났지만 공부는 끝나지 않았다. 더 오래, 더 깊게 파고들기로 했다.",
      "교수님의 권유는 결국 현실이 되었다. 당신은 익숙한 학교를 조금 다른 얼굴로 다시 마주한다."
    ]
  },
  unemployed: {
    title: "백수 엔딩",
    variants: [
      "졸업은 했지만 다음 장은 아직 비어 있었다. 그래도 이야기가 끝난 건 아니다.",
      "조금 늦었을 뿐이다. 아직 선택지는 남아 있고, 인생은 생각보다 길다."
    ]
  },
  otaku: {
    title: "오타쿠 엔딩",
    variants: [
      "사회보다 최애를 택했다. 의외로 그 선택은 꽤 오래 당신을 웃게 만들었다.",
      "남들이 보기엔 현실도피였을지 몰라도, 당신에겐 분명한 행복이었다."
    ]
  },
  marriage: {
    title: "결혼 엔딩",
    variants: [
      "수많은 선택 끝에 남은 건 사람 하나였다. 그리고 그 사람은 앞으로의 날들까지 함께하자고 말했다.",
      "대학생활은 끝났지만, 둘의 이야기는 이제부터가 시작이었다."
    ]
  },
  earlyEmployment: {
    title: "조기취업 엔딩",
    variants: [
      "누구보다 빠르게 현실로 뛰어들었다. 대학 생활의 끝은 곧바로 사회의 시작이었다.",
      "아직 학생 같은 얼굴로 사회의 문을 먼저 두드렸다. 준비해온 시간은 생각보다 단단했다."
    ]
  }
};

function checkImmediateEnding() {
  const displayGrade = Number(convertGradeToDisplay(player.stats.gradePoint));
  if (displayGrade <= 0.3) return "expelled";
  if (player.state.burnoutCount >= 4) return "burnout";
  return null;
}

function checkFinalEnding() {
  if (player.progress.currentTurn <= player.progress.totalTurns) return null;
  if (player.stats.otaku >= 100 && player.stats.relationship <= 30 && player.stats.stress <= 15) return "otaku";
  if (player.stats.love >= 100) return "marriage";
  if (player.state.graduateOffer && player.stats.gradePoint >= 82) return "graduateSchool";
  if (player.stats.career >= 88) return "earlyEmployment";
  if (player.stats.career >= 70) return "employment";
  if (player.stats.gradePoint >= 50) return "graduate";
  return "unemployed";
}

function renderEnding(endingKey) {
  const ending = ENDINGS[endingKey];
  if (!ending) return;
  player.progress.gameEnded = true;
  saveUnlockedEnding(endingKey);
  const text = sample(ending.variants);

  renderEvent(
    ending.title,
    text + "\n\n엔딩이 갤러리에 기록되었다.",
    [{ text: "처음 화면으로 돌아가기", onClick: backToStart }],
    "ending"
  );
  renderGallery();
}
