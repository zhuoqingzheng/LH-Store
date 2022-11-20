
const {Item,
    getAllItems} = require('../models/item')


const renderDashboard = async (req,res) => {
    const allItems = await getAllItems()
    res.render('dashboard.hbs',{
        pagename: 'LH-Store',
        items: allItems,
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
}