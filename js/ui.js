
function updateUI(){
 document.getElementById("top-info").innerText =
  player.name + " | " + player.grade + "학년 | " + player.turn + "턴";

 document.getElementById("status").innerHTML =
  "스트레스:" + player.stress + "<br>" +
  "학점:" + ((player.gradePoint/100)*4.5).toFixed(2) + "<br>" +
  "인간관계:" + player.relationship + "<br>" +
  "취업:" + player.career + "<br>" +
  "덕질:" + player.otaku + "<br>" +
  "연애:" + player.love;

 renderChoices();
 renderLog();
}

function renderChoices(){
 let box = document.getElementById("choices");
 box.innerHTML="";
 getChoices().forEach(c=>{
  let b = document.createElement("button");
  b.className="choice";
  b.innerText=c.text;
  b.onclick=()=>{applyEffects(c.effect); nextTurn();}
  box.appendChild(b);
 });
}

function renderLog(){
 let log = document.getElementById("log");
 log.innerHTML="";
 player.logs.forEach(l=>{
  let li=document.createElement("li");
  li.innerText=l;
  log.appendChild(li);
 });
}

function addLog(t){
 player.logs.unshift(t);
}

function applyEffects(e){
 for(let k in e){
  player[k]+=e[k];
 }
}
