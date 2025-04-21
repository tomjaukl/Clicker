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
    document.body.appendChild(form);
    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit';
    exitButton.id = 'exitButton';
    exitButton.addEventListener('click', function(event) {
        form.remove(); 
    });
    form.appendChild(exitButton);
    const warning = document.createElement('h2');
    warning.style.textAlign = 'center';
    warning.innerText = 'You cant change your name later!\n (cause I am lazy)';
    const nameInputContainer = document.createElement('div');
    nameInputContainer.id = 'nameInputContainer';
    form.appendChild(nameInputContainer);
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'nameInput';
    nameInput.placeholder = 'Enter your name';
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Submit';
    submit.id = 'submitButton';
    submit.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        const Name = nameInput.value.trim();
        if (Name === '') {
            event.preventDefault();
            Notification('Could you please... I dont know... ENTER SOMETHING?');
        } else if (Name == 'a'){
            event.preventDefault();
            Notification('This name is stupid!');
        } else if (Name == "john"){
            Notification('You cant be serious...');
        } else {
            const hrdina = new character(Name);
            localStorage.setItem('hrdina', JSON.stringify(hrdina));
            window.location.href = 'game.html';
        }
    });
    nameInputContainer.appendChild(warning);
    nameInputContainer.appendChild(nameInput);
    nameInputContainer.appendChild(submit);

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