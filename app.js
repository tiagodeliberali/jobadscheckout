var express = require('express')
var checkoutController = require('./controllers/checkoutController')
var mongoose = require('mongoose')

var app = express()

// connect to mongodb
var connectionString = process.env.DBCONN || ''
mongoose.connect(connectionString)

// configure checkout controller
checkoutController(app)

// starts listenning port
var port = process.env.PORT || 3000
app.listen(port)

module.exports = app
