'use strict'

function PricingRules (priceList) {
  this.priceList = priceList
  this.rules = []
}

PricingRules.prototype.getItem = function (itemName) {
  return this.priceList[itemName]
}

PricingRules.prototype.processItems = function (items) {
  var processedItems = JSON.parse(JSON.stringify(items))

  for (var i = 0; i < this.rules.length; i++) {
    this.rules[i].process(processedItems)
  }

  return processedItems
}

PricingRules.prototype.addRule = function (rule) {
  this.rules.push(rule)
}

PricingRules.prototype.getRules = function () {
  return this.rules
}

module.exports = PricingRules
