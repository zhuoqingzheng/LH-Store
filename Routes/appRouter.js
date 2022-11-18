const express = require('express')
const appRouter = express.Router()
const appController = require('../controllers/appController')
//appRouter.get('/',appController.renderDashboard)
//appRouter.get('/login',appController.renderLogin)

module.exports = appRouter