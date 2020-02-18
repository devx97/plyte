let express = require('express')
const path = require('path');

let socket = require('socket.io')
const _ = require('lodash')

let app = express()

const PORT = process.env.PORT || 4000;

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
  socket.emit('setup', {videos, currentVideo})
  socket.on('addVideo', (video, addAsNext) => {
    console.log(addAsNext)
    if (addAsNext) {
      let currentIndex = videos && currentVideo ? videos.findIndex(v => v.id === currentVideo.id) : 0
      videos.splice(currentIndex + 1, 0, video)
      io.sockets.emit('updateVideo', video)
    } else {
      videos = [...videos, video]
    }
    io.sockets.emit('updateList', videos)
  })
  socket.on('selectVideo', selectedVideo => {
    currentVideo = selectedVideo
    io.sockets.emit('updateVideo', selectedVideo)
  })
  socket.on('removeVideo', video => {
    _.remove(videos, video)
    io.sockets.emit('updateList', videos)
  })
})