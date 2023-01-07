const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: {type: String,required: true,unique: true},
    movies: {type: [
        mongoose.Schema.Types.ObjectId
    ]}
},{timeStamps: true})

module.exports = mongoose.model('Genre',genreSchema)