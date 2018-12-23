'use strict'

//let http = require('http-server')
const express = require('express')
const cors = require('cors')
const app = express()
const methodOverride = require('method-override')
const fs = require('fs')
const morgan = require('morgan')
app.use(morgan('dev'))
const bodyParser = require('body-parser')
app.set('view engine', 'ejs')
const path = require('path')
/*Promesses*/
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
//const opener = require('opener')
/*LE BODYPARSER*/
const urlencodedParser = bodyParser.urlencoded({extended: true})

app.use('/', express.static(path.join(__dirname, '/resource/css')))
app.use('/', express.static(path.join(__dirname, '/resource/js')))
app.use('/', express.static(path.join(__dirname, '/resource/images')))

//*************APPEL DES METHODS OVERRIDES (PUT, DELETE)********************//
//app.use(methodOverride('_method'))


app.use(urlencodedParser)
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

//**************CROSS ORIGIN*************************//
app.use(cors())
app.options('*', cors())
//**************FIN CROSS ORIGIN*************************//

let user = {
    name : '',
    id: 0
}
let smsModif = ''
let edit = false
let color = ''
let style = {
    style : 'style.css',
    img : 'logo.jpg'
}
/****************LES 100 NOMBRE PREMIERS***********************************/
const my_shared_code_headless = require('./my_shared_code_headless')
let even_numbers = my_shared_code_headless.premiersNumbers(100)

//*************AFORMULAIRE DE TEST DES METHODES OVERRIDES********************//
app.get('/', (req, res) => {
    res.render(path.join(__dirname, '/resource/views/premiers.ejs'), {premiers : even_numbers, style})
})

//*************/info*******************//
app.get('/info', (req, res) => {
    res.send('jsau-webserver-1.0.0')
})

/*****************************ACCUEIL**************************************/
app.get('/accueil', (req, res) => {
    edit = false
    color = ''
    smsModif = ''
    /*LECTURE DU FICHIER JSON*/
    readFile('./src/resource/data/data.json', {encoding: 'utf8'})
        .then(JSON.parse)
        .then((obj) => {
            res.render(path.join(__dirname, '/resource/views/index.ejs'), {users:obj, user, smsModif, color, edit, style})
        })
        .catch((err) => {
        //console.error("Some error occurred", err)
        })
})

//************************AJOUTER*****************************//
app.post('/add', urlencodedParser, (req, res) => {
    color = ''
    /*LECTURE DU FICHIER JSON*/
    readFile('./src/resource/data/data.json', {encoding: 'utf8'})
        .then(JSON.parse)
        .then((obj) => {
            let inc = 0
            if (obj.length > 0) {
                inc = obj[obj.length - 1].id + 1
            }
            user = {
                name : '' + req.body.name,
                id: inc
            }
            obj.push(user)
            let json = JSON.stringify(obj)
            color = 'color:green'
            smsModif = 'Opération éffectuée.'
            /*ECRITURE DANS LE FICHIER JSON*/
            writeFile('./src/resource/data/data.json', json)
                .then(() => {
                    res.render(path.join(__dirname, '/resource/views/index.ejs'), {users:obj, user, smsModif, color, edit, style})
                })
                .catch((err) => {
                })
        })
        .catch((err) => {
        //console.error("Some error occurred", err)
        })
})

/*****************************EDITION**************************************/
app.get('/detail/:id', (req, res) => {
    color = ''
    edit = true
    color = ''
    smsModif = ''
    /*LECTURE DU FICHIER JSON*/
    readFile('./src/resource/data/data.json', {encoding: 'utf8'})
        .then(JSON.parse)
        .then((obj) => {
            user = []
            for (let i = 0;i < obj.length;i++) {
                if (obj[i].id == req.params.id) {
                    user = obj[i]
                }
            }
            res.render(path.join(__dirname, '/resource/views/index.ejs'), {users : obj, user, smsModif, color, edit, style})
        })
        .catch((err) => {
        //console.error("Some error occurred", err)
        })
})

/*****************************MODIFICATION**************************************/
app.put('/update/:id', urlencodedParser, (req, res) => {
    color = ''
    /*LECTURE DU FICHIER JSON*/
    readFile('./src/resource/data/data.json', {encoding: 'utf8'})
        .then(JSON.parse)
        .then((obj) => {
            const requestId = req.params.id

            let user_ = obj.filter((user_) => {
                return user_.id == requestId
            })[0]

            const index = obj.indexOf(user_)

            const keys = Object.keys(req.body)

            keys.forEach((key) => {
                user_[key] = req.body[key]
            })
            obj[index] = user_
            color = 'color:green'
            smsModif = 'Modification éffectuée.'
            user = obj[index]
            let json = JSON.stringify(obj)
            /*ECRITURE DANS LE FICHIER JSON*/
            writeFile('./src/resource/data/data.json', JSON.stringify(json))
                .then(() => {
                    edit = false
                    res.render(path.join(__dirname, '/resource/views/index.ejs'), {users : obj, user, smsModif, color, edit, style})
                })
                .catch((err) => {
                })
        })
        .catch((err) => {
        //console.error("Some error occurred", err)
        })
})

/*****************************SUPPRESSION**************************************/
app.delete('/delete/:id', (req, res) => {
    color = ''
    edit = false
    /*LECTURE DU FICHIER JSON*/
    readFile('./src/resource/data/data.json', {encoding: 'utf8'})
        .then(JSON.parse)
        .then((obj) => {
            delete obj['' + req.params.id]
            obj.splice(obj.indexOf(null), 1)
            let json = JSON.stringify(obj)
            /*ECRITURE DANS LE FICHIER JSON*/
            writeFile('./src/resource/data/data.json', JSON.stringify(json))
                .then(() => {
                    color = 'color:green'
                    smsModif = 'Opération éffectuée.'
                    res.render(path.join(__dirname, '/resource/views/index.ejs'), {users:obj, user, smsModif, color, edit, style})
                })
                .catch((err) => {
                })
        })
        .catch((err) => {
        //console.error("Some error occurred", err)
        })
})


app.listen(8083, () => {
})
