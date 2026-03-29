function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resolveRandomRange(value) {
  if (value === "RANDOM_SMALL") return randomInt(-10, 10);
  if (value === "RANDOM_MEDIUM") return randomInt(-30, 30);
  if (value === "RANDOM_LARGE") return randomInt(-80, 80);
  return value;
}

function convertGradeToDisplay(gradePoint) {
  return ((gradePoint / 100) * 4.5).toFixed(2);
}

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const copied = [...arr];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function getCollegeEntries() {
  return Object.entries(COLLEGE_DATA);
}

function getMajorEntries(collegeKey) {
  const college = COLLEGE_DATA[collegeKey];
  if (!college) return [];
  return Object.entries(college.departments);
}

function getMajorData(collegeKey, majorKey) {
  return COLLEGE_DATA?.[collegeKey]?.departments?.[majorKey] || null;
}

function getStressLabel(stress) {
  if (stress < 30) return { text: "평온", cls: "" };
  if (stress < 70) return { text: "스트레스 주의", cls: "warning" };
  if (stress < 90) return { text: "스트레스 과다", cls: "warning" };
  return { text: "사망 직전", cls: "danger" };
}
