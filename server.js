let express = require('express')
const path = require('path');

let socket = require('socket.io')
const _ = require('lodash')

let app = express()

const PORT = 4000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

let server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

let videos = []
let currentVideo = null

let io = socket(server)

io.on('connection', socket => {
  socket.emit('updateList', videos)
  console.log(socket.id)
  console.log('User connected')
  socket.emit('setup', {videos, currentVideo})
  socket.on('addNewVideo', video => {
    videos = [...videos, video]
    io.sockets.emit('updateList', videos)
  })
  socket.on('selectVideo', selectedVideo => {
    io.sockets.emit('updateVideo', selectedVideo)
  })
  socket.on('removeVideo', video => {
    _.remove(videos, video)
    io.sockets.emit('updateList', videos)
  })
  socket.on('disconnect', () => console.log('User disconnected'))
})