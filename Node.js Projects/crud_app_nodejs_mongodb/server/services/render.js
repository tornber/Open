const axios = require('axios')
const baseUrl = 'http://localhost:8080'

exports.homeRoutes = (req,res) => {
    axios.get(`${baseUrl}/api/users/`)
    .then(response => {
        res.render('index',{users:response.data})
    })
    .catch(err => {
        res.send(err)
    })
}

exports.add_user = (req,res) => {
    res.render('add_user')
}

exports.update_user = (req,res) => {
    axios.get(`${baseUrl}/api/users`,{params: {id: req.query.id}})
    .then(response => {
        res.render('update_user',{user:response.data})
    })
    .catch(err => {
        res.send(err)
    })
}

exports.delete_user = (req,res) => {
    const id = req.params.id
    axios.delete(`${baseUrl}/api/users/${id}`)
        .then(response => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
}