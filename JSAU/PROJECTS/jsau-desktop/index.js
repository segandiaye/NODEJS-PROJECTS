'use strict'

const express = require('express')
const app = express()
const dirTree = require('directory-tree');

app.get('/info', (req, res) => {
    res.send('jsau-desktop')
})

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

app.get('/etc/ejs', (req, res) => {
    dirTree('../', {extensions:/\.ejs$/}, null, (item, PATH, stats) => {
        let data = []
        items.path = '/etc/ejs/'
        items.name = '/etc/ejs/'
        items.children = item.children
        data.push(items)
        let html = listHtml(data)
        res.send(html)
    });
})

app.get('/etc/json', (req, res) => {
    dirTree('../', {extensions:/\.json$/}, null, (item, PATH, stats) => {
        let data = []
        items.path = '/etc/json/'
        items.name = '/etc/json/'
        items.children = item.children
        data.push(items)
        let html = listHtml(data)
        res.send(html)
    });
})

app.get('/etc/js', (req, res) => {
    dirTree('../', {extensions:/\.js$/}, null, (item, PATH, stats) => {
        let data = []
        items.path = '/etc/js/'
        items.name = '/etc/js/'
        items.children = item.children
        data.push(items)
        let html = listHtml(data)
        res.send(html)
    })
})

app.get('/etc/html', (req, res) => {
    dirTree('../', {extensions:/\.html$/}, null, (item, PATH, stats) => {
        let data = []
        items.path = '/etc/hml/'
        items.name = '/etc/hml/'
        items.children = item.children
        data.push(items)
        let html = listHtml(data)
        res.send(html)
    })
})

app.get('/etc/css', (req, res) => {
    dirTree('../', {extensions:/\.css$/}, null, (item, PATH, stats) => {
        let data = []
        items.path = '/etc/css/'
        items.name = '/etc/css/'
        items.children = item.children
        data.push(items)
        let html = listHtml(data)
        res.send(html)
    })
})

app.listen(8081, () => {
})
