var express = require('express')
var checkoutController = require('./controllers/checkoutController')

// application port
var port = process.env.PORT || 3000

var app = express()

// configure checkout controller
checkoutController(app)

// starts listenning port
app.listen(port)

module.exports = app
