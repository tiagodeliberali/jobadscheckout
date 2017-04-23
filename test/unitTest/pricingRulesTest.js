var PricingRules = require('../../models/customerPricingRules/pricingRules')
var BuyForRule = require('../../models/customerPricingRules/buyForRule')
var demoData = require('../demoData/data')

var assert = require('chai').assert

describe('Pricing rules test', function () {
  it('should get item default value', function () {
    // Arrange
    var pricingRules = new PricingRules(demoData.priceList)

    // Act
    var item = pricingRules.getItem('classic')

    // Assert
    assert.deepEqual(item.name, 'classic')
    assert.deepEqual(item.value, 269.99)
  })

  it('should return undefined when item name not recognized', function () {
    // Arrange
    var pricingRules = new PricingRules(demoData.priceList)

    var item = pricingRules.getItem('not_recognized_item')

    assert.deepEqual(item, undefined)
  })

  it('should not change the item list if no rule is registered', function () {
    // Arrange
    var pricingRules = new PricingRules(demoData.priceList)

    var items = [
      pricingRules.getItem('standout'),
      pricingRules.getItem('premium')
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
    var pricingRules = new PricingRules(demoData.priceList)

    var items = [
      pricingRules.getItem('classic'),
      pricingRules.getItem('classic'),
      pricingRules.getItem('classic')
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
