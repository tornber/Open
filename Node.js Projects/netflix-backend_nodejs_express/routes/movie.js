const express = require('express')
const Genre = require('../models/Genre')
const Movie = require('../models/Movie')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router()

router.post('/', async (req,res) => {
    let movie = await Movie.findOne({Title: req.body.title,Type: req.body.type})
    if (movie) return res.status(400).send('movie already exists')

    movie = await new Movie(req.body)
    const genreIds = movie.Genre 

    for (let id of genreIds) {
        const genre = await Genre.findById(id).select('movies')
        if(!genre) return res.status(404).send('invalid genre id sent')
        genre.movies.push(id)

        await genre.save()
   }

   await movie.save()
   res.status(200).send(movie)

})

router.get('/',[auth,admin], async (req,res) => {
    const movies = await Movie.find().sort({_id: -1})
    if (!movies) return res.status(404).send('no movies found')
    res.status(200).send(movies)
})

router.get('/random',[auth,admin], async (req,res) => {
    const movie_type = req.query.type
    let movie 

    if (movie_type && movie_type == 'series') {
        movie = await Movie.aggregate([
            {$match : {Type: movie_type}},
            {$sample : {size: 1}}
        ])
        if (!movie) return res.status(404).send(`no movie found within tha ${movie_type} category`)
        res.status(200).send(movie)

    } else {
        movie = await Movie.aggregate([
            {$match : {Type: "movie"}},
            {$sample : {size: 1}}
        ])
        if (!movie) return res.status(404).send('no movies found')
        res.status(200).send(movie)
    }
})

router.put('/:id',async (req,res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id,{$set : req.body},{new: true})
    if(!movie) return res.status(404).send('no such movie with that id')

    res.status(200).send(movie)
})

router.delete('/:id',[auth,admin],async (req,res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if(!movie) return res.status(404).send('no such movie with that id')

    res.status(200).send('movie deleted successfully')
})

router.get('/:id',[auth,admin],async (req,res) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie) return res.status(404).send('no such movie with that id')

    res.status(200).send(movie)
})

module.exports = router