
function checkEnding(){
 if(player.gradePoint < 10) return "제적";
 if(player.stress > 100) return "번아웃";
 if(player.turn > 56) return "졸업";
 return null;
}
