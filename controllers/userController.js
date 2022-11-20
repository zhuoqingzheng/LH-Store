const {createAccount} = require('../models/user')
const Users = require('../models/users')
const getAllPeopleData = async (req, res, next) => {
    try {
         const users = await Users.find().lean()
         return res.render('allData', { data: users })
    } catch (err) {
     return next(err)
    }
}
const getDataById = async(req, res, next) => {
    try {
        const user = await Users.findById(req.params.user_id).lean()
         if (!user) {
             // no author found in database
            return res.sendStatus(404)
        }
        // found person
        return res.render('oneData', { oneItem: user })
    } catch (err) {
        return next(err)
    }
}
const insertData = async (req, res, next) => {
    try {
        newUser = new Users( req.body )
        await newUser.save()
        return res.redirect('/user')
    } catch (err) {
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


module.exports = {
    getAllPeopleData,
    getDataById,
    insertData,
    createAccountController
}
