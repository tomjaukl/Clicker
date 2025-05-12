let playTime = 0;
function chooseCharacter(character) {
    switch (character) {
        case 'hamster':
            formName(Hamster);
            break;
        case 'dealer':
             formName(Dealer);
            break;
        case 'cat':
            formName(Cat);
            break;
    }
}
function formName(character) {
    const form = document.createElement('form');
    form.id = 'heroInfo';
    form.method = 'dialog';

    // Append the form to the DOM before adding event listeners
    document.body.appendChild(form);

    const exitButton = document.createElement('button');
    exitButton.type = 'button'; 
    exitButton.textContent = 'Exit';
    exitButton.id = 'exitButton';
    exitButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        form.remove(); 
    });
    form.appendChild(exitButton);

    const warning = document.createElement('h2');
    warning.style.textAlign = 'center';
    warning.innerText = 'You can’t change your name later!\n (cause I am lazy)';
    form.appendChild(warning);

    const nameInputContainer = document.createElement('div');
    nameInputContainer.id = 'nameInputContainer';
    form.appendChild(nameInputContainer);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'nameInput';
    nameInput.placeholder = 'Enter your name';
    nameInputContainer.appendChild(nameInput);
    nameInput.focus();

    const submit = document.createElement('button');
    submit.type = 'button';
    submit.textContent = 'Submit';
    submit.id = 'submitButton';
    nameInputContainer.appendChild(submit);

    // Add the submit event listener after the form is appended to the DOM
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const Name = nameInput.value.trim();
    
        if (Name === '') {
            Notification('Could you please... I don’t know... ENTER SOMETHING?');
        } else if (Name === 'a') {
            Notification('This name is stupid!');
        } else if (Name === 'john') {
            Notification('You can’t be serious...');
        } else {
            const hrdina = new character(Name);
            localStorage.setItem('hrdina', JSON.stringify(hrdina));
            console.log(hrdina);
            window.location.href = 'game.html';
        }
    });
    submit.addEventListener('click', function() {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });

}
function Notification(message) {

    const notification = document.createElement('div');
    notification.id = 'notification';
    const existingNotification = document.getElementById('notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    document.body.appendChild(notification);
    notification.textContent = message;
    setTimeout(() => {
        notification.remove();
    }, 4000);
}
function ClickCount() {
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    Notification('You clicked ' + hrdina.clicks + ' times!');
    console.log(hrdina);
}
function AddEverything(){
    CriticalStrike();
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    hrdina.clicks += 1;
    AddCash(hrdina);
    hrdina.experience += 1;
    AddLevel(hrdina);
    localStorage.setItem('hrdina', JSON.stringify(hrdina));
    DisplayStats();
    console.log(hrdina);

}
function AddCash(hrdina) {
    hrdina.cash += (hrdina.AddCash*hrdina.level); 
    document.getElementById('money').innerHTML = hrdina.cash + ' $';
}
function DisplayStats() {
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    document.getElementById('money').innerHTML = hrdina.cash + ' $';
    document.getElementById('level').innerHTML =  hrdina.level + ' level';
}
function AddLevel(hrdina){
    if (hrdina.experience % 100 === 0){
        hrdina.level += 1;
        Notification('You leveled up! You are now level ' + hrdina.level);
    }
}
function BeginPassiveIncome(){
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    if (hrdina.cash < 100) {
        Notification('You need at least 100$');
        return;
    }
    hrdina.cash -= 100;
    const passiveIncomeInterval = setInterval(() => {
        hrdina.cash += 1;
        localStorage.setItem('hrdina', JSON.stringify(hrdina));
        DisplayStats();
    }, 5000);

    localStorage.setItem('passiveIncome', passiveIncomeInterval);
}
function CountTime() {
    setInterval(() => {
        playTime += 1; 
        const hours = Math.floor(playTime / 3600);
        const minutes = Math.floor((playTime % 3600) / 60);
        const seconds = playTime % 60;

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        document.getElementById('gameCounter').innerText = `Time Played: ${formattedTime}`;
    }, 1000); 
}
function Save() {
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    const passiveIncome = JSON.parse(localStorage.getItem('passiveIncome'));

    console.log('hrdina:', hrdina);
    console.log('passiveIncome:', passiveIncome);

    const saveData = {
        hrdina: hrdina,
        playTime: playTime 
    };
    console.log('saveData:', saveData);

    const jsonData = JSON.stringify(saveData, null, 4);
    console.log('jsonData:', jsonData);

    const blob = new Blob([jsonData], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'game_save.json';
    link.click(); 
    URL.revokeObjectURL(link.href);
}
function LoadCharacter(){
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    console.log(hrdina);
    document.getElementById('greed').innerHTML =  `hello ${hrdina.name}!`;
    document.getElementById('profileContainer').style.backgroundImage = `url('${hrdina.picture}')`;
    document.getElementById('profileContainer').style.backgroundSize = "cover";
}
function Load(event) {
    const file = event.target.files[0]; // Get the selected file
    if (!file) {
        Notification('No file selected!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const saveData = JSON.parse(e.target.result); // Parse the JSON data

            // Restore the game state
            if (saveData.hrdina) {
                localStorage.setItem('hrdina', JSON.stringify(saveData.hrdina));
            }
            if (saveData.passiveIncome) {
                localStorage.setItem('passiveIncome', JSON.stringify(saveData.passiveIncome));
            }
            if (saveData.playTime !== undefined) {
                playTime = saveData.playTime; // Restore play time
            }

            Notification('Game loaded successfully!');
            DisplayStats();
            LoadCharacter();
        } catch (error) {
            Notification('Failed to load the game. Invalid file format.');
            console.error('Error loading game:', error);
        }
    };

    reader.readAsText(file); // Read the file as text
}
function doubleClick(){
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    hrdina.AddCash += 1;
    localStorage.setItem('hrdina', JSON.stringify(hrdina));
    Notification('you are now getting one more dolla per click lul');
}
function CriticalStrikeEnable(){
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    if (hrdina.cash < 100) {
        Notification('You need at least 100$');
        return;
    }
    hrdina.hasCriticalStrike = true;
    hrdina.CriticalStrikePower = 1;
    hrdina.cash -= 100;
    localStorage.setItem('hrdina', JSON.stringify(hrdina));
    Notification('Critical Strike is now enabled!');
    DisplayStats();
    console.log(hrdina);
    document.getElementById('buyCritical').style.display = 'none';
}
function CriticalStrike() {
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    if (!hrdina.hasCriticalStrike){
        return; 
    }
    const chance = Math.random(); 
    if (chance < 0.01) { 
        hrdina.cash += hrdina.CriticalStrikePower * 100;
        moneygot = hrdina.CriticalStrikePower * 100;
        Notification('Critical Strike! You earned ' + moneygot + '$! ');
        localStorage.setItem('hrdina', JSON.stringify(hrdina));
        DisplayStats();
    }
}
function UpgradeCriticalStrike(){
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    hrdina.CriticalStrikePower += 1;
    Notification('your critical strike power has been upgraded');
    localStorage.setItem('hrdina', JSON.stringify(hrdina));
    DisplayStats();
}
function PassiveIncome(){
    if (hrdina.cash < 100) {
        Notification('You need at least 100$');
        return;
    }
    hrdina.cash -= 100;
    const passiveIncomeInterval = setInterval(() => {
        const hrdina = JSON.parse(localStorage.getItem('hrdina'));
        hrdina.cash += 1;
        localStorage.setItem('hrdina', JSON.stringify(hrdina));
        DisplayStats();
    }, 5000);

    localStorage.setItem('passiveIncome', passiveIncomeInterval);
    Notification('Passive income is now enabled! You will earn 1$ every 5 seconds!');
    document.getElementById('buyPassive').style.display = 'none';
    DisplayStats();
}
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        AddEverything();
        CriticalStrike(); 
    }
});
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        e.preventDefault(); // Prevent the default spacebar behavior (e.g., scrolling)
        AddEverything(); // Call the AddEverything function
    }
});
