'use strict'

const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const fs = require('fs')
const path = require('path')

// define constants
const PORT = 3000

// initial apps instance
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const items = fs.readdirSync('.').map(sp => {
    const item = {}
    item.ext = sp.split('.').slice(-1)[0].toLowerCase()
    item.url = sp

    if (['png', 'jpg', 'jpeg', 'gif'].indexOf(item.ext) !== -1) {
        item.type = 'image'
    } else if (['mp4', 'mkv', 'flv'].indexOf(item.ext) !== -1) {
        item.type = 'video'
    }

    return item
})

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('.'))

app.get('/', (req, res, next) => {
    res.render('index', { items })
})

app.get('/remote', (req, res, next) => {
    res.render('remote', { items })
})

app.get('/client.js', (req, res, next) => {
    res.sendFile(__dirname + '/client.js')
})

app.get('/client.css', (req, res, next) => {
    res.sendFile(__dirname + '/client.css')
})

io.on('connection', socket => {

})

server.listen(PORT, () => console.log('server running at port ' + PORT))
