'use strict'

//let http = require('http-server')
const express = require('../jsau-webserver/node_modules/express')
const app = express()
const morgan = require('../jsau-webserver/node_modules/morgan')
app.use(morgan('dev'))

//**************APPEL DE L'API*****************************//
const apiRoutes = require('./api.js')
app.use('/api', apiRoutes)

//*************/info*******************//
app.get('/info', (req, res) => {
  res.send('jsau-apiserver')
})

//*************************LE SERVEUR*****************************///
app.listen(8081, () => {
})
