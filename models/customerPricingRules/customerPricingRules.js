'use strict'

var PricingRules = require('./pricingRules')
var BuyForRule = require('./buyForRule')
var UpdatePriceRule = require('./updatePriceRule')

/**
 * Creates a pricing rules instance based on the customer pricing data.
 *
 */
function CustomerPricingRules () {

}

/**
 * Creates a pricing rules instance adding the supplied array of rules.
 *
 * @param {Array} customerPricingData An array of rules and its configurations
 * @returns The pricing rules instance.
 */
CustomerPricingRules.prototype.get = function (customerPricingData) {
  var pricingRules = new PricingRules()

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
