var PricingRules = require('../../models/customerPricingRules/pricingRules')
var BuyForRule = require('../../models/customerPricingRules/buyForRule')
var demoData = require('../demoData/data')

var assert = require('chai').assert

describe('Pricing rules test', function () {
  it('should not change the item list if no rule is registered', function () {
    // Arrange
    var pricingRules = new PricingRules()

    var items = [
      demoData.priceList['standout'],
      demoData.priceList['premium']
    ]

    // Act
    var processedItems = pricingRules.processItems(items)

    // Assert
    assert.deepEqual(processedItems[0].name, 'standout')
    assert.deepEqual(processedItems[0].value, 322.99)
    assert.deepEqual(processedItems[1].name, 'premium')
    assert.deepEqual(processedItems[1].value, 394.99)
  })

  it('should consider rules set on item list processing', function () {
    // Arrange
    var pricingRules = new PricingRules()

    var items = [
      demoData.priceList['classic'],
      demoData.priceList['classic'],
      demoData.priceList['classic']
    ]

    pricingRules.addRule(new BuyForRule('classic', { buy: 3, for: 2 }))

    // Act
    var processedItems = pricingRules.processItems(items)

    // Assert
    assert.deepEqual(processedItems[0].name, 'classic')
    assert.deepEqual(processedItems[0].value, 269.99)
    assert.deepEqual(processedItems[1].name, 'classic')
    assert.deepEqual(processedItems[1].value, 269.99)
    assert.deepEqual(processedItems[2].name, 'classic')
    assert.deepEqual(processedItems[2].value, 0)
  })
})
