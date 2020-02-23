import socketIO from 'socket.io-client'
import {
  updateLocalPlaylist,
  updateCurrentVideo,
  updatePlayback,
  changePlayback, updatePlayerState
} from '../actions'
import {
  ADD_VIDEO,
  INIT_SOCKET, PAUSE_VIDEO, PLAY_VIDEO,
  REMOVE_VIDEO,
  REQUEST_NEXT_VIDEO, REQUEST_PLAYBACK_CHANGE, REQUEST_PLAYBACK_UPDATE, REQUEST_VOLUME_CHANGE,
  SELECT_VIDEO
} from '../actions/types'
import _ from 'lodash'

let socket

export default () => ({getState, dispatch}) => next => action => {
  switch (action.type) {
    case INIT_SOCKET:
      if (process.env.NODE_ENV === 'development') {
        socket = socketIO('http://192.168.0.15:4000')
      } else {
        socket = socketIO()
      }
      socket.on('setup', data => {
        dispatch(updateLocalPlaylist(data.playlist))
        dispatch(updateCurrentVideo(data.currentVideo))
        dispatch(updatePlayerState(data.playerState))
      })
      socket.on('updateList', videos => {
        dispatch(updateLocalPlaylist(videos))
      })
      socket.on('updateVideo', currentVideo => {
        document.title = currentVideo.title
        dispatch(updateCurrentVideo(currentVideo))
      })
      socket.on('updatePlayerState', playerState => {
        dispatch(updatePlayerState(playerState))
      })
      socket.on('updatePlayback', playback => {
        if (!getState().player.seeking) {
          dispatch(updatePlayback(playback))
        }
      })
      socket.on('changePlayback', playback => {
        dispatch(updatePlayback(playback))
        if (getState().client.master) {
          dispatch(changePlayback())
        }
      })
      return
    case ADD_VIDEO:
      const playlist = getState().client.playlist
      if (!_.find(playlist, obj => obj.id === action.video.id)) {
        socket.emit('addVideo', action.video, action.addAsNext)
      }
      return
    case SELECT_VIDEO:
      return socket.emit('selectVideo', action.video)
    case REQUEST_NEXT_VIDEO:
      return socket.emit('playNextVideo')
    case REMOVE_VIDEO:
      return socket.emit('removeVideo', action.video)
    case REQUEST_VOLUME_CHANGE:
      return socket.emit('changeVolume', action.volume)
    case REQUEST_PLAYBACK_UPDATE:
      return socket.emit('updatePlayback', action.playback)
    case REQUEST_PLAYBACK_CHANGE:
      return socket.emit('changePlayback', action.playback)
    case PLAY_VIDEO:
      return socket.emit('playVideo')
    case PAUSE_VIDEO:
      return socket.emit('pauseVideo')
    default:
      return next(action)
  }
}