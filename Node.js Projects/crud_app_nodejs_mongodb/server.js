const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const route = require('./server/routes/router')
const connectDB = require('./server/database/connection')
const methodOverride = require('method-override')

app = express()


dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(morgan('tiny'))
connectDB()
app.use(express.static(path.join(__dirname,'assets/css')))
app.use(express.static(path.join(__dirname,'assets/img')))
app.use(express.static(path.join(__dirname,'assets/js')))

app.set('view engine','ejs')

app.use('/',route)

app.listen(PORT,() => `app started on port ${PORT}`)
