const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {type: String,required: [true,"username should be unique"],trim: true},
    incomes: [{
        description: {type: String,required: true},
        amount: {type: Number,required: true},
        date: {type:Date,default: Date.now},
        default: {}
    }],
    outcomes: [{
        description: {type: String,required: true},
        amount: {type: Number,required: true},
        status: {type: String,enum: ['Processing','Completed'],default: 'Processing',required: true},
        date: {type:Date,default: Date.now},
        default: {}
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const model = mongoose.model('Category',CategorySchema)

module.exports = model