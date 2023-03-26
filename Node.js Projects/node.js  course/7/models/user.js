const mongoose  = require('mongoose');
const {CredentialsSchema} = require('./credentials');

const ObjectId = mongoose.Schema.Types.ObjectId;

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    credentials: {
        type: CredentialsSchema
    },
    credentialsId: {
        type: ObjectId,
        ref: 'CredentialsCol'
    },
    tasks: [
        {
            type: ObjectId,
            ref: 'Task'
        }
    ]
})

module.exports = User