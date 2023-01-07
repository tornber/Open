const express = require('express')
const config = require('config')
const Genre = require('../models/Genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router()

router.post('/',[auth,admin], async (req,res) => {
    let genre = await Genre.findOne({name: req.body.name})
    if (genre) return res.status(400).send('Genre already exists')
    genre = new Genre(req.body)
    await genre.save()
    res.status(200).send(genre)
})

router.delete('/:id',[auth,admin],async (req,res) => {
    let genre = await Genre.findByIdAndDelete(req.params.id)
    if (!genre) return res.status(404).send('there is not genre with given id')

    res.status(200).send('genre deleted successfully')
})

router.get('/',auth, async (req,res) => {
    const genre_query = req.query.genre 
    const movie_type = req.body.type 
    let genres
    
    if (genre_query)  {
        genres = await Genre.aggregate([
            {$match: {name: genre_query,type: movie_type}},
            {$sample: {$size: 15}}
        ])
        if(!genres) return res.status(404).send('cannot find movies')
        res.status(200).send(genres)
    }
    else {
        genres = await Genre.find()
        if(!genres) return res.status(404).send('cannot find movies')
        res.status(200).send(genres)
    }
})

module.exports = router