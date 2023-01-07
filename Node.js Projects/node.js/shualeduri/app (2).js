const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { userInfo } = require('os');
const { text } = require('express');

app.set('view engine', 'ejs');
app.set('views','public');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')));

mongoose.connect('mongodb://localhost:27017/task-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const Schema = new mongoose.Schema({
    text: String
})

const texts = mongoose.model('texts',Schema);

app.get('/', (req,res) => {
    texts.find({}, (error,docs) => {
        if(error) {
            console.log(error.message);
        } else
        res.render('index', {texts: docs});
    })
});
app.post('/new', (req,res) => {
    const text = new texts( {
        text: req.body.text
    }).save( (err,doc) => {
        if(err) {
            console.log(err.message);
        }
    })
    res.redirect('/');
})

const server = http.createServer(app);

server.listen(1234);