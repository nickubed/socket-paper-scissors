const express = require('express');
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const layout = require('express-ejs-layouts')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(layout)

// SOCKET VARIABLES
let connections = []
let players = []
// SOCKET FUN
io.sockets.on('connection', socket => {
    console.log(socket.id)
    connections.push(socket)
    console.log(`Connection made: ${connections.length} sockets connected.`)

    socket.on('disconnect', data => {
        players.splice(players.indexOf(socket.username), 1)
        updateUsernames()
        connections.splice(connections.indexOf(socket), 1)
        io.emit('disconnected', socket.username)
        console.log(`Disconnected: ${connections.length} sockets connected.`)
    })

    socket.on('add player', (data, callback) => {
        socket.username = data;
        if (players.indexOf(socket.username) > -1) {
            callback(false);
        } else {
            players.push(socket.username)
            updateUsernames();
            console.log(players)
            callback(true);
            if (Object.keys(players).length == 2){
                io.emit('connected', socket.username)
                io.emit('game start')
            }
        }
    })

    const updateUsernames = () => {
        io.sockets.emit('get players', players)
    }
})

app.get('/', (req, res) => {
    res.render('index')
})

server.listen(3000, () => {
    console.log(`You're jamming to the sweet sounds of Andre 3000`)
})