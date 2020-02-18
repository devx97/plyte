import {
  UPDATE_SUGGESTED_VIDEOS,
  UPDATE_SOCKET,
  UPDATE_CURRENT_VIDEO,
  UPDATE_PLAYLIST,
  UPDATE_PLAYER_HEIGHT,
  UPDATE_MASTER
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PLAYLIST:
      return {...state, playlist: action.playlist}
    case UPDATE_SUGGESTED_VIDEOS:
      return {...state, suggestedVideos: action.videos}
    case UPDATE_SOCKET:
      return {...state, socket: action.socket}
    case UPDATE_CURRENT_VIDEO:
      const index = state.playlist.findIndex(i => i.id === action.video.id)
      return {...state, currentVideo: action.video, currentIndex: index ? index : 0}
    case UPDATE_PLAYER_HEIGHT:
      return {...state, playerHeight: action.height}
    case UPDATE_MASTER:
      return {...state, master: action.master}
    default:
      return state
  }
}