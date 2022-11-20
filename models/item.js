const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type:String, required:true},
    rating:{type: mongoose.Schema.Types.Decimal128, 
            default: 3.0,
    }
})
const Item = mongoose.model('Item', itemSchema,"items")
module.exports = Item