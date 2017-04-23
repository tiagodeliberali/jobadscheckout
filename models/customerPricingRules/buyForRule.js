'use strict'

/**
 * Creates an instance of BuyForRule.
 *
 *  This rule implements the ability to define buy X items for the price of Y by searching for all
 * instances of itemName on the list and setting zero to the value of the X % itemPosition >= Y.
 *
 *  By this way, if we have 7 items on a list and a config: { buy: 4, for: 2 }, we will set the
 * value of zero for items 2, 3 and 6
 *
 * @param {string} itemName the name of the item that the rule will be applied
 * @param {object} config an object containing buy and for properties
 */
function BuyForRule (itemName, config) {
  this.itemName = itemName
  this.config = config

  validateConfig(this.config)
}

/**
 * Process a list fo items based on the config used to construct the rule instance
 *
 * @param {Array} items The list of items
 */
BuyForRule.prototype.process = function (items) {
  var itemNamePosition = 0

  for (var i = 0; i < items.length; i++) {
    // Looks for itemName items and use its position to determine if its value should be set to zero
    if (items[i].name === this.itemName) {
      if (itemNamePosition % this.config.buy >= this.config.for) {
        items[i].value = 0
      }

      itemNamePosition++
    }
  }
}

/**
 * Get the itemName used to construct the rule instance
 *
 * @return {string} The itemName
 */
BuyForRule.prototype.getItemName = function () {
  return this.itemName
}

function validateConfig (config) {
  if (config.buy === undefined || config.for === undefined) {
    throw new Error('Invalid config object')
  }
}

module.exports = BuyForRule
