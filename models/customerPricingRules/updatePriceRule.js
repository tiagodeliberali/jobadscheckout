'use strict'

/**
 * Creates an instance of UpdatePriceRule.
 *
 *  This rule implements the ability to define a new value for the items based on its quantity in the supplied list.
 *
 *  By this way, if we have 4 items on a list and a config: { quantity: 4, newValue: 299.99 }, we will set the
 * value to 299.99 to all items with itemName
 *
 * @param {string} itemName the name of the item that the rule will be applied
 * @param {object} config an object containing quantity and newValue properties
 */
function UpdatePriceRule (itemName, config) {
  this.itemName = itemName
  this.config = config

  validateConfig(this.config)
}

/**
 * Process a list fo items based on the config used to construct the rule instance
 *
 * @param {Array} items The list of items
 */
UpdatePriceRule.prototype.process = function (items) {
  var updateList = shouldUpdateItemList(this.itemName, this.config.quantity, items)

  if (updateList) {
    for (var i = 0; i < items.length; i++) {
      if (shouldUpdateItem(items[i], this.itemName)) {
        items[i].value = this.config.newValue
      }
    }
  }
}

/**
 * Get the itemName used to construct the rule instance
 *
 * @return {string} The itemName
 */
UpdatePriceRule.prototype.getItemName = function () {
  return this.itemName
}

/**
 *  Determines if the item list should be updated, based on the number of itemName items in the list
 * or if the config defines quantity equals 1
 *
 * @param {string} itemName The itemName to be searched in the list.
 * @param {number} quantity The minimum quantity to apply the rule.
 * @param {ItemList} items The itemList to be searched.
 * @returns True if the rule should be applied. Otherwise, false.
 */
function shouldUpdateItemList (itemName, quantity, items) {
  if (quantity === 1) {
    return true
  }

  var itemNameCount = 0

  for (var i = 0; i < items.length; i++) {
    if (items[i].name === itemName) {
      itemNameCount++
    }
  }

  return itemNameCount >= quantity
}

function shouldUpdateItem (item, itemName) {
  return item.name === itemName && item.value !== 0
}

function validateConfig (config) {
  if (config.quantity === undefined || config.newValue === undefined) {
    throw new Error('Invalid config object')
  }
}

module.exports = UpdatePriceRule
