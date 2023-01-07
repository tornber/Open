const express = require('express')
const CryptoJS  = require('crypto-js')
const config = require('config')
const User = require('../models/User')
const _ = require('lodash')
const router = express.Router()


router.post('/me',async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('invalid email or password')
    const bytes = CryptoJS.AES.decrypt(user.password,config.get('cryptojskey'))
    const password = bytes.toString(CryptoJS.enc.Utf8)

    if (password !== req.body.password) return res.status(400).send('invalid email or password')
    const token = user.generateAuthToken(user)
    res
        .header("auth-token",token)
        .status(200)
        .send(_.pick(user,['_id','email','username','profilePicture']))
})

module.exports = router