var CustomerPricingRules = require('../models/customerPricingRules')
var Checkout = require('../models/checkout')
var DbContext = require('../models/db')
var co = require('co')
var bodyParser = require('body-parser')


/**
 * Exposes checkout controller
 *
 * @param {Express} app 
 */
module.exports = function (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.post('/api/checkout', function (req, res) {
    // uses co to deal with async behaviour of db context calls
    co(function * () {
      var db = new DbContext()

      var customerData = yield db.getCustomerPricingData(req.body.customer)

      var customerPricingRules = new CustomerPricingRules()
      var pricingRules = customerPricingRules.get(customerData)
      var checkout = new Checkout(pricingRules)

      if (req.body.items !== undefined && req.body.items !== null) {
        for (var i = 0; i < req.body.items.length; i++) {
          var item = yield db.getPriceList(req.body.items[i])
          checkout.add(item)
        }
      }

      return checkout.total()
    })
    .then(
      function (total) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({
          total: total,
          customer: req.body.customer,
          items: req.body.items
        }))
      },

      function (err) {
        console.error(err.stack)
      })
  })
}
