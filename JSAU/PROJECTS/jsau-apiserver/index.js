'use strict'

const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(morgan('dev'))

const apiRoutes = require('./api.js')
app.use('/api', apiRoutes)

app.get('/info', (req, res) => {
    res.send('jsau-apiserver')
})

app.listen(8080, () => {
})
