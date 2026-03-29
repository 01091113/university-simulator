
function nextTurn(){
 player.turn++;
 if(player.turn % 14 === 0) player.grade++;
 let ev = events[rand(0, events.length-1)];
 applyEffects(ev.effects);
 addLog(ev.title);
 updateUI();
 let ending = checkEnding();
 if(ending) alert(ending + " 엔딩");
}
