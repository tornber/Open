const express = require('express');
const models = require('../models/models');
const {todolist,donelist} = models;
const todolist = models.todolist;
const donelist = models.donelist;


const router = express.Router();

router.get("/", (req,res) => {
    res.render('main', {todolist,donelist})
})

router.post('/add', (req,res) => {
    if(req.body.task) {
        todolist.push({name: req.body.task})
    };
    res.redirect('/')

})

router.post('/movetodone',(req,res) => {
    const {index} = req.query;
    console.log(req.body)
    if(index !== undefined) {
    const currentitem = todolist[index];
    donelist.push(currentitem);
    todolist.splice(index,1)
    }
    res.send('ok');
})



module.exports = router;