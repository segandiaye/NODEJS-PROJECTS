'use strict'

const express = require('../jsau-webserver/node_modules/express')
const app = express()
/**TREE******************/
const dirTree = require('directory-tree');

//*************/info*******************//
app.get('/info', (req, res) => {
  res.send('jsau-desktop')
})

//*************DIRECTORY TREE********************//
let items = {
    path: '',
    name: '',
    children:[]
}

function listHtml(children) {
    return '<ul>' + children.map((node) =>
        '<li>' + node.name +
                    (node.type === 'file' ? '' : listHtml(node.children)) +
                '</li>'
    ).join('\n') +
            '</ul>';
}

/****LES FICHIERS EJS**********/
app.get('/etc/ejs', (req, res) => {
    dirTree('../', {extensions:/\.ejs$/}, null, (item, PATH, stats) => {
        let data = []
        items.path = item.path
        items.name = item.name
        items.children = item.children
        data.push(items)
        let html = listHtml(data)
        res.send(html)
    });
})

/****LES FICHIERS JSON**********/
app.get('/etc/json', (req, res) => {
    dirTree('../', {extensions:/\.json$/}, (item, PATH, stats) => {
        let data = []
        items.path = item.path
        items.name = item.name
        items.children = item.children
        data.push(items)
        let html = listHtml(data)
        res.send(html)
    });
})

/****LES FICHIERS JS**********/
app.get('/etc/js', (req, res) => {
    dirTree('../', {extensions:/\.js$/}, (item, PATH, stats) => {
        let data = []
        items.path = item.path
        items.name = item.name
        items.children = item.children
        data.push(items)
        let html = listHtml(data)
        res.send(html)
    })
})

/****LES FICHIERS HTML**********/
app.get('/etc/html', (req, res) => {
    dirTree('../', {extensions:/\.html$/}, (item, PATH, stats) => {
        let data = []
        items.path = item.path
        items.name = item.name
        items.children = item.children
        data.push(items)
        let html = listHtml(data)
        res.send(html)
    })
})

/****LES FICHIERS CSS**********/
app.get('/etc/css', (req, res) => {
    dirTree('../', {extensions:/\.css$/}, (item, PATH, stats) => {
        let data = []
        items.path = item.path
        items.name = item.name
        items.children = item.children
        data.push(items)
        let html = listHtml(data)
        res.send(html)
    })
})
//*************************LE SERVEUR*****************************///
app.listen(8081, () => {
})
