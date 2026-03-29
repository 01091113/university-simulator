function nextTurn(){
 player.turn++;

 if(player.turn % 14 === 0) player.grade++;

 randomEvent();
 applyMajorBonus();
 updateUI();
 checkEnding();
}

function randomEvent(){
 if(Math.random() < 0.2){
  let e = events[Math.floor(Math.random()*events.length)];
  applyEffect(e.effect);
  addLog(e.text);
 }
}

function applyMajorBonus(){
 let bonus = colleges[player.college][player.major];
 for(let k in bonus){
  player[k] += bonus[k];
 }
}
