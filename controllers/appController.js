
const {Item,
    getAllItems,
    getItem} = require('../models/item')


const renderDashboard = async (req,res) => {
    const allItems = await getAllItems()
    res.render('dashboard.hbs',{
        pagename: 'LH-Store',
        items: allItems,
    })
}
const renderItem = async (req,res) => {
    const item = await getItem(req)
    const title = item.name
    const user = req.body.user
    res.render('item.hbs',{
        pagename:title,
        item: item,
        user: user,
    })
}

const renderLogin = (req,res) => {
    res.render('login.hbs',{
        layout: '',
        flash: req.flash('error'),
        pagename:'login',
    })
}
const renderRegistration = (req,res) => {
    res.render('registration.hbs',{
        layout: '',
      
        pagename:'registration',
    })
}
const renderCart = (req, res) => {
    res.render('cart.hbs')
}


module.exports = {
    renderDashboard,
    renderLogin,
    renderCart,
    renderRegistration,
    renderItem
}