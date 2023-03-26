const express = require('express');
const router = express.Router();
const {login,register} = require('../utils');

router.get('/chat', (req,res) => {
    if(req.session && req.session.user) {
    res.render('chat');
    } else {
        res.redirect('/register');
    }
})

router.get('/login',(req,res) => {
    res.render('login')
})
router.post('/login', (req,res) => {
     const {username,password} = req.body;
     const user = login(username,password);
     if(user) {
         req.session.user = user;
         res.redirect('/chat')
     } else {
         res.redirect('/login');
     }
})

router.get('/register', (req,res) => {
    res.render('register');
})

router.post('/register', (req,res) => {
    const {username,password,roomId} = req.body;
    const user = register(username,password,roomId)
    req.session.user = user;
    res.redirect('/chat');
})




module.exports = router;