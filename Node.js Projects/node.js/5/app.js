const express = require('express');
const router = require('./routes/todolist')
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(path.join(_dirname,'public')))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/',)
app.use("/",(req,res) => {
    res.send('home page')
})

app.use((error,req,res,next) => {
    return res.send(error.message)
})
