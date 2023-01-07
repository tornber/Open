const socketio = require('socket.io');
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http')
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { addUser, getUser } = require('./utils/utils');
const router = require('./routes/route')

app.use(express.static(path.join(__dirname, 'public')));

const sessionMiddleware = session({secret: 'test',resave: false,saveUninitialized: true});
app.use(sessionMiddleware);
io.use((socket,next) => {
    sessionMiddleware(socket.requset,socket.request.res,next)
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/',router);

app.set('view engine', 'ejs');
app.set('views', 'views');

io.on("connection", (socket) => {
    const user = socket.request.session.user
    console.log("Conection", socket.id,socket.request.session.user);

    socket.on('join', (username) => {
        socket.emit('newMessage', `welcome ${user.username}`)
        socket.to(user.roomId).emit('newMessage', `${username} has joined`);
    })

    socket.on('messageSent', (message) => {
        socket.emit('newMessage', `You: ${message}`)
        socket.to(user.roomId).emit('newMessage', `${user.username}: ${message}`)
    })

    socket.on('disconnect', () => {
        socket.to(user.roomId).emit(`${user.username} has disconnected`)
    })
})


server.listen(1234, () => {
    console.log('app started')
});