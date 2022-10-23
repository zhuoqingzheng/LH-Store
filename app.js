const express = require ('express')
const app = express()
const appRouter = require('./Routes/appRouter')
const exphbs = require('express-handlebars')
app.use(express.static('public'))
app.use('/',appRouter)
app.engine('hbs',exphbs.engine({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.set('view engine','hbs')
app.listen(process.env.PORT || 3000, () => {
    console.log('LH Store is running!')
})
