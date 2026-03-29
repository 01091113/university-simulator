function startGame(){
 player.name = document.getElementById("name").value;
 player.gender = document.getElementById("gender").value;
 player.college = document.getElementById("college").value;
 player.major = document.getElementById("major").value;

 applyTheme(document.getElementById("theme").value);

 document.getElementById("start-screen").classList.remove("active");
 document.getElementById("game-screen").classList.add("active");

 updateUI();
}

function updateUI(){
 document.getElementById("top-info").innerText =
  player.name + " | " + player.college + " | " + player.major +
  " | " + player.grade + "학년 | " + player.turn + "턴";

 document.getElementById("status-title").innerText =
  player.name + "의 상태";

 document.getElementById("status").innerHTML =
  "스트레스: " + player.stress + "<br>" +
  "학점: " + ((player.gradePoint/100)*4.5).toFixed(2) + "<br>" +
  "인간관계: " + player.relationship + "<br>" +
  "취업: " + player.career + "<br>" +
  "덕질: " + player.otaku + "<br>" +
  "연애: " + player.love;

 renderChoices();
 renderLog();
}
