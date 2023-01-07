var User = require('../model/User')

exports.create = async (req,res) => {

    if(!req.body) {
        res.status(400).send({message: "Content can not be empty!"})
        return
    }
    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })

    user.save()
    .then((data) => {
        res.redirect('/add-user')
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while creating a create operation'
        })
    })

}

exports.find = (req,res) => {

    if(req.query.id) {
        const id = req.query.id
        User.findById(id)
        .then(user => {
            if(!user) {
                return res.status(404).send({message: 'cannot find user by id' + id})
            }
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || 'Some error occured while finding user'})
        })
        return 
    }

    User.find().sort({name:-1})
    .then(users => {
        res.send(users)
    })
    .catch(err => {
        res.status(500).send({message: err.message || 'Some error occured while finding users'})
    })
}

exports.update = (req,res) => {
    console.log('update')
    if(!req.body) {
        return res.status(400).send({message: 'Content can not be empty!'})  
    }
    const id = req.params.id
    User.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
    .then(user => {
        if(!user) {
            return res.status(404).send({message: `Can not update user with id ${id}`})
        }
        // alert('Update done successfully')
        res.redirect(`/update-user?id=${id}`)
    })
    .catch(err => {
        res.status(500).send({message: err.message || 'Some error occured while updating user'})
    })
}

exports.delete = (req,res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
    .then(user => {
        if(!user) {
            return res.status(404).send({message: `cannot delete user with id ${id}`})
        }
        res.send('user delete successfully')
    })
    .catch(err => {
        res.status(500).send({message: 'could not delete user with id' + id})
    })
}