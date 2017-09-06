var express = require('express')
var app = express()

var myLogger = function (req, res, next) {
  res.send('Hello World!')
  next()
}

app.use(myLogger)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000)
