function checkEnding(){
 if(player.gradePoint < 10) endGame("제적");
 if(player.stress > 100) endGame("번아웃");
 if(player.otaku > 95) endGame("오타쿠 엔딩");
 if(player.love > 95) endGame("결혼 엔딩");
 if(player.turn > 56) endGame("졸업 엔딩");
}

function endGame(text){
 alert(text);
 location.reload();
}
