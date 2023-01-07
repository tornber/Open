const mongoose  = require('mongoose');

const {Schema} = mongoose;

const CredentialsSchema =  Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Credentials = mongoose.model('CredentialsCol', CredentialsSchema)

module.exports = {Credentials, CredentialsSchema}