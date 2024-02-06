const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const port = 4000

app.use(bodyParser.json());

const server = app.listen(port, () => {
    console.log("Server connect hogaya hai bhai")
})

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname,'src')))

io.on('connection', onconnected)
const socketsConnected = new Set()

function onconnected(socket) {
    socketsConnected.add(socket.id)

    io.emit('clients-total',socketsConnected.size)

    socket.on('disconnect',() => {
      console.log("socket got disconnected",socket.id)
      socketsConnected.delete(socket.id)

    })

    //will recieve from client and emit to other browser
    socket.on('message',(data) => {
        console.log(data)
        socket.broadcast.emit('chat-message',data)
    }) 
}

app.post('/hello',(req,res) => {
console.log(req.body)
res.status(200).send("hey")
})






