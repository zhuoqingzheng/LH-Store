const express = require('express')
const appRouter = express.Router()
const appController = require('../controllers/appController')
appRouter.get('/',appController.renderInit)
module.exports = appRouter