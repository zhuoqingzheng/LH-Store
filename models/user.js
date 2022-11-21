const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Item } = require('./item')
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            ref: 'Item',
        }
    ],
})
// Password comparison function
// Compares the provided password with the stored password
// Allows us to call user.verifyPassword on any returned objects
userSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}
// Password salt factor
const SALT_FACTOR = 10
// Hash password before saving
userSchema.pre('save', function save(next) {
    const user = this
    // Go to next if password field has not been modified
    if (!user.isModified('password')) {
        return next()
    }
    // Automatically generate salt, and calculate hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        // Replace password with hash
        user.password = hash
        next()
    })
})

const getCartItems = async (id) => {
    let theUser = await User.findById({ _id: id }).lean()
    const items = []
    try {
        for (let i = 0; i < theUser.cart.length; i++) {
            let item = await Item.findOne({ _id: theUser.cart[i] }).lean()
            items[i] = item
        }
        return items
    } catch (err) {
        console.log(err)
    }
}
const deletePost = async (req, res) => {
    const item_id = req.params.item_id
    const theUser = await User.findById({ _id: req.user._id })
    let added = false
    try {
        for (let i = 0; i < theUser.cart.length; i++) {
            if (theUser.cart[i] == item_id) {
                added = true
                
            }
        }
        if (added) {
            await User.updateOne(
                { _id: req.user._id },
                { $pull: { cart: item_id } }
            )
        }

    } catch (err) {
        console.log(err)
    }
}


const addToCart = async (req, res) => {
    const item_id = req.params.item_id
    const theUser = await User.findById({ _id: req.user._id })
    let added = false
    try {
        for (let i = 0; i < theUser.cart.length; i++) {
            if (theUser.cart[i] == item_id) {
                added = true
                
            }
        }
        if (!added) {
            await User.updateOne(
                { _id: req.user._id },
                { $push: { cart: item_id } }
            )
        }

    } catch (err) {
        console.log(err)
    }
}

const findUser = async (id) => {
    try {
        let theUser = await User.findById({ _id: id }).lean()
        return theUser
    } catch (err) {
        console.log(err)
    }
}


const createAccount = async (req, res) => {
    const newUser = req.body



    // email already exists
    if (await User.findOne({ username: newUser.username })) {
        req.flash('newAccountError', 'User already exists')
        req.flash('newAdminAccountError', 'Admin already exists')
        return
    }

    try {
        const newUserAccount = new User({
            username: newUser.username,
            password: newUser.password,
            cart: [],
        })

        // save the new account to the DB
        await newUserAccount.save()

        return newUser
    } catch (err) {
        await User.deleteOne({ username: newUser.username })
        req.flash('newAccountError', 'Invalid Data Type(s) Entered')
        req.flash('newAdminAccountError', 'Invalid Data Type(s) Entered')
        return
    }
}
const User = mongoose.model('User', userSchema)
module.exports = {
    User,
    addToCart,
    getCartItems,
    createAccount,
    findUser,
    deletePost,
}








