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
let playerState = {
  volume: 100,
  playback: 0,
  isPlaying: true
}

let io = socket(server)

const sockets = io.sockets

sockets.on('connection', socket => {
  socket.join('default')
  socket.emit('setup', {playlist, currentVideo: playlist[currentIndex], playerState})
  socket.on('addVideo', (video, addAsNext) => {
    if (addAsNext) {
      playlist.splice(currentIndex + 1, 0, video)
      sockets.in('default').emit('updateVideo', video)
      currentIndex++
    } else {
      playlist = [...playlist, video]
    }
    // socket.emit('updateList', playlist)
    sockets.in('default').emit('updateList', playlist)
  })
  socket.on('selectVideo', selectedVideo => {
    console.log(selectedVideo)
    if (typeof selectedVideo === 'number') {
      if (playlist[currentIndex + selectedVideo]) {
        sockets.in('default').emit('updateVideo', playlist[currentIndex + selectedVideo])
        currentIndex = currentIndex + selectedVideo
      }
    } else {
      currentIndex = playlist.findIndex(video => video.id === selectedVideo.id)
      if (playlist[currentIndex]) {
        sockets.in('default').emit('updateVideo', playlist[currentIndex])
      }
    }
    playerState.isPlaying = true
    playerState.playback = 0
    sockets.in('default').emit('updatePlayerState', playerState)
  })
  socket.on('playNextVideo', () => {
    if (playlist[currentIndex + 1]) {
      sockets.in('default').emit('updateVideo', playlist[currentIndex + 1])
      currentIndex++
    }
  })
  socket.on('removeVideo', video => {
    let index = playlist.findIndex(i => i.id === video.id)
    if (index <= currentIndex) {
      currentIndex--
    }
    _.remove(playlist, video)
    sockets.in('default').emit('updateList', playlist)
  })
  socket.on('changeVolume', newVolume => {
    if (newVolume < 0) {
      newVolume = 0
    }
    if (newVolume > 100) {
      newVolume = 100
    }
    playerState.volume = newVolume
    sockets.in('default').emit('updatePlayerState', playerState)
  })
  socket.on('changePlayback', newPlayback => {
    if (newPlayback < 0) {
      newPlayback = 0
    }
    playerState.playback = newPlayback
    sockets.in('default').emit('changePlayback', newPlayback)
  })
  socket.on('updatePlayback', updatedPlayback => {
    playerState.playback = updatedPlayback
    socket.to('default').emit('updatePlayback', updatedPlayback)
  })
  socket.on('playVideo', () => {
    playerState.isPlaying = true
    sockets.in('default').emit('updatePlayerState', playerState)
  })
  socket.on('pauseVideo', () => {
    playerState.isPlaying = false
    sockets.in('default').emit('updatePlayerState', playerState)
  })
})