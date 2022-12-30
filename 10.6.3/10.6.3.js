const URL = 'wss://echo-ws-service.herokuapp.com/';

let sendMessageButton = document.querySelector('.send-message-button');
let sendLocationButton = document.querySelector('.send-location-button');
let messageArea = document.querySelector('.messages-area');
let messageInput = document.querySelector('.input-message');

// function addIntroduction(message) {
//     if (messageArea.childNodes.length === 0) {
//     messageArea.textContent = `${message}`
//     }
// }
// addIntroduction('Напишите хотя бы одно сообщение, чтобы начать чат');

let websocket = new WebSocket(URL);

websocket.onopen = function(evt) {
    console.log("CONNECTED");
};

websocket.onmessage = function(evt) {
    if (!(evt.data[0] === "<")) {
        addMessageToChat(evt.data, 'start');
    }
 };

function addMessageToChat(message, side) {
    let backgroundColor = '';
    let margin = '';
    if (side == 'start') {
        backgroundColor = 'white'
        margin = 'right'
    } else {
        backgroundColor = '#D2D2F2';
        margin = 'left'
    }
    messageArea.innerHTML += `
    <div class="message" style="justify-self: flex-${side}; margin-${margin}: 50px; background-color: ${backgroundColor}">${message}</div>`
    messageArea.scrollTop = messageArea.scrollHeight;
    console.log(messageArea.childNodes.length);
    //addIntroduction("");
}

sendMessageButton.addEventListener('click', () => {
    websocket.send(messageInput.value, 'start');
    addMessageToChat(messageInput.value, 'end');
    messageInput.value = null;
  
});

sendLocationButton.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
        } else {
        alert('Геопозиция не поддерживается вашим браузером');
    }

    messageInput.value = null;
})

const error = () => {
    alert('Невозможно получить ваше местоположение');
}

const success = (position) => {
    const {coords} = position;
    let messageCords = `<a href="https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}">Геопозиция</a>`
    websocket.send(messageCords);
    addMessageToChat(messageCords, 'end');
}
