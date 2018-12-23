'use strict'

const express = require('../jsau-webserver/node_modules/express')
const app = express()

//*************/info*******************//
app.get('/info', (req, res) => {
  res.send('jsau-desktop')
})

//*************************LE SERVEUR*****************************///
app.listen(8082, () => {
})
