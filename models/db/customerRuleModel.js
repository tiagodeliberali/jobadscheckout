var mongoose = require('mongoose')

var Schema = mongoose.Schema

var customerRuleSchema = new Schema({
  customer: String,
  name: String,
  itemName: String,
  config: Schema.Types.Mixed
})

var CustomerRule = mongoose.model('CustomerRule', customerRuleSchema)

module.exports = CustomerRule
