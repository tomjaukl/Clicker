const hrdina = JSON.parse(localStorage.getItem('hrdina'));
console.log(hrdina);
document.getElementById('greed').innerHTML = hrdina.name + " hello!";
document.getElementById('profileContainer').style.backgroundImage = `url('${hrdina.picture}')`;
document.getElementById('profileContainer').style.backgroundSize = "cover";