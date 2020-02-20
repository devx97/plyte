import socketIO from 'socket.io-client'
import {
  updateLocalPlaylist,
  updateCurrentVideo,
  updateVolume,
  updateServerPlayback,
  updateClientPlayback
} from '../actions'
import {
  ADD_VIDEO,
  INIT_SOCKET,
  REMOVE_VIDEO,
  REQUEST_NEXT_VIDEO, REQUEST_PLAYBACK_CHANGE, REQUEST_VOLUME_CHANGE,
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
        dispatch(updateVolume(data.volume))
      })
      socket.on('updateList', videos => {
        dispatch(updateLocalPlaylist(videos))
      })
      socket.on('updateVideo', currentVideo => {
        dispatch(updateCurrentVideo(currentVideo))
      })
      socket.on('updateVolume', volume => {
        dispatch(updateVolume(volume))
      })
      socket.on('newPlayback', playback => {
        dispatch(updateClientPlayback(playback))
        dispatch(updateServerPlayback(playback))
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
    case REQUEST_PLAYBACK_CHANGE:
      return socket.emit('changePlayback', action.newPlayback)
    default:
      return next(action)
  }
}