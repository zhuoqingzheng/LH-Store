const User = require('../models/users')
const getAllPeopleData = async (req, res, next) => {
    try {
         const users = await User.find().lean()
         return res.render('allData', { data: users })
    } catch (err) {
     return next(err)
    }
}
const getDataById = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.user_id).lean()
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
        newAuthor = new Author( req.body )
        await newAuthor.save()
        return res.redirect('/people')
    } catch (err) {
        return next(err)
    }
}
module.exports = {
    getAllPeopleData,
    getDataById,
    insertData
}
