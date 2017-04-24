var CustomerPricingRules = require('../../models/customerPricingRules')
var BuyForRule = require('../../models/customerPricingRules/buyForRule')
var UpdatePriceRule = require('../../models/customerPricingRules/updatePriceRule')
var demoData = require('../demoData/data')

var assert = require('chai').assert

describe('Customer pricing rules test', function () {
  it('should build a pricing for an undefined customer', function () {
    // Arrange
    var customerPricingRules = new CustomerPricingRules()

    // Act
    var pricingRules = customerPricingRules.get(undefined)

    // Assert
    var rules = pricingRules.getRules()
    assert.deepEqual(rules.length, 0)
  })

  it('should build a pricing rule considering specific rules when customer is found', function () {
    // Arrange
    var customerPricingRules = new CustomerPricingRules()
    var fordData = demoData.customerPricingData['ford']

    // Act
    var pricingRules = customerPricingRules.get(fordData)

    // Assert
    var rules = pricingRules.getRules()
    assert.deepEqual(rules.length, 3)

    assert.instanceOf(rules[0], BuyForRule)
    assert.deepEqual(rules[0].getItemName(), 'classic')

    assert.instanceOf(rules[1], UpdatePriceRule)
    assert.deepEqual(rules[1].getItemName(), 'standout')

    assert.instanceOf(rules[2], UpdatePriceRule)
    assert.deepEqual(rules[2].getItemName(), 'premium')
  })
})
