const express = require('express')
const passport = require('passport')
const appRouter = express.Router()
const appController = require('../controllers/appController')
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
}
appRouter.post('/login',
    passport.authenticate('local', {
        successRedirect: '/cart', failureRedirect: '/login', failureFlash: true
    })
)


appRouter.get('/',appController.renderDashboard)
appRouter.get('/login',appController.renderLogin)
appRouter.get('/cart', isAuthenticated,appController.renderCart)
appRouter.get('/registration',appController.renderRegistration)

module.exports = appRouter