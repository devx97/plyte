import {
  UPDATE_SUGGESTED_VIDEOS,
  UPDATE_SOCKET,
  UPDATE_PLAYLIST,
  UPDATE_PLAYER_HEIGHT,
  UPDATE_MASTER,
  UPDATE_ROOMS, UPDATE_CURRENT_ROOM
} from '../actions/types'

export default (state = {currentRoom: ''}, action) => {
  switch (action.type) {
    case UPDATE_PLAYLIST:
      return {...state, playlist: action.playlist}
    case UPDATE_SUGGESTED_VIDEOS:
      return {...state, suggestedVideos: action.videos}
    case UPDATE_SOCKET:
      return {...state, socket: action.socket}
    case UPDATE_PLAYER_HEIGHT:
      return {...state, playerHeight: action.height}
    case UPDATE_MASTER:
      return {...state, master: action.master}
    case UPDATE_ROOMS:
      return {...state, rooms: action.rooms}
    case UPDATE_CURRENT_ROOM:
      return {...state, currentRoom: action.roomId}
    default:
      return state
  }
}