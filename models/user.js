const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            unique: true, 
            ref: 'cart',
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
module.exports = {User,
                  createAccount,}








