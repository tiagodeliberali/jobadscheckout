var CustomerPricingRules = require('../../models/customerPricingRules')
var Checkout = require('../../models/checkout')
var demoData = require('../demoData/data')

var assert = require('chai').assert

describe('Integration checkout scenario', function () {
  it('should get standard prices for common customer', function () {
    // Arrange
    var customerPricingRules = new CustomerPricingRules()
    var pricingRules = customerPricingRules.get(undefined)
    var co = new Checkout(pricingRules)

    // Act
    co.add(demoData.priceList['classic'])
    co.add(demoData.priceList['standout'])
    co.add(demoData.priceList['premium'])

    // Assert
    assert.deepEqual(co.total(), 987.97)
  })

  it('should consider special rules for unilever', function () {
    // Arrange
    var customerPricingRules = new CustomerPricingRules()
    var pricingRules = customerPricingRules.get(demoData.customerPricingData['unilever'])
    var co = new Checkout(pricingRules)

    // Act
    co.add(demoData.priceList['classic'])
    co.add(demoData.priceList['classic'])
    co.add(demoData.priceList['classic'])
    co.add(demoData.priceList['premium'])

    // Assert
    assert.deepEqual(co.total(), 934.97)
  })

  it('should consider special rules for apple', function () {
    // Arrange
    var customerPricingRules = new CustomerPricingRules()
    var pricingRules = customerPricingRules.get(demoData.customerPricingData['apple'])
    var co = new Checkout(pricingRules)

    // Act
    co.add(demoData.priceList['standout'])
    co.add(demoData.priceList['standout'])
    co.add(demoData.priceList['standout'])
    co.add(demoData.priceList['premium'])

    // Assert
    assert.deepEqual(co.total(), 1294.96)
  })

  it('should consider special rules for nike', function () {
    // Arrange
    var customerPricingRules = new CustomerPricingRules()
    var pricingRules = customerPricingRules.get(demoData.customerPricingData['nike'])
    var co = new Checkout(pricingRules)

    // Act
    co.add(demoData.priceList['premium'])
    co.add(demoData.priceList['premium'])
    co.add(demoData.priceList['premium'])
    co.add(demoData.priceList['premium'])

    // Assert
    assert.deepEqual(co.total(), 1519.96)
  })

  it('should consider special rules for ford', function () {
    // Arrange
    var customerPricingRules = new CustomerPricingRules()
    var pricingRules = customerPricingRules.get(demoData.customerPricingData['ford'])
    var co = new Checkout(pricingRules)

    // Act
    co.add(demoData.priceList['classic'])
    co.add(demoData.priceList['classic'])
    co.add(demoData.priceList['classic'])
    co.add(demoData.priceList['classic'])
    co.add(demoData.priceList['classic'])
    co.add(demoData.priceList['standout'])
    co.add(demoData.priceList['premium'])
    co.add(demoData.priceList['premium'])
    co.add(demoData.priceList['premium'])

    // Assert
    assert.deepEqual(co.total(), 2559.92)
  })
})
