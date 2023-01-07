const express = require('express');
const router = require('./routes/todo');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views','views');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use("/",router);
app.use((error,req,res,next) => {
    return res.send(error.message)
})

app.listen(8888);
