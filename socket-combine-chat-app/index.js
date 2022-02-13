const express       = require('express')
const app           = express()
const http          = require('http')
const expressServer = http.createServer(app);

const {Server} = require('socket.io')
const io       = new Server(expressServer);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
        io.emit('chat_transfer', msg)
    })
    console.log("New User Connected")
})

expressServer.listen(3000, () => {
    console.log('express server run @ 3000')
})