const mongoose = require('mongoose')
require('dotenv').config({path: 'config.env'})

const connectDB = async () => {
    try {
        const con = await mongoose.connect("mongodb+srv://admin:123@cluster0.vhsoa1y.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB connected: ${con.connection.host}`)
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB