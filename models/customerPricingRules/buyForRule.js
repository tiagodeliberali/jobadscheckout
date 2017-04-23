'use strict'

function BuyForRule (itemName, config) {
  this.itemName = itemName
  this.config = config

  validateConfig(this.config)
}

BuyForRule.prototype.process = function (items) {
  var itemNamePosition = 0

  for (var i = 0; i < items.length; i++) {
    if (items[i].name === this.itemName) {
      if (itemNamePosition % this.config.buy >= this.config.for) {
        items[i].value = 0
      }

      itemNamePosition++
    }
  }
}

BuyForRule.prototype.getItemName = function () {
  return this.itemName
}

function validateConfig (config) {
  if (config.buy === undefined || config.for === undefined) {
    throw new Error('Invalid config object')
  }
}

module.exports = BuyForRule
