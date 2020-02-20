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

let playlist = []
let currentIndex = -1
let playbackTime = null
let volume = 100

let io = socket(server)

io.on('connection', socket => {
  socket.emit('setup', {playlist, currentVideo: playlist[currentIndex], volume})
  socket.on('addVideo', (video, addAsNext) => {
    if (addAsNext) {
      playlist.splice(currentIndex + 1, 0, video)
      io.sockets.emit('updateVideo', video)
      currentIndex++
    } else {
      playlist = [...playlist, video]
    }
    io.sockets.emit('updateList', playlist)
  })
  socket.on('selectVideo', selectedVideo => {
    currentIndex = playlist.findIndex(video => video.id === selectedVideo.id)
    io.sockets.emit('updateVideo', selectedVideo)
  })
  socket.on('playNextVideo', () => {
    if (playlist[currentIndex + 1]) {
      io.sockets.emit('updateVideo', playlist[currentIndex + 1])
      currentIndex++
    }
  })
  socket.on('removeVideo', video => {
    let index = playlist.findIndex(i => i.id === video.id)
    if (index <= currentIndex) {
      currentIndex--
    }
    _.remove(playlist, video)
    io.sockets.emit('updateList', playlist)
  })
  socket.on('changeVolume', newVolume => {
    volume = newVolume
    if (volume < 0) {
      volume = 0
    }
    if (volume > 100) {
      volume = 100
    }
    io.sockets.emit('updateVolume', volume)
  })
})