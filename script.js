function chooseCharacter(character) {
    const childrenContainer = document.querySelector('.children');

    const existingNotification = document.getElementById('notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.id = 'notification';

    switch (character) {
        case 'hamster':
            notification.textContent = "You can choose Pablo Escobar as your character, why would you pick a hamster?";
            break;
        case 'pablo':
             notification.textContent = "Great choice!"
            break;
        case 'cat':
            notification.textContent = "You can choose Pablo Escobar as your character, why would you pick a cat?";
            break;
    }
    childrenContainer.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
    if (character == 'pablo') {
        const hrdina = new Pablo('Pablo', 'img/pablo.png');
        localStorage.setItem('hrdina', JSON.stringify(hrdina));
        window.location.href = 'game.html';
    } else  if (character == 'hamster') {
        window.location.href = 'game.html';
    } else if (character == 'cat') {
        window.location.href = 'game.html';
    }
}