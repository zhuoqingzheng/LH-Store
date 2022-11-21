const {
    createAccount,
    addToCart} = require('../models/user')


const addToCartController = async(req,res) => {
    try{
        await addToCart(req,res)
    }catch (err) {
        return next(err)
    }
}

const createAccountController = async (req, res) => {
    let user = await createAccount(req, res)
    if (user) {
        return res.redirect('/')
    } else {
        return res.redirect('/registration')
    }
}
const getCartItems = async (user) => {
    items = await user.populate({
        path: 'cart',
        options: { lean: true },
    })

    friends = friends.toObject()

    allFriends = friends.friends

    return allFriends
}


module.exports = {
    createAccountController,
    addToCartController
}
