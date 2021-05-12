'use strict'

const express = require('../jsau-webserver/node_modules/express')
const cors = require('../jsau-webserver/node_modules/cors')
const app = express()
const methodOverride = require('../jsau-webserver/node_modules/method-override')
const fs = require('../jsau-webserver/node_modules/fs')
const bodyParser = require('../jsau-webserver/node_modules/body-parser')
const path = require('../jsau-webserver/node_modules/path')
/*Promesses*/
const util = require('../jsau-webserver/node_modules/util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

/*************PERMET DE RECUPERER CE QU'ON TAPE SUR LES INPUTs*******************/
const urlencodedParser = bodyParser.urlencoded({extended: true})

app.use(express.static(path.join(__dirname, '/')))
//*************INITIALISATION DE LA VARIABLE matiere********************//
let matiere = {
    name : '',
    id : 0
}

/*************APPEL DES METHODS OVERRIDES (PUT, DELETE)********************/
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

/*************TEST API AVEC LES METHODES OVERRIDES********************/
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Api fonctionne très bien',
        data: '',
        methode : '' + req.method
    })
})

/*************LISTER TOUTES LES MATIERES********************/
app.get('/listAll', (req, res) => {
    /*LECTURE DU FICHIER JSON*/
    readFile('./data/data.json', {encoding: 'utf8'})
        .then(JSON.parse)
        .then((obj) => {
            res.json({
                status: 'success',
                message: 'La liste de toutes les matières',
                data : '' + JSON.parse(obj),
                methode : '' + req.method
            })
        })
        .catch((err) => {
            //console.error("Some error occurred", err)
        })
})

/*************AJOUTER UNE MATIERE********************/
app.post('/add', urlencodedParser, (req, res) => {
    /*LECTURE DU FICHIER JSON*/
    readFile('./data/data.json', {encoding: 'utf8'})
        .then(JSON.parse)
        .then((obj) => {
            let inc = 0
            if (obj.length > 0) {
                inc = obj[obj.length - 1].id + 1
            }
            matiere = {
                name : '' + req.body.name,
                id : inc
            }
            obj[inc] = matiere
            let json = JSON.stringify(obj)
            /*ECRITURE DANS LE FICHIER JSON*/
            writeFile('./data/data.json', json)
                .then(() => {
                    res.json({
                        status: 'success',
                        message : 'Ajout d\'une nouvelle matière',
                        data : '' + obj,
                        methode : '' + req.method
                    })
                })
                .catch((err) => {
                })
        })
        .catch((err) => {
            //console.error("Some error occurred", err)
        })
})

/*************MODIFIER UNE MATIERE********************/
app.put('/update/:id', urlencodedParser, (req, res) => {
    /*LECTURE DU FICHIER JSON*/
    readFile('./data/data.json', {encoding: 'utf8'})
        .then(JSON.parse)
        .then((obj) => {
            const requestId = req.params.id

            let matiere_ = obj.filter((matiere_) => {
                return matiere_.id == requestId
            })[0]

            const index = obj.indexOf(matiere_)

            const keys = Object.keys(req.body)

            keys.forEach((key) => {
                matiere_[key] = req.body[key]
            })
            obj[index] = matiere_
            let json = JSON.stringify(obj)
            /*ECRITURE DANS LE FICHIER JSON*/
            writeFile('./data/data.json', json)
                .then(() => {
                    res.json({
                        status: 'success',
                        message : 'Modification de la matière n° ' + req.params.id + ' éffectuée',
                        data : '' + obj,
                        methode : '' + req.method
                    })
                })
                .catch((err) => {
                })
        })
        .catch((err) => {
            //console.error("Some error occurred", err)
        })
})

//*************SUPPRIMER UNE MATIERE********************//
app.delete('/delete/:id', (req, res) => {
    /*LECTURE DU FICHIER JSON*/
    readFile('./data/data.json', {encoding: 'utf8'})
        .then(JSON.parse)
        .then((obj) => {
            delete obj[req.params.id]
            obj.splice(obj.indexOf(null), 1)
            let json = JSON.stringify(obj)
            /*LECTURE DANS LE FICHIER JSON*/
            writeFile('./data/data.json', json)
                .then(() => {
                    res.json({
                        status: 'success',
                        message : 'Suppression de lae matière n° ' + req.params.id,
                        data : '' + obj,
                        methode : '' + req.method
                    })
                })
                .catch((err) => {
                })
        })
        .catch((err) => {
            //console.error("Some error occurred", err)
        })
})

//************************EXPORTATION DES ROUTES*******************//
module.exports = app
//*************TEXPORTATION DES ROUTES********************//
