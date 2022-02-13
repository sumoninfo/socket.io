const express       = require('express')
const app           = express()
const http          = require('http')
const expressServer = http.createServer(app)

const {Server} = require('socket.io')
const io       = new Server(expressServer)

app.get('/express-server', (req, res) => {
    res.end("This is my backend")
})

io.on('connection', (socket) => {
    console.log("New User Connected")

    socket.on('disconnect', () => {
        console.log("User Disconnected")
    })
})

expressServer.listen(5000, () => {
    console.log("Server run at 5000")
})
