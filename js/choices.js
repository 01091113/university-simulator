function getChoices(){
 let list = [
  {text:"공부", effect:{gradePoint:3, stress:3}},
  {text:"논다", effect:{relationship:3, stress:-3}},
  {text:"알바", effect:{money:5, stress:2}},
  {text:"덕질", effect:{otaku:5, stress:-5}},
  {text:"데이트", effect:{love:5, money:-3}}
 ];

 return shuffle(list).slice(0,4);
}

function shuffle(array){
 return array.sort(()=>Math.random()-0.5);
}
