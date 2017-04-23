var express = require('express')
var checkoutController = require('./controllers/checkoutController')

var port = process.env.PORT || 3000

var app = express()

checkoutController(app)

app.listen(port)

module.exports = app
