const express       = require('express')
const app           = express()
const http          = require('http')
const expressServer = http.createServer(app)

const {Server} = require('socket.io')
const io       = new Server(expressServer)


const path = require('path')
app.use(express.static('client/build'))


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

io.on('connection', (socket) => {
    console.log("New User Connected")

    setTimeout(() => {
        socket.emit('msg', "This message from server")
    }, 5000)


    socket.on('disconnect', () => {
        console.log("User Disconnected")
    })
})

expressServer.listen(5000, () => {
    console.log("Server run at 5000")
})
