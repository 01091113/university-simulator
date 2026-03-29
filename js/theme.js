const themes = {
 pastel1:{bg:"#eef4ff", accent:"#7da2ff"},
 pastel2:{bg:"#e8fff5", accent:"#66d9a3"},
 pastel3:{bg:"#f2eaff", accent:"#b799ff"},
 pastel4:{bg:"#fff1ea", accent:"#ff9e7d"},
 pastel5:{bg:"#fffde8", accent:"#ffd966"},
 mono1:{bg:"#eeeeee", accent:"#888888"},
 mono2:{bg:"#1e2a38", accent:"#3a4f66"},
 cotton:{bg:"#ffe6f0", accent:"#8fd3ff"},
 banana:{bg:"#fff2a6", accent:"#7a4a00"}
};

function applyTheme(name){
 let t = themes[name];
 document.documentElement.style.setProperty("--bg", t.bg);
 document.documentElement.style.setProperty("--accent", t.accent);
}
