'use strict'

/**
 * Creates an instance of Checkout
 *
 * @param {PricingRules} pricingRules The prcing rules to be applied.
 */
function Checkout (pricingRules) {
  this.rules = pricingRules
  this.items = []
}

/**
 *   Adds an item to checkout item list. The itemName must be available in the
 * pricing rules item list.
 *
 * @param {string} itemName The itemName of the item.
 */
Checkout.prototype.add = function (itemName) {
  var item = this.rules.getItem(itemName)

  if (item === undefined) {
    throw new Error(`The supplied item name '${itemName}' was not found`)
  }

  this.items.push(item)
}

/**
 * Calculates the checkout total based on the item list and the pricing rules.
 *
 * @return {number} The total checkout value.
 */
Checkout.prototype.total = function () {
  var total = 0

  var processedItems = this.rules.processItems(this.items)

  for (var i = 0; i < processedItems.length; i++) {
    total += processedItems[i].value
  }

  return total
}

module.exports = Checkout
