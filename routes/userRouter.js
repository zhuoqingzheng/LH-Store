const express = require('express')
const passport = require('passport')
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
}
// create our Router object
const userRouter = express.Router()
userRouter.post('/login',
    passport.authenticate('local', {
        successRedirect: '/cart', failureRedirect: '/login', failureFlash: true
    })
)



// import people controller functions
const userController = require('../controllers/userController')



userRouter.get('/removeFromCart/:item_id',isAuthenticated,userController.deletePostController)

userRouter.get('/addToCart/:item_id', isAuthenticated, userController.addToCartController)

userRouter.post('/createAccount', userController.createAccountController)
// export the router
module.exports = userRouter