const socket = io();

const clientsTotal = document.getElementById('clients-total')

const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

//button to send message 
messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
  })

//to calculate total clients 
socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Clients: ${data}`
})

//function is used to send message to browser
function sendMessage() {
    console.log(messageInput.value)
    const data ={
        name:nameInput.value,
        message:messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message',data)
}

//will recive from browser
socket.on('chat-message',(data) => {
    console.log(data)
})
