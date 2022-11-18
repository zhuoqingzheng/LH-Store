const mongoose = require('mongoose')
const schema = new mongoose.Schema({
 username: {type: String, required: true},
})
const Users = mongoose.model('Users', schema)
module.exports = Users
