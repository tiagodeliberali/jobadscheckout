'use strict'

var demoData = require('../../test/demoData/data')

function DbContext () {

}

DbContext.prototype.getPriceList = function () {
  return new Promise(function (resolve, reject) {
    resolve(demoData.priceList)
  })
}

DbContext.prototype.getCustomerPricingData = function (customerName) {
  return new Promise(function (resolve, reject) {
    resolve(demoData.customerPricingData[customerName])
  })
}

module.exports = DbContext
