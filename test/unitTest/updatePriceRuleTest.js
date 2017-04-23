var UpdatePriceRule = require('../../models/customerPricingRules/updatePriceRule')

var assert = require('chai').assert

describe('Rule test: Drop price when x items rule', function () {
  it('should drop the price when enough items on the list', function () {
    // Arrange
    var rule = new UpdatePriceRule('classic', { quantity: 3, newValue: 50 })

    var items = [
      { name: 'classic', value: 100 },
      { name: 'classic', value: 100 },
      { name: 'classic', value: 100 }
    ]

    // Act
    rule.process(items)

    // Assert
    assert.deepEqual(items[0].name, 'classic')
    assert.deepEqual(items[0].value, 50)
    assert.deepEqual(items[1].name, 'classic')
    assert.deepEqual(items[1].value, 50)
    assert.deepEqual(items[2].name, 'classic')
    assert.deepEqual(items[2].value, 50)
  })

  it('should not change the price if not enough items on list', function () {
    // Arrange
    var rule = new UpdatePriceRule('classic', { quantity: 3, newValue: 50 })

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

  it('should increase the price for any list size when quantity is 1', function () {
    // Arrange
    var rule = new UpdatePriceRule('classic', { quantity: 1, newValue: 200 })

    var items = [
      { name: 'classic', value: 100 }
    ]

    // Act
    rule.process(items)

    // Assert
    assert.deepEqual(items[0].name, 'classic')
    assert.deepEqual(items[0].value, 200)
  })

  it('should not change zero values', function () {
    // Arrange
    var rule = new UpdatePriceRule('classic', { quantity: 1, newValue: 200 })

    var items = [
      { name: 'classic', value: 100 },
      { name: 'classic', value: 0 },
      { name: 'classic', value: 100 }
    ]

    // Act
    rule.process(items)

    // Assert
    assert.deepEqual(items[0].name, 'classic')
    assert.deepEqual(items[0].value, 200)
    assert.deepEqual(items[1].name, 'classic')
    assert.deepEqual(items[1].value, 0)
    assert.deepEqual(items[2].name, 'classic')
    assert.deepEqual(items[2].value, 200)
  })

  it('should not change the value of other itemNames', function () {
    // Arrange
    var rule = new UpdatePriceRule('classic', { quantity: 1, newValue: 50 })

    var items = [
      { name: 'classic', value: 100 },
      { name: 'standout', value: 200 },
      { name: 'classic', value: 100 },
      { name: 'standout', value: 200 },
      { name: 'standout', value: 200 }
    ]

    // Act
    rule.process(items)

    // Assert
    assert.deepEqual(items[0].name, 'classic')
    assert.deepEqual(items[0].value, 50)
    assert.deepEqual(items[1].name, 'standout')
    assert.deepEqual(items[1].value, 200)
    assert.deepEqual(items[2].name, 'classic')
    assert.deepEqual(items[2].value, 50)
    assert.deepEqual(items[3].name, 'standout')
    assert.deepEqual(items[3].value, 200)
    assert.deepEqual(items[4].name, 'standout')
    assert.deepEqual(items[4].value, 200)
  })

  it('should not fail on an empty list', function () {
    // Arrange
    var rule = new UpdatePriceRule('classic', { quantity: 1, newValue: 50 })

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
      UpdatePriceRule('classic', invalidConfig)
    }, Error)
  })
})
