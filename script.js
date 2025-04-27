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
}
function AddEverything(){
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    hrdina.clicks += 1;
    AddCash(hrdina);
    hrdina.experience += 1;
    AddLevel(hrdina);
    localStorage.setItem('hrdina', JSON.stringify(hrdina));
    DisplayStats();
    console.log(hrdina);

}
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        e.preventDefault(); // Prevent the default spacebar behavior (e.g., scrolling)
        AddEverything(); // Call the AddEverything function
    }
});
function AddCash(hrdina) {
    hrdina.cash += (hrdina.AddCash*hrdina.level); 
    document.getElementById('money').innerHTML = hrdina.cash + ' $';
}
function DisplayStats() {
    const hrdina = JSON.parse(localStorage.getItem('hrdina'));
    document.getElementById('money').innerHTML = hrdina.cash + ' $';
    document.getElementById('level').innerHTML =  hrdina.level + ' level';
    document.getElementById('clicks').innerHTML = hrdina.clicks;
}
function AddLevel(hrdina){
    if (hrdina.experience % 100 === 0){
        hrdina.level += 1;
        Notification('You leveled up! You are now level ' + hrdina.level);
    }
}