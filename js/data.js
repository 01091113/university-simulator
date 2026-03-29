const COLLEGE_DATA = {
  humanities: {
    name: "인문대학",
    departments: {
      korean: { name: "국어국문학과", description: "문장과 감정, 해석과 상상에 강하다. 스토리성과 연애 감수성이 높아지기 쉽다.", bonus: { gradePoint: 5, love: 6, relationship: 2 }, tags: ["literature", "writing"] },
      english: { name: "영어영문학과", description: "언어와 교류에 유리하다. 대외활동과 글로벌 루트의 출발점이 되기 좋다.", bonus: { career: 4, relationship: 5, love: 3 }, tags: ["language", "global"] },
      history: { name: "사학과", description: "끈기와 탐구심이 강점이다. 학업 루트가 안정적이고 장기전에서 강하다.", bonus: { gradePoint: 7, stress: 2 }, tags: ["research", "archive"] },
      philosophy: { name: "철학과", description: "깊게 고민하고 오래 생각한다. 멘탈 소모는 있지만 특수 대사와 선택 폭이 넓어진다.", bonus: { gradePoint: 4, love: 4, stress: 3 }, tags: ["thinking", "meaning"] }
    }
  },
  social: {
    name: "사회과학대학",
    departments: {
      psychology: { name: "심리학과", description: "인간관계와 상담 계열 이벤트에 유리하다.", bonus: { relationship: 8, love: 5, stress: -2 }, tags: ["mind", "counsel"] },
      sociology: { name: "사회학과", description: "사람과 구조를 읽는 시야가 넓다. 밸런스형 학과.", bonus: { relationship: 5, career: 4, gradePoint: 2 }, tags: ["society", "analysis"] },
      media: { name: "미디어커뮤니케이션학과", description: "발표, 공모전, 콘텐츠 루트에 강하다.", bonus: { career: 7, relationship: 5, stress: 2 }, tags: ["media", "content"] },
      politics: { name: "정치외교학과", description: "토론과 리더십 중심. 명성형 이벤트에 강하다.", bonus: { career: 6, relationship: 5, stress: 3 }, tags: ["debate", "leadership"] }
    }
  },
  business: {
    name: "경영대학",
    departments: {
      businessAdmin: { name: "경영학과", description: "공모전, 인턴, 취업 루트에 강하다.", bonus: { career: 10, relationship: 3, gradePoint: 2 }, tags: ["business", "intern"] },
      economics: { name: "경제학과", description: "현실 감각과 분석력 중심. 취업 루트가 탄탄하다.", bonus: { career: 8, gradePoint: 4 }, tags: ["market", "analysis"] },
      accounting: { name: "회계학과", description: "성실형 플레이에 유리하고 안정적이다.", bonus: { career: 7, gradePoint: 6, stress: 3 }, tags: ["numbers", "stability"] },
      globalBusiness: { name: "글로벌경영학과", description: "언어와 실무를 섞은 루트에 적합하다.", bonus: { career: 8, relationship: 4, love: 2 }, tags: ["global", "network"] }
    }
  },
  engineering: {
    name: "공과대학",
    departments: {
      computer: { name: "컴퓨터공학과", description: "해커톤, 프로젝트, 인턴 루트에 강하지만 스트레스가 오른다.", bonus: { career: 10, gradePoint: 3, stress: 6 }, tags: ["coding", "hackathon"] },
      mechanical: { name: "기계공학과", description: "실험과 설계 중심. 팀플과 취업 루트가 강하다.", bonus: { career: 8, stress: 5, relationship: 2 }, tags: ["design", "lab"] },
      electronic: { name: "전자공학과", description: "실무형 프로젝트에 유리하다.", bonus: { career: 9, gradePoint: 3, stress: 5 }, tags: ["hardware", "project"] },
      chemical: { name: "화학공학과", description: "실험과 리포트의 연속이다. 성실형 플레이에 적합하다.", bonus: { gradePoint: 5, career: 6, stress: 4 }, tags: ["experiment", "lab"] }
    }
  },
  science: {
    name: "자연과학대학",
    departments: {
      physics: { name: "물리학과", description: "이해가 되는 순간과 안 되는 순간의 온도차가 큰 학과.", bonus: { gradePoint: 6, stress: 4 }, tags: ["theory", "lab"] },
      chemistry: { name: "화학과", description: "실험과 보고서가 많아 체력 관리가 중요하다.", bonus: { gradePoint: 5, stress: 4, career: 3 }, tags: ["lab", "analysis"] },
      biology: { name: "생명과학과", description: "성실함이 곧 생존력이다. 대학원 루트에도 잘 맞는다.", bonus: { gradePoint: 6, career: 3 }, tags: ["bio", "research"] },
      math: { name: "수학과", description: "조용하지만 무서운 집중력을 발휘한다.", bonus: { gradePoint: 7, stress: 3 }, tags: ["logic", "proof"] }
    }
  },
  arts: {
    name: "예술대학",
    departments: {
      visualDesign: { name: "시각디자인학과", description: "포트폴리오와 전시 루트에 강하다. 야작 이벤트 확률이 높다.", bonus: { career: 7, love: 3, stress: 7 }, tags: ["portfolio", "design"] },
      film: { name: "영화영상학과", description: "창작과 협업 중심이다. 팀 프로젝트와 감정선이 진하다.", bonus: { relationship: 6, career: 6, stress: 4 }, tags: ["film", "creation"] },
      acting: { name: "연기예술학과", description: "감정과 발표, 인간관계 특수 루트에 강하다.", bonus: { love: 8, relationship: 7, stress: 2 }, tags: ["performance", "emotion"] },
      music: { name: "실용음악학과", description: "공연과 합주 루트에 강하고 감정형 이벤트가 많다.", bonus: { love: 5, relationship: 6, otaku: 4 }, tags: ["music", "band"] }
    }
  },
  theology: {
    name: "신학대학",
    departments: {
      theology: { name: "신학과", description: "공동체와 사유의 분위기가 강하다. 사람과 삶을 오래 바라보게 된다.", bonus: { relationship: 8, stress: -5, love: 3 }, tags: ["faith", "community"] },
      mission: { name: "선교학과", description: "봉사와 공동체 이벤트에 유리하다.", bonus: { relationship: 7, career: 3 }, tags: ["service", "faith"] },
      religion: { name: "종교학과", description: "텍스트와 해석에 강하다. 학업 루트와 의미 탐색 이벤트가 많다.", bonus: { gradePoint: 5, love: 2 }, tags: ["text", "meaning"] },
      pastoralCounsel: { name: "목회상담학과", description: "상담과 돌봄 계열 루트에 강하다.", bonus: { relationship: 10, love: 4, career: 3 }, tags: ["counsel", "care"] }
    }
  },
  education: {
    name: "사범대학",
    departments: {
      koreanEdu: { name: "국어교육과", description: "학점과 성실형 루트가 안정적이다.", bonus: { gradePoint: 6, relationship: 3 }, tags: ["education", "literature"] },
      englishEdu: { name: "영어교육과", description: "학업과 글로벌 감각이 공존한다.", bonus: { gradePoint: 5, career: 4, relationship: 2 }, tags: ["education", "language"] },
      mathEdu: { name: "수학교육과", description: "꾸준함으로 버틴다. 안정적이지만 압박도 있다.", bonus: { gradePoint: 7, stress: 3 }, tags: ["education", "logic"] },
      historyEdu: { name: "역사교육과", description: "학업 루트와 교직 루트가 자연스럽게 연결된다.", bonus: { gradePoint: 6, career: 3 }, tags: ["education", "history"] }
    }
  }
};

const THEMES = {
  "pastel-sky": { label: "파스텔 스카이" },
  "pastel-mint": { label: "파스텔 민트" },
  "pastel-lavender": { label: "파스텔 라벤더" },
  "pastel-peach": { label: "파스텔 피치" },
  "pastel-lemon": { label: "파스텔 레몬" },
  "mono-gray": { label: "모노톤 회색" },
  "mono-navy": { label: "모노톤 곤색" },
  "cotton-candy": { label: "솜사탕" },
  "banana-choco": { label: "바나나" }
};

const TURN_FLOW = [
  { label: "겨울방학", turnType: "vacation" },
  { label: "개강", turnType: "semester_start" },
  { label: "4월", turnType: "normal" },
  { label: "중간고사", turnType: "midterm" },
  { label: "축제/팀플/과제", turnType: "festival" },
  { label: "6월", turnType: "normal" },
  { label: "기말고사", turnType: "final" },
  { label: "여름방학", turnType: "vacation" },
  { label: "2학기 개강", turnType: "semester_start" },
  { label: "10월", turnType: "normal" },
  { label: "중간고사", turnType: "midterm" },
  { label: "공모전/팀플/축제", turnType: "festival" },
  { label: "기말고사", turnType: "final" },
  { label: "연말", turnType: "normal" }
];

const TURN_FLAVOR = {
  vacation: [
    "드디어 방학이다. 잠도 자고, 사람도 만나고, 스펙도 쌓고, 그냥 아무것도 안 하고 싶기도 하다.",
    "방학은 자유 같지만 동시에 압박이다. 다들 뭐라도 하고 있는 것 같은 기분이 든다.",
    "학교에서 한 발 떨어지면 살 것 같다가도, 갑자기 미래가 걱정된다."
  ],
  semester_start: [
    "새 학기가 시작됐다. 시간표를 보며 이번엔 진짜 잘 살아보겠다고 다짐한다.",
    "개강 첫 주. 아직은 다들 멀끔하고, 아직은 다들 희망이 있다.",
    "강의실 공기와 새 노트북 바탕화면이 유독 진지하게 느껴지는 시기다."
  ],
  normal: [
    "평범한 한 달 같지만 대학생의 평범함은 늘 뭔가 하나씩 터질 준비를 하고 있다.",
    "수업, 과제, 연락, 약속. 특별한 일은 없어도 마음은 늘 바쁘다.",
    "그냥 지나갈 것 같은 달이 결국 기억에 제일 오래 남기도 한다."
  ],
  midterm: [
    "시험기간이 오면 강의실과 카페와 도서관의 공기가 전부 달라진다.",
    "이쯤 되면 모든 단체방의 말투가 예민해진다.",
    "벼락치기와 체념 사이에서 인간은 생각보다 오래 흔들린다."
  ],
  festival: [
    "사람도 많고 일정도 많다. 재밌을 수도 있고, 피곤할 수도 있고, 보통은 둘 다다.",
    "축제, 팀플, 공모전, 과제. 대학생이 대학생답게 지치는 시기다.",
    "이 시기엔 인간관계가 늘거나, 체력이 줄거나, 둘 다다."
  ],
  final: [
    "종강이 멀지 않았지만 그 전에 넘어야 할 산은 여전히 크다.",
    "기말고사는 끝이 보이기 때문에 더 사람을 조급하게 만든다.",
    "이쯤 되면 모두가 말한다. 이번만 버티자."
  ]
};

const ACTIONS_BY_GRADE = {
  1: [
    { id: "study", text: "공부한다", category: "study", effect: { stress: 9, gradePoint: 14, relationship: -4, career: 1, otaku: 0, love: 1 }, tags: ["sincere"] },
    { id: "play", text: "논다", category: "life", effect: { stress: -7, gradePoint: -3, relationship: 9, career: 0, otaku: 2, love: 4 }, tags: ["social"] },
    { id: "sleep", text: "잔다", category: "rest", effect: { stress: -14 }, tags: ["rest"] },
    { id: "club", text: "동아리 간다", category: "relationship", effect: { stress: -4, gradePoint: -4, relationship: 12, career: 1, otaku: 3, love: 7 }, tags: ["social", "romantic"] },
    { id: "drink", text: "술 마신다", category: "life", effect: { stress: -3, gradePoint: -6, relationship: 8, love: 4 }, tags: ["social"] },
    { id: "friends", text: "친구 만난다", category: "relationship", effect: { stress: -6, gradePoint: -2, relationship: 8, love: 2 }, tags: ["social"] },
    { id: "otaku", text: "덕질한다", category: "otaku", effect: { stress: -10, gradePoint: -4, otaku: 11, relationship: -2 }, tags: ["geek"] }
  ],
  2: [
    { id: "study", text: "공부한다", category: "study", effect: { stress: 10, gradePoint: 13, relationship: 1, career: 3 }, tags: ["sincere"] },
    { id: "teamProject", text: "팀플에 집중한다", category: "study", effect: { stress: 12, gradePoint: 7, relationship: 5, career: 4 }, tags: ["sincere", "social"] },
    { id: "play", text: "논다", category: "life", effect: { stress: -7, gradePoint: -3, relationship: 7, love: 4 }, tags: ["social"] },
    { id: "sleep", text: "잔다", category: "rest", effect: { stress: -12 }, tags: ["rest"] },
    { id: "toeic", text: "토익 준비", category: "career", effect: { stress: 8, career: 8, gradePoint: -2 }, tags: ["realistic"] },
    { id: "club", text: "동아리 간다", category: "relationship", effect: { stress: -4, gradePoint: -3, relationship: 8, love: 5 }, tags: ["social", "romantic"] },
    { id: "confession", text: "고백한다", category: "love", effect: { stress: 5, love: 3 }, tags: ["romantic"] },
    { id: "militaryThink", text: "입대를 고민한다", category: "special", effect: { stress: 4 }, tags: ["realistic"] }
  ],
  3: [
    { id: "study", text: "공부한다", category: "study", effect: { stress: 10, gradePoint: 11, career: 3 }, tags: ["sincere"] },
    { id: "contest", text: "공모전 준비", category: "career", effect: { stress: 10, relationship: 5, career: 10, gradePoint: 2 }, tags: ["realistic", "social"] },
    { id: "internship", text: "인턴 지원", category: "career", effect: { stress: 13, career: 15, love: -2 }, tags: ["realistic"] },
    { id: "certificate", text: "자격증 공부", category: "career", effect: { stress: 8, career: 9, gradePoint: 2 }, tags: ["realistic"] },
    { id: "sleep", text: "잔다", category: "rest", effect: { stress: -12 }, tags: ["rest"] },
    { id: "play", text: "논다", category: "life", effect: { stress: -6, relationship: 7, love: 3, gradePoint: -3 }, tags: ["social"] },
    { id: "otaku", text: "덕질한다", category: "otaku", effect: { stress: -10, otaku: 12, relationship: -2, career: -2 }, tags: ["geek"] },
    { id: "date", text: "데이트한다", category: "love", effect: { stress: -5, love: 8, money: -3 }, tags: ["romantic"] }
  ],
  4: [
    { id: "study", text: "공부한다", category: "study", effect: { stress: 8, gradePoint: 9, career: 4 }, tags: ["sincere"] },
    { id: "interview", text: "면접 준비", category: "career", effect: { stress: 11, career: 12, love: -3 }, tags: ["realistic"] },
    { id: "jobSearch", text: "취업 준비", category: "career", effect: { stress: 10, career: 10 }, tags: ["realistic"] },
    { id: "graduatePrep", text: "대학원 준비", category: "study", effect: { stress: 10, gradePoint: 12, career: 4 }, tags: ["sincere"] },
    { id: "travel", text: "여행 간다", category: "life", effect: { stress: -8, love: 3, money: -4 }, tags: ["social"] },
    { id: "play", text: "논다", category: "life", effect: { stress: -6, relationship: 6, gradePoint: -3 }, tags: ["social"] },
    { id: "sleep", text: "잔다", category: "rest", effect: { stress: -11 }, tags: ["rest"] },
    { id: "date", text: "데이트한다", category: "love", effect: { stress: -4, love: 7, money: -3 }, tags: ["romantic"] }
  ]
};

const CHOICE_TEMPLATES = {
  mt: [
    { text: "열심히 참여한다", effect: { relationship: 12, stress: 5, love: 3 } },
    { text: "적당히만 어울린다", effect: { relationship: 7, stress: 2 } },
    { text: "안 간다", effect: { stress: -3, gradePoint: 3, relationship: -4 } },
    { text: "술자리만 간다", effect: { relationship: 5, stress: -1, gradePoint: -4, love: 4 } }
  ],
  exam: [
    { text: "벼락치기한다", effect: { gradePoint: 9, stress: 10 } },
    { text: "친구 필기를 빌린다", effect: { gradePoint: 6, relationship: 4, stress: 3 } },
    { text: "일단 잔다", effect: { stress: -6, gradePoint: -8 } },
    { text: "이번 생은 망했다 하고 포기한다", effect: { stress: -2, gradePoint: -12, otaku: 3 } }
  ],
  confession: [
    { text: "솔직하게 고백한다", effect: { love: "RANDOM_MEDIUM", stress: 5, relationship: -3 } },
    { text: "조금 더 썸을 탄다", effect: { love: 7, stress: 2 } },
    { text: "아무 일도 없던 척한다", effect: { love: -6, stress: -3 } }
  ],
  military: [
    { text: "입대한다", effect: { stress: 15, relationship: -12, love: -15 }, specialResult: "ENTER_MILITARY" },
    { text: "조금 더 미룬다", effect: { stress: 5, career: -2 } },
    { text: "못 본 척한다", effect: { stress: 7, career: -2 } }
  ],
  dateConflict: [
    { text: "솔직하게 이야기한다", effect: { love: 5, relationship: 4, stress: 2 } },
    { text: "무조건 사과한다", effect: { love: 3, stress: 4 } },
    { text: "연락을 피한다", effect: { love: -8, stress: -1 } },
    { text: "친구에게 하소연한다", effect: { relationship: 5, love: -2 } }
  ],
  otakuBinge: [
    { text: "끝까지 달린다", effect: { otaku: 10, stress: -8, gradePoint: -4 } },
    { text: "적당히 보고 끈다", effect: { otaku: 5, stress: -4 } },
    { text: "다음 화를 참는다", effect: { otaku: -1, gradePoint: 2, stress: 1 } },
    { text: "최애 굿즈를 산다", effect: { otaku: 7, money: -4, stress: -3 } }
  ],
  gradOffer: [
    { text: "대학원에 간다", effect: { gradePoint: 4, career: 5 }, specialResult: "GRAD_ROUTE" },
    { text: "정중히 거절한다", effect: { career: 10, relationship: 2 } },
    { text: "대답을 피한다", effect: { stress: 6 } }
  ]
};

const GENERAL_EVENTS = [
  { id: "mt", title: "MT 공지가 올라왔다", description: "과 단톡방이 갑자기 시끄러워졌다. 신입생 환영 MT 이야기가 본격적으로 나오기 시작했다.", grades: [1], turnTypes: ["semester_start", "festival"], category: "relationship", templateKey: "mt" },
  { id: "exam", title: "시험범위를 모르겠다", description: "교수님은 분명 설명했다고 했는데 아무도 기억하지 못한다. 지금 필요한 건 정리된 노트거나, 강한 멘탈이다.", grades: [1,2,3,4], turnTypes: ["midterm", "final"], category: "study", templateKey: "exam" },
  { id: "confession", title: "이제는 말해야 할 것 같다", description: "계속 마음에 두고 있던 사람이 있다. 지금 말하면 달라질 수도 있고, 아무 말도 하지 않으면 계속 그대로일 수도 있다.", grades: [2,3], turnTypes: ["normal", "festival", "vacation"], category: "love", templateKey: "confession", conditions: { minLove: 55, minRelationship: 55 } },
  { id: "military", title: "입대 이야기를 더는 피할 수 없다", description: "주변 친구들 사이에서도 군대 이야기가 자연스럽게 나온다. 미뤄왔던 현실이 점점 가까워진다.", grades: [2,3], turnTypes: ["normal", "semester_start"], category: "special", templateKey: "military", conditions: { gender: "male" } },
  { id: "dateConflict", title: "연애가 달콤하기만 하진 않다", description: "시험기간과 약속이 겹치고, 서운함은 생각보다 쉽게 쌓인다. 이제는 대충 넘어갈 수 없을지도 모른다.", grades: [2,3,4], turnTypes: ["midterm", "final", "normal"], category: "love", templateKey: "dateConflict", conditions: { dating: true } },
  { id: "otakuBinge", title: "다음 화를 안 볼 수가 없다", description: "한 편만 볼 생각이었는데 어느새 시간이 너무 많이 흘러버렸다. 이건 분명 내 의지가 약한 게 아니라 작품이 너무 재밌는 거다.", grades: [1,2,3,4], turnTypes: ["vacation", "normal"], category: "otaku", templateKey: "otakuBinge", conditions: { minOtaku: 35 } },
  { id: "gradOffer", title: "교수님이 면담을 요청했다", description: "조심스럽게 건네는 말투지만 핵심은 분명하다. '대학원 생각은 없니?'라는 질문이 공기 속에 남는다.", grades: [4], turnTypes: ["final", "normal"], category: "career", templateKey: "gradOffer", conditions: { minGradePoint: 82 } }
];

const DEPARTMENT_EVENTS = {
  computer: [
    { title: "해커톤 모집 공지가 떴다", description: "밤샘은 확정이지만 포트폴리오에 크게 남을 수 있다.", choices: [
      { text: "밤샘 각오하고 참가한다", effect: { career: 15, stress: 10, gradePoint: 3 } },
      { text: "친구랑 팀을 짠다", effect: { career: 11, relationship: 7, stress: 7 } },
      { text: "구경만 한다", effect: { career: 4, stress: -1 } },
      { text: "체력 이슈로 포기한다", effect: { stress: -4, career: -3 } }
    ] }
  ],
  businessAdmin: [
    { title: "케이스 경진대회 제안이 들어왔다", description: "경영대 로비에서 선배가 같이 팀을 하자고 한다.", choices: [
      { text: "바로 합류한다", effect: { career: 12, relationship: 5, stress: 6 } },
      { text: "자료 조사만 맡는다", effect: { career: 7, stress: 3, gradePoint: 2 } },
      { text: "발표 맡고 존재감을 챙긴다", effect: { career: 10, relationship: 8, stress: 7, love: 2 } },
      { text: "이번엔 거절한다", effect: { stress: -3, career: -2 } }
    ] }
  ],
  psychology: [
    { title: "친구가 고민 상담을 요청했다", description: "대충 들을 수도 있지만, 진지하게 들어주면 관계가 달라질지도 모른다.", choices: [
      { text: "진지하게 들어준다", effect: { relationship: 10, love: 3, stress: 2 } },
      { text: "현실적인 조언을 해준다", effect: { relationship: 7, career: 2 } },
      { text: "일단 위로만 해준다", effect: { relationship: 6, love: 4 } },
      { text: "내가 더 힘들다며 피한다", effect: { relationship: -6, stress: -1 } }
    ] }
  ],
  theology: [
    { title: "수련회 제안이 들어왔다", description: "마음을 다잡을 시간일까, 아니면 쉬어갈 시간일까.", choices: [
      { text: "수련회에 참여한다", effect: { stress: -12, relationship: 8, love: 3 } },
      { text: "봉사 스태프로 돕는다", effect: { relationship: 10, career: 3, stress: -5 } },
      { text: "혼자 조용히 쉰다", effect: { stress: -10, gradePoint: 3 } },
      { text: "아무것도 하지 않는다", effect: { stress: -3, relationship: -2 } }
    ] }
  ],
  film: [
    { title: "단편 영화 촬영 제안이 들어왔다", description: "밤샘 촬영은 힘들겠지만, 끝나고 나면 분명 남는 게 있을 것 같다.", choices: [
      { text: "주도적으로 참여한다", effect: { career: 12, relationship: 7, stress: 8 } },
      { text: "스태프로만 돕는다", effect: { relationship: 5, career: 6, stress: 4 } },
      { text: "아이디어만 보탠다", effect: { career: 4, stress: 1 } },
      { text: "이번엔 패스한다", effect: { stress: -3, career: -2 } }
    ] }
  ],
  visualDesign: [
    { title: "포트폴리오 마감이 다가온다", description: "수정에 수정을 거듭하다 보니 새벽이 되어버렸다.", choices: [
      { text: "끝장을 본다", effect: { career: 14, stress: 12, love: -2 } },
      { text: "피드백을 받아 수정한다", effect: { career: 10, relationship: 5, stress: 6 } },
      { text: "지금 버전으로 제출한다", effect: { career: 7, stress: 3 } },
      { text: "마감 직전까지 미룬다", effect: { career: 2, stress: 9 } }
    ] }
  ]
};

const STARTING_PLAYER = {
  profile: {
    name: "",
    gender: "female",
    collegeKey: "",
    collegeLabel: "",
    majorKey: "",
    majorLabel: "",
    theme: "pastel-sky",
    slot: "slot1"
  },
  progress: {
    currentGrade: 1,
    currentTurn: 1,
    totalTurns: 56,
    currentMonthIndex: 0,
    turnType: "semester_start",
    gameEnded: false
  },
  stats: {
    stress: 20,
    gradePoint: 55,
    relationship: 50,
    career: 0,
    otaku: 25,
    love: 25,
    money: 8
  },
  state: {
    some: false,
    dating: false,
    conflict: false,
    brokenUp: false,
    military: false,
    warningCount: 0,
    burnoutCount: 0,
    intern: false,
    graduateOffer: false,
    pinnedWarning: ""
  },
  achievements: [],
  logs: [],
  unlockedEndings: []
};
