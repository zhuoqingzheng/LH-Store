const express = require ('express')
const app = express()
const appRouter = require('./routes/appRouter')
const exphbs = require('express-handlebars')
const flash = require('express-flash')
const session = require('express-session')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/userRouter')
app.use(express.static('public'))
require('./models')
//app.use('/',appRouter)
app.use(flash())
app.use(
    session({
        // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        name: 'demo', // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: app.get('env') === 'production'
        },
    })
        
)
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
}
// Initialise Passport.js
const passport = require('./passport')
app.use(passport.authenticate('session'))
    
// Load authentication router
//app.use(express.urlencoded({ extended: true }))
app.use(authRouter)
app.use('/user',userRouter)    
app.engine('hbs',exphbs.engine({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.set('view engine','hbs')
app.listen(process.env.PORT || 3000, () => {
    console.log('LH Store is running!')
})
