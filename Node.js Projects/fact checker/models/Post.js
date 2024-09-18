const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    username: {type: String,required: true,},
    userImage: {type: String,required: true,},
    exposed: {type: String,required: true},
    title: {type: String,required: true},
    description: {type: String,required: true},
    files: {type:[],required: true},
    trust: {type: Number,required: true,default: 0},
    distrust: {type: Number,required: true,default: 0} 
})

const model = mongoose.model('Post',PostSchema)

module.exports = model