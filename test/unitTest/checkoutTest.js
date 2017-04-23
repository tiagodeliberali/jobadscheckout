var Checkout = require('../../models/checkout')
var PricingRules = require('../../models/customerPricingRules/pricingRules')
var BuyForRule = require('../../models/customerPricingRules/buyForRule')
var demoData = require('../demoData/data')

var assert = require('chai').assert

describe('Checkout tests', function () {
  it('should return zero if no items added', function () {
    // Arrange
    var pricingRules = new PricingRules(demoData.priceList)
    var co = new Checkout(pricingRules)

    // Act/Assert
    assert.deepEqual(0, co.total())
  })

  it('should get classic default value', function () {
    // Arrange
    var pricingRules = new PricingRules(demoData.priceList)
    var co = new Checkout(pricingRules)

    // Act
    co.add('classic')

    // Assert
    assert.deepEqual(269.99, co.total())
  })

  it('should get sum classic default values when two classical items', function () {
    // Arrange
    var pricingRules = new PricingRules(demoData.priceList)
    var co = new Checkout(pricingRules)

    // Act
    co.add('classic')
    co.add('classic')

    // Assert
    assert.deepEqual(539.98, co.total())
  })

  it('should get sum of values when sorted items are supplied', function () {
    // Arrange
    var pricingRules = new PricingRules(demoData.priceList)
    var co = new Checkout(pricingRules)

    // Act
    co.add('classic')
    co.add('standout')
    co.add('premium')

    // Assert
    assert.deepEqual(987.97, co.total())
  })

  it('should apply pricing rules', function () {
    // Arrange
    var pricingRules = new PricingRules(demoData.priceList)
    pricingRules.addRule(new BuyForRule('classic', { buy: 2, for: 1 }))
    var co = new Checkout(pricingRules)

    // Act
    co.add('classic')
    co.add('classic')
    co.add('classic')

    // Assert
    assert.deepEqual(539.98, co.total())
  })

  it('throw error if added unrecognized item name', function () {
    // Arrange
    var pricingRules = new PricingRules(demoData.priceList)
    var co = new Checkout(pricingRules)

    // Act/Assert
    assert.throws(function () {
      co.add('not_recognized_item')
    }, Error)

    assert.deepEqual(0, co.total())
  })
})
