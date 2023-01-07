const express = require('express');
const models = require('../models/models')
const {todolist,donelist} = models;

const router = express.Router();

router.get("/",(req,res) => {
    res.render('main',{todolist,donelist})
})
//localhost:8888/add
router.post("/add",(req,res) => {
    if(req.body.task) {
    todolist.push({name: req.body.task})
    }
    res.redirect('/')
})

router.get('/movetodo', (req,res) => {
    const {index} = req.query;
    if(index !== undefined) {
        const currentItem = donelist[index];
        todolist.push(currentItem)
        donelist.splice(index,1);
    }
    res.redirect('/');
})

router.get('/movetodone', (req,res) => {
    const {index} = req.query;
    if(index !== undefined) {
        const currentItem = todolist[index];
        donelist.push(currentItem)
        todolist.splice(index,1);
    }
    res.redirect('/');
})

router.post('/movetodone', (req,res) => {
    const {index} = req.body;
    if(index !== undefined) {
        const currentItem = todolist[index];
        donelist.push(currentItem)
        todolist.splice(index,1);
    }
    res.send("ok");
})



module.exports = router;