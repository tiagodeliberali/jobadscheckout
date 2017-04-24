'use strict'

/**
 *  Creates an instance of PricingRules.
 *
 *  This class is responsible for applying a list of price rules over the items list
 *
 */
function PricingRules () {
  this.rules = []
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
