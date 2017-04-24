'use strict'

var demoData = require('../../test/demoData/data')

/**
 * Fake implementation of a db context using promisses to simulate a real component.
 * This version will return data from the test demo data.
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
    resolve(demoData.priceList[itemName])
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
    resolve(demoData.customerPricingData[customerName])
  })
}

module.exports = DbContext
