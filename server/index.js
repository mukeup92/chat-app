const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {cors: {origin: '*'}});
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')))
app.set('socketio', io);

const messages = [];
let typer = ''

app.get('*', (req, res) =>  {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

const room = io.of('/room')
  .on("connection", socket => {

  socket.on('message', async (data) => {
    const messageObj = {
      nicName: data.nicName,
      message: data.message,
      type: 'message',
      dateTime: new Date()
    }
		messages.push(messageObj)
    room.emit('messages', messages);
  })

  socket.on('join', async (nicName) => {
    messages.push({nicName: nicName, status: 'joined', dateTime: new Date()});
    room.emit('messages', messages);
  })

  socket.on('left', async (nicName) => {
    messages.push({nicName: nicName, status: 'left', dateTime: new Date()});
    room.emit('messages', messages);
	})
	
	socket.on('typing', async(nicName) => {
		typer = nicName
		room.emit('typer', typer);
	})

	socket.on('not-typing', async(nicName) => {
		typer = ''
		room.emit('typer', typer);
	})

	socket.on('change-name', async({oldName, newName}) => {
		messages.push({oldName, newName, status:'name-changed', dateTime: new Date()})
		room.emit('messages', messages)
	})

});

server.listen(port, () => console.log(`Listening on port ${port}`));