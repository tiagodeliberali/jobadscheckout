'use strict'

var CustomerRule = require('./customerRuleModel')
var ItemPrice = require('./itemPriceModel')

/**
 * Gets data from mongodb. In future, it must implement some cache to reduce database calls.
 *
 */
function DbContext () {

}

/**
 * Returns an object with itemName and its associated item with name and value.
 *
 * @param {string} itemName The itemName of the item.
 * @returns An item with name and value.
 */
DbContext.prototype.getPriceList = function (itemName) {
  return new Promise(function (resolve, reject) {
    ItemPrice.find({ name: itemName }, function (err, price) {
      if (err) throw err

      if (price.length > 0) resolve(price[0])
      else resolve(undefined)
    })
  })
}

/**
 * Returns an array containing the rules associated to a customerName
 *
 * @param {string} customerName The customerName of the customer.
 * @returns An array of rules.
 */
DbContext.prototype.getCustomerPricingData = function (customerName) {
  return new Promise(function (resolve, reject) {
    CustomerRule.find({ customer: customerName }, function (err, rules) {
      if (err) throw err

      resolve(rules)
    })
  })
}

module.exports = DbContext
