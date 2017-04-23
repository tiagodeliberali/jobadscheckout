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
      var priceList = yield db.getPriceList()
      var customerData = yield db.getCustomerPricingData(req.body.customer)

      var customerPricingRules = new CustomerPricingRules(priceList)
      var pricingRules = customerPricingRules.get(customerData)

      return pricingRules
    })
    .then(
      function (pricingRules) {
        var co = new Checkout(pricingRules)

        if (req.body.items !== undefined && req.body.items !== null) {
          for (var i = 0; i < req.body.items.length; i++) {
            co.add(req.body.items[i])
          }
        }

        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({
          total: co.total(),
          customer: req.body.customer,
          items: req.body.items
        }))
      },

      function (err) {
        console.error(err.stack)
      })
  })
}
