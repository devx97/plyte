let socket = require('socket.io')
const _ = require('lodash')

let playlist = []
let rooms = [{
  name: "1",
  currentVideo: "Young Igi ft. Włodi - THC",
  password: "test",
  users: [
    "XD", "XDD"
  ],
  maxUsers: 5,
  createdAt: Date.now(),
},
  {
  name: "2",
  currentVideo: "Zeamsone \"SPORT\" ft. Young Igi (Official Visualiser)",
  password: false,
  users: [],
  maxUsers: 5,
  createdAt: Date.now(),
}
]
let users = []
let counter = 0
let currentIndex = -1
let playerState = {
  volume: 100,
  playback: 0,
  isPlaying: true
}

let io = socket()

const sockets = io.sockets

const PORT = process.env.PORT || 4000
io.listen(PORT, {cookie: false})

sockets.on('connection', socket => {
  socket.emit('setup', {playlist, currentVideo: playlist[currentIndex], playerState, rooms})
  socket.on('addVideo', (video, addAsNext) => {
    if (playlist.find(item => item.id === video.id)) {
      return
    }
    if (addAsNext) {
      playlist.splice(currentIndex + 1, 0, video)
      sockets.in('default').emit('updateVideo', video)
      currentIndex++
    } else {
      playlist = [...playlist, video]
    }
    sockets.in('default').emit('updateList', playlist)
  })
  socket.on('selectVideo', selectedVideo => {
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
  socket.on('logIn', nickname => {
    if (users.find(user => user.nickname === nickname)) {
      socket.emit('logInFailed', 'Username taken!')
    } else {
      const newUser = {id: counter, nickname}
      users.push(newUser)
      socket.emit('logInSuccess', newUser)
      counter++
    }
  })
  socket.on('requestUpdateRooms', () => {
    let formattedRooms = JSON.parse(JSON.stringify(rooms))
    formattedRooms = formattedRooms.map(room => ({...room, users: room.users.length, password: !!room.password}))
    socket.emit('updateRooms', formattedRooms)
  })
})