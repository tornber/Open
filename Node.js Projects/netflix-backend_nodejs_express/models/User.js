const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchmea = new mongoose.Schema({
    username: {type: String,required: true,unique: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    profilePicture: {type: String,default: ""},
    isAdmin: {type: Boolean,default: false}
},{timestamps: true})

userSchmea.methods.generateAuthToken = (user) => {
    const token = jwt.sign({id: user._id,isAdmin:user.isAdmin},config.get("jwtPrivateKey"),{expiresIn: "1d"})
    return token
}

module.exports = mongoose.model('User',userSchmea)