const express = require('express')
const fs = require('fs')
const cors = require('cors')
const mongoose = require('mongoose')
const {GridFSBucket} = require('mongodb')
const app = express();
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const Post = require('./models/Post')
const limit = require('express-rate-limit')
const {sanitize} = require('./utils')
require('dotenv').config()
let gfs

const limiter = limit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: 'Too many requests from this IP, please try again later'
})

const addPostLimiter = limit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "შემდეგი პოსტი შეგიძლიათ განათავსოთ 15წუთის გასვლის შემდეგ წინა პოსტის ატვირთვის დროიდან, next post can be uploaded after 15 minutes from prevous post upload time"
})

app.use(cors())
// app.use(limiter)
app.use(sanitize)


mongoose.connect(process.env.MONGO_URL)
    // .then(() => {
    //     console.log('connected successfully')
    // }).catch(err => {
    //     console.log(err)
    // })
const connection = mongoose.connection
connection.once('open',() => {
    console.log('connected successfully')
    try {
        gfs = new GridFSBucket(connection.db)
    } catch(err) {
        console.log(err)
    }
})


app.get('/getPosts/:from',async (req,res) => {
    const from = parseInt(req.params['from'])
    const to = 5
    const posts = await Post.find().skip(from).limit(5).sort({_id: -1})
    if (posts.length < 5) {
        return res.status(500).json({status: "error",message: "no more posts"})
    }  else {
        res.json({posts})
    }
})

app.get('/getPosts/:postId',async (req,res) => {
    const id = req.params.postId
    const post = await Post.findById(id)
    if (!post) {
        return res.status(400).json({status: "error",message: "no such post with provided id"})
    }
    res.json({post})
})

app.post('/addPost',upload.array('files'),sanitize,async (req,res) => {
    let username,userImage
    let facts = []
    const {files} = req
    if(req.body?.username && req.body?.userImage) {
           username = req.body.username 
           userImage = req.body.userImage
    }
    files.forEach(async (file,i) => {
        const writeStream = gfs.openUploadStream(file.originalname + Date.now())
        const readStream = fs.createReadStream(file.path)
        readStream.pipe(writeStream)
        const path = file.path
        writeStream.on('finish',async (file) => {
            facts.push(file)
            fs.unlink(path,(err) => {
                if(err) {
                    console.log(err)
                }
            })
            if(files.length === facts.length) {
                if (req.body?.exposed && req.body?.title && req.body?.description) {
                    const {exposed,title,description} = req.body
                    try {
                        const post = await Post.create({
                            username ,
                            userImage,
                            exposed,
                            title,
                            description,
                            files: facts
                        })
                        console.log(post)
                    } catch(error) {
                        return res.status(500).json({status: "error",message: "something went wrong",error})
                    }
                    res.json({status: "ok",message: "post addded successfully"})
                } else {
                    res.status(400).json({status: "error",message: "გთხოვთ შეავსოთ ყველა ველი"})
                }
            }
        })
    })
})


app.get('/search/:query',async (req,res) => {
    const query = req.params.query
    const result = await Post.find({
        $or: [
        {username: {$regex: query}},
        {exposed: {$regex: query}},
        {title: {$regex: query}},
        {description: {$regex: query}}
        ]}).limit(10).sort({_id: -1})
    res.json({status: "ok",data: result})
}) 


app.get('/search',async (req,res) => {
    const query = req.query.query
    const from = parseInt(req.query.from)
    const result = await Post.find({
        $or: [
        {username: {$regex: query}},
        {exposed: {$regex: query}},
        {title: {$regex: query}},
        {description: {$regex: query}}
        ]
    }).skip(from).limit(20).sort({_id: -1})
    res.json({status: "ok",data: result})
})

app.put('/addReact',async (req,res) => {
    const type = req.query.type
    const username = req.query.usernmae
    const id = req.query.id
    let shouldUpdate = true
    let post
    if(type == "trust") {
        const prevPost = await Post.findById(id)
        prevPost.reactors.map(async(reactor) => {
            if (reactor.username === username && reactor.trust > 0) {
                post = await Post.findByIdAndUpdate(id,{trust: trust-1})
                shouldUpdate = false
                return
            }
        })
        if (shouldUpdate) {
            post = await Post.findByIdAndUpdate(id,{trust: prevPost.trust+1})
        }
    } else {
        const prevPost = await Post.findById(id)
        prevPost.reactors.map(async(reactor) => {
            if (reactor.username === username && reactor.distrust > 0) {
                post = await Post.findByIdAndUpdate(id,{distrust:  prevPost.distrust-1})
                shouldUpdate = false
                return
            }
        })
        if (shouldUpdate) {
            post = await Post.findByIdAndUpdate(id,{distrust:  prevPost.distrust + 1})
        }
    }
    if (!post) {
        return res.status(400).json({status: "error",message: "no such post with provided id"})
    }
    res.json({status: "ok",data: post})
})



app.listen(5000)
