import socketIO from 'socket.io-client'
import {updateLocalPlaylist, updateCurrentVideo} from '../actions'
import {ADD_VIDEO, INIT_SOCKET, REMOVE_VIDEO, SELECT_VIDEO} from '../actions/types'
import _ from 'lodash'

let socket

export default url => ({getState, dispatch}) => next => action => {
  switch (action.type) {
    case INIT_SOCKET:
      socket = socketIO(url)
      socket.on('updateList', videos => {
        console.log('XDD')
        dispatch(updateLocalPlaylist(videos))
      })
      socket.on('updateVideo', currentVideo => {
        dispatch(updateCurrentVideo(currentVideo))
      })
      return
    case ADD_VIDEO:
      const playlist = getState().client.playlist
      if (!_.find(playlist, obj => obj.id === action.video.id)) {
        socket.emit('addVideo', action.video, action.addAsNext)
      }
      return
    case SELECT_VIDEO:
      socket.emit('selectVideo', action.video)
      return
    case REMOVE_VIDEO:
      socket.emit('removeVideo', action.video)
      return
    default:
      return next(action)
  }
}