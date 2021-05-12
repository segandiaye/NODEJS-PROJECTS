'use strict'

const express = require('express')
const app = express()

app.get('/info', (req, res) => {
  res.send('jsau-webapp')
})

app.listen(8082, () => {
})
