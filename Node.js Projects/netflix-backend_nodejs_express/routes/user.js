const express = require('express')
const CryptoJS  = require('crypto-js')
const config = require('config')
const User = require('../models/User')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router()

router.post('/register',async (req,res) => {
    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send(`user already exist with email ${req.body.email}`)

    user = new User({
        username: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,config.get('cryptojskey').toString())
    })

    user = await user.save()
    res.status(200).send(user)
})

router.put('/:id',auth,async (req,res) => {
    if (req.body.password)
        req.body.password = CryptoJS.AES.encrypt(req.body.password,config.get('cryptojskey').toString())
    
    let id = req.params.id
    let user = await User.findByIdAndUpdate(id,{$set: req.body},{new:true})
    if (user)
        res.status(200).send(user)
    else 
        res.status(404).send('could not update')
})

router.delete('/:id',[auth,admin],async (req,res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user) return res.status(404).send('No such User')

    res.status(200).send('user deleted successfully')
})

router.get('/:id',[auth,admin],async (req,res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send('User not found')

    res.status(200).send(user)
})

router.get('/',[auth,admin],async(req,res) => {
    const users = await User.find().sort({updatedAt: -1})
    if (!users) return res.status(404).send('No User found')

    res.status(200).send(users)
})


module.exports = router

