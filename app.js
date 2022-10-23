const express = require ('express')
const app = express()
const appRouter = require('./Routes/appRouter')
app.use('/',appRouter)
app.listen(process.env.PORT || 3000, () => {
    console.log('LH Store is running!')
})
