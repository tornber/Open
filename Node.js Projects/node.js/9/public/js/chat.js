const socket = io()

const sendMessage = () => {
    const input = document.getElementById('messageInput');
    socket.emit('messageSent', input.value);
}


socket.on('newMessage', (message) => {
    console.log(message);
})

const {username,room} = Qs.parse(window.location.search, {ignoreQueryPrefix: true})
socket.emit('join',username,room)