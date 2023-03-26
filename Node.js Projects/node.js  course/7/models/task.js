const mongoose  = require('mongoose');

const Task = mongoose.model('Task', {
    title: {
        type: String,
        required: true
    }
})

module.exports = Task