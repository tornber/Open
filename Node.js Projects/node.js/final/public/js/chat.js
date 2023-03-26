const socket = io();

const sendMessage = () => {
    const input = document.getElementById('messageInput');
    socket.emit('messageSent', input.value);
}

socket.on('newMessage', (message) => {
    console.log(message);
})