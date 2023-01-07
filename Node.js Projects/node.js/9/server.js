const socketio = require('socket.io');
const express = require('express');
const path = require('path');
const http = require('http')
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { addUser, getUser } = require('./utils/utils');


app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", (socket) => {
    console.log("Conection", socket.id);

    socket.on('join', (username,roomId) => {
        socket.join(roomId)
        const user = addUser(socket.id, username,roomId);
        socket.emit('newMessage', `welcome ${user.username}`)
        socket.to(roomId).emit('newMessage', `${username} has joined`);
    })

    socket.on('messageSent', (message) => {
        const user = getUser(socket.id);
        socket.emit('newMessage', `You: ${message}`)
        socket.to(user.roomId).emit('newMessage', `${user.username}: ${message}`)
    })

    socket.on('disconnect', () => {
        const user = getUser(socket.id)
        socket.to(user.roomId).emit(`${user.username} has disconnected`)
        console.log('user disconnected');
    })
})


server.listen(1234, () => {
    console.log('app started')
});