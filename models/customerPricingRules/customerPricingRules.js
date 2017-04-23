'use strict'

var PricingRules = require('./pricingRules')
var BuyForRule = require('./buyForRule')
var UpdatePriceRule = require('./updatePriceRule')

function CustomerPricingRules (priceList) {
  this.priceList = priceList
}

CustomerPricingRules.prototype.get = function (customerPricingData) {
  var pricingRules = new PricingRules(this.priceList)

  if (customerPricingData !== undefined) {
    for (var i = 0; i < customerPricingData.length; i++) {
      pricingRules.addRule(buildRule(customerPricingData[i]))
    }
  }

  return pricingRules
}

function buildRule (data) {
  switch (data.name) {
    case 'BuyForRule':
      return new BuyForRule(data.itemName, data.config)

    case 'UpdatePriceRule':
      return new UpdatePriceRule(data.itemName, data.config)
  }
}

module.exports = CustomerPricingRules
