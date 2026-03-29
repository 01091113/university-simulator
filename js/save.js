function saveGame(){
 localStorage.setItem("uni_save", JSON.stringify(player));
}

function loadGame(){
 let data = localStorage.getItem("uni_save");
 if(data) player = JSON.parse(data);
}
