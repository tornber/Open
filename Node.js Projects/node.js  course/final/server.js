const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const router = require('./routs/routs');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const sessionMidleware = session({secret: 'test',resave: false,saveUninitialized: true}) 



app.use(sessionMidleware)
io.use( (socket,next) => {
    sessionMidleware(socket.request,socket.request.res,next);
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', router);
app.set('view engine', 'ejs');
app.set('views', 'views');


io.on('connection',(socket) => {

    const user = socket.session.request.user;

    socket.on('join', () => {
        socket.emit('newMessage', `welcome ${user.username}`);
        socket.broadcast.emit('newMessage',`${user.username} has joined`);
    })

    socket.on('messageSent', (message) => {
        socket.emit('newMessage', `you: ${message}`);
        socket.broadcast.emit('newMessage', `${user.username}: ${message}`);
    })
})



server.listen(1234, () => {
    console.log('app started');
});