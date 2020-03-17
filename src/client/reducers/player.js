import {
  UPDATE_PLAYBACK,
  UPDATE_CURRENT_VIDEO,
  UPDATE_VOLUME,
  UPDATE_PLAYER,
  UPDATE_PLAYER_SUCCESS,
  STOP_SEEKING,
  START_SEEKING,
  UPDATE_PLAYER_STATE
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_VOLUME:
      return {...state, volume: action.volume}
    case UPDATE_PLAYER_STATE:
      const {playerState} = action
      return {...state,
        volume: playerState.volume,
        playback: playerState.playback,
        isPlaying: playerState.isPlaying
      }
    case UPDATE_CURRENT_VIDEO:
      return {...state, currentVideo: action.video}
    case UPDATE_PLAYBACK:
      return {...state, playback: action.playback}
    case UPDATE_PLAYER:
      return {...state, playerShouldBeUpdated: true}
    case UPDATE_PLAYER_SUCCESS:
      return {...state, playerShouldBeUpdated: false}
    case START_SEEKING:
      return {...state, seeking: true}
    case STOP_SEEKING:
      return {...state, seeking: false}
    default:
      return state
  }
}