'use strict'

function Checkout (pricingRules) {
  this.rules = pricingRules
  this.items = []
}

Checkout.prototype.add = function (itemName) {
  var item = this.rules.getItem(itemName)

  if (item === undefined) {
    throw new Error(`The supplied item name '${itemName}' was not found`)
  }

  this.items.push(item)
}

Checkout.prototype.total = function () {
  var total = 0

  var processedItems = this.rules.processItems(this.items)

  for (var i = 0; i < processedItems.length; i++) {
    total += processedItems[i].value
  }

  return total
}

module.exports = Checkout
