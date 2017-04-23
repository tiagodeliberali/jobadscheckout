var BuyForRule = require('../../models/customerPricingRules/buyForRule')

var assert = require('chai').assert

describe('Rule test: Buy x For y rule', function () {
  it('should zero the value of one item', function () {
    // Arrange
    var rule = new BuyForRule('classic', { buy: 3, for: 2 })

    var items = [
      { name: 'classic', value: 100 },
      { name: 'classic', value: 100 },
      { name: 'classic', value: 100 }
    ]

    // Act
    rule.process(items)

    // Assert
    assert.deepEqual(items[0].name, 'classic')
    assert.deepEqual(items[0].value, 100)
    assert.deepEqual(items[1].name, 'classic')
    assert.deepEqual(items[1].value, 100)
    assert.deepEqual(items[2].name, 'classic')
    assert.deepEqual(items[2].value, 0)
  })

  it('should ignore other itemNames on list', function () {
    // Arrange
    var rule = new BuyForRule('classic', { buy: 2, for: 1 })

    var items = [
      { name: 'classic', value: 100 },
      { name: 'premium', value: 200 },
      { name: 'premium', value: 200 },
      { name: 'classic', value: 100 },
      { name: 'classic', value: 100 },
      { name: 'classic', value: 100 }
    ]

    // Act
    rule.process(items)

    // Assert
    assert.deepEqual(items[0].name, 'classic')
    assert.deepEqual(items[0].value, 100)
    assert.deepEqual(items[1].name, 'premium')
    assert.deepEqual(items[1].value, 200)
    assert.deepEqual(items[2].name, 'premium')
    assert.deepEqual(items[2].value, 200)
    assert.deepEqual(items[3].name, 'classic')
    assert.deepEqual(items[3].value, 0)
    assert.deepEqual(items[4].name, 'classic')
    assert.deepEqual(items[4].value, 100)
    assert.deepEqual(items[5].name, 'classic')
    assert.deepEqual(items[5].value, 0)
  })

  it('should not zero any item when not enough items are in the list', function () {
    // Arrange
    var rule = new BuyForRule('classic', { buy: 4, for: 3 })

    var items = [
      { name: 'classic', value: 100 },
      { name: 'classic', value: 100 }
    ]

    // Act
    rule.process(items)

    // Assert
    assert.deepEqual(items[0].name, 'classic')
    assert.deepEqual(items[0].value, 100)
    assert.deepEqual(items[1].name, 'classic')
    assert.deepEqual(items[1].value, 100)
  })

  it('should not fail on an empty list', function () {
    // Arrange
    var rule = new BuyForRule('classic', { buy: 4, for: 2 })

    var items = []

    // Act
    rule.process(items)

    // Assert
    assert.deepEqual(items.length, 0)
  })

  it('throw error for invalid config parameter', function () {
    // Arrange
    var invalidConfig = {}

    // Act/Assert
    assert.throws(function () {
      BuyForRule('classic', invalidConfig)
    }, Error)
  })
})
