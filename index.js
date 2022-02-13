const app  = require('express')();
const http = require('http').Server(app);
const io   = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//=========ROOM============
io.on('connection', (socket) => {

    socket.join('kitchen-room')
    const sizeOfKitchen = io.sockets.adapter.rooms.get('kitchen-room').size
    io.sockets.in('kitchen-room').emit('cooking', `Fried Rice Cooking ${sizeOfKitchen}`)
    io.sockets.in('kitchen-room').emit('boiling', "Boiling water")


    socket.join('bed-room')
    io.sockets.in('bed-room').emit('sleep', "I am sleeping")
    io.sockets.in('bed-room').emit('rest', "I am taking rest")

})

/*let buyNsp = io.of("/buy")
buyNsp.on('connection', function (socket) {
    buyNsp.emit("buyNspEvent", "message send from buy nsp event")
})

let sellNsp = io.of("/sell")
sellNsp.on('connection', function (socket) {
    sellNsp.emit("sellNspEvent", "Message send from sell nsp event")
})*/
/*io.on('connection', (socket) => {
    io.sockets.emit("MyBroadcast", "Hello Everyone welcome")

    /!* socket.on('customEvent', function (msg) {
         console.log(msg);
     })*!/
    /!*socket.on('chat_message', msg => {
        io.emit('chat_message', msg);
    });*!/
    console.log('User connected');
    // setTimeout(function () {
    //     socket.send("hello sumon")
    // }, 2000)


    /!*setInterval(function () {
        let d = new Date();
        let t = d.getTime();
        console.log(t, 'time')
        socket.emit('myEvent', t)
    }, 500)*!/
});*/

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});