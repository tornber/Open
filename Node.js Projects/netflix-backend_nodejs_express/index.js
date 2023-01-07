const express = require('express')
require('express-async-errors')
const config = require('config')
const mongoose =  require('mongoose')
const users = require('./routes/user')
const auth= require('./routes/auth')
const movie= require('./routes/movie')
const genre= require('./routes/genre')
const winston = require('winston')

const app = express()

process.on('unhandledRejection', (ex) => {
    throw ex
})

winston.add(
    new winston.transports.File({
        filename: 'logfile.log',
        level: 'error'
    })
)


mongoose
.connect(config.get('db'),{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("connected to database successfully"))
    .catch(err => console.log("some error occured while connecting",err))
    
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/api/users',users)
app.use('/api/auth',auth)
app.use('/api/genres',genre)
app.use('/api/movies',movie)

app.listen(8888)