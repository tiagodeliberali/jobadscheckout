'use strict'

function UpdatePriceRule (itemName, config) {
  this.itemName = itemName
  this.config = config

  validateConfig(this.config)
}

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

UpdatePriceRule.prototype.getItemName = function () {
  return this.itemName
}

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
