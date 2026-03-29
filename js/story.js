function addLog(text){
 player.logs.unshift(text);
 renderLog();
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
