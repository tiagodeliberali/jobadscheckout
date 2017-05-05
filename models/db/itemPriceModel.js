var mongoose = require('mongoose')

var Schema = mongoose.Schema

var itemPriceSchema = new Schema({
  name: String,
  value: Number
})

var ItemPrice = mongoose.model('ItemPrice', itemPriceSchema)

module.exports = ItemPrice
