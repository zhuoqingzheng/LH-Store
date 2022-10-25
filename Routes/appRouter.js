const express = require('express')
const appRouter = express.Router()
const appController = require('../controllers/appController')
appRouter.get('/',appController.renderDashboard)
module.exports = appRouter