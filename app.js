'use strict'

const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const fs = require('fs')
const path = require('path')

// define constants
const PORT = 80

// initial apps instance
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const slidePathRoot = './slides'
const slidePaths = fs.readdirSync(slidePathRoot)

const slideBase64Urls = slidePaths.map(slide_path => {
    return 'data:image/png;base64,' + fs.readFileSync(path.join(slidePathRoot, slide_path)).toString('base64')    
})

app.set('view engine', 'pug')

app.get('/', (req, res, next) => {
    res.render('index', { slideBase64Urls })
})

app.get('/remote', (req, res, next) => {
    res.render('remote')
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
