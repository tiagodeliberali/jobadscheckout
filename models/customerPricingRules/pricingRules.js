'use strict'

/**
 *  Creates an instance of PricingRules.
 *
 *  This class is responsible for returning items based on a itemName and
 * applying a list of price rules over the items list
 *
 * @param {PriceList} priceList An object containing all itemNames and its items associated
 */
function PricingRules (priceList) {
  this.priceList = priceList
  this.rules = []
}

/**
 *  Returns the item with name and value based on the itemName.
 * Returns undefined if the itemName is not registered.
 *
 * @param {string} itemName The itemName of the item.
 * @returns The item with name and value
 */
PricingRules.prototype.getItem = function (itemName) {
  return this.priceList[itemName]
}

/**
 * Process the list of items suplied and returns a processed list. The original list is not changed.
 *
 * @param {Array} items List of items to be processed.
 * @returns The processed list of items.
 */
PricingRules.prototype.processItems = function (items) {
  var processedItems = JSON.parse(JSON.stringify(items))

  for (var i = 0; i < this.rules.length; i++) {
    this.rules[i].process(processedItems)
  }

  return processedItems
}

/**
 * Adds a rule to the list of rules.
 *
 * @param {Rule} rule The Rule to be added.
 */
PricingRules.prototype.addRule = function (rule) {
  this.rules.push(rule)
}

/**
 * Return the list of added rules.
 *
 * @returns The array of added rules.
 */
PricingRules.prototype.getRules = function () {
  return this.rules
}

module.exports = PricingRules
