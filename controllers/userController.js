const {
    createAccount,
    addToCart,
    deletePost} = require('../models/user')


const addToCartController = async(req,res) => {
    try{
        await addToCart(req,res)
    }catch (err) {
        return res.redirect('/')
    }
}

const deletePostController = async(req,res) => {
    try{
        await deletePost(req,res)
        return res.redirect('/cart')
    }catch (err) {
        return console.log(err)
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



module.exports = {
    createAccountController,
    addToCartController,
    deletePostController
}
