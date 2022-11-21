
const {Item,
    getAllItems,
    getItem} = require('../models/item')
const {
    findUser, 
    getCartItems} = require('../models/user')

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
    

    res.render('item.hbs',{
        pagename:title,
        item: item,
        
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
const renderCart = async (req, res) => {
    let items = await getCartItems(req.user._id)

    res.render('cart.hbs',{
        items: items
    })
}


module.exports = {
    renderDashboard,
    renderLogin,
    renderCart,
    renderRegistration,
    renderItem
}