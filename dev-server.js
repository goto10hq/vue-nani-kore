var opn = require('opn')
var path = require('path')
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || 8080
// automatically open browser, if not set will be false
var autoOpenBrowser = true
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = {}

var app = express()

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// serve pure static assets
app.use('/', express.static('./docs'))
app.use('/blob', express.static('./docs/blob'))

var uri = 'http://localhost:' + port

console.log('> NaniKore is listening at ' + uri + '\n')

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  
  if (autoOpenBrowser) {
    opn(uri)
  }
})