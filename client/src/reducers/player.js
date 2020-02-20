import {
  UPDATE_SERVER_PLAYBACK,
  UPDATE_CLIENT_PLAYBACK,
  UPDATE_CURRENT_VIDEO,
  UPDATE_VOLUME
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_VOLUME:
      return {...state, volume: action.volume}
    case UPDATE_CURRENT_VIDEO:
      return {...state, currentVideo: action.video}
    case UPDATE_CLIENT_PLAYBACK:
      return {...state, clientPlayback: action.clientPlayback}
    case UPDATE_SERVER_PLAYBACK:
      return {...state, serverPlayback: action.serverPlayback}
    default:
      return state
  }
}