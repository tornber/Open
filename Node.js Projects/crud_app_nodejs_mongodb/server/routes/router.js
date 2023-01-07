const express = require('express')
const controller = require('../controller/controller')
const route = express.Router()

const services = require('../services/render')

/**
 * @description Root Route
 * @method GET
 */

route.get('/',services.homeRoutes)

/**
 * @description add users
 * @method GET /add-user
 */

route.get('/add-user',services.add_user)

/**
 * @description for update user
 * @method GET /update-user
 */

route.get('/update-user',services.update_user)

route.get('/delete-user/:id',services.delete_user)

route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.put('/api/users/:id',controller.update)
route.delete('/api/users/:id',controller.delete)


module.exports = route