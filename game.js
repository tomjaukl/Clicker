const hrdina = JSON.parse(localStorage.getItem('hrdina'));
console.log(hrdina);
document.getElementById('greed').innerHTML =  `hello ${hrdina.name}!`;
document.getElementById('profileContainer').style.backgroundImage = `url('${hrdina.picture}')`;
document.getElementById('profileContainer').style.backgroundSize = "cover";
