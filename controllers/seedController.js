var CustomerRule = require('../models/db/customerRuleModel')
var ItemPrice = require('../models/db/itemPriceModel')

/**
 * Exposes seed controller
 *
 * @param {Express} app
 */
module.exports = function (app) {
  app.post('/api/seedPrices', function (req, res) {
    var prices = [
      { name: 'classic', value: 269.99 },
      { name: 'standout', value: 322.99 },
      { name: 'premium', value: 394.99 }
    ]

    ItemPrice.create(prices, function (err, results) {
      if (err) throw (err)

      res.send(results)
    })
  })

  app.post('/api/seedRules', function (req, res) {
    var rules = [
      { customer: 'unilever', name: 'BuyForRule', itemName: 'classic', config: { buy: 3, for: 2 } },
      { customer: 'apple', name: 'UpdatePriceRule', itemName: 'standout', config: { quantity: 1, newValue: 299.99 } },
      { customer: 'nike', name: 'UpdatePriceRule', itemName: 'premium', config: { quantity: 4, newValue: 379.99 } },
      { customer: 'ford', name: 'BuyForRule', itemName: 'classic', config: { buy: 5, for: 4 } },
      { customer: 'ford', name: 'UpdatePriceRule', itemName: 'standout', config: { quantity: 1, newValue: 309.99 } },
      { customer: 'ford', name: 'UpdatePriceRule', itemName: 'premium', config: { quantity: 3, newValue: 389.99 } }
    ]

    CustomerRule.create(rules, function (err, results) {
      if (err) throw (err)

      res.send(results)
    })
  })
}
