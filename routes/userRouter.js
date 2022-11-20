const express = require('express')

// create our Router object
const userRouter = express.Router()

// import people controller functions
const userController = require('../controllers/userController')

// add a route to handle the GET request for all people data
userRouter.get('/', userController.getAllPeopleData)

// add a route to handle the GET request for one data instance
userRouter.get('/:user_id', userController.getDataById)

// add a new JSON object to the database
// userRouter.post('/', userController.insertData)

userRouter.post('/createAccount', userController.createAccountController)
// export the router
module.exports = userRouter