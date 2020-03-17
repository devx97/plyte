import {
  REQUEST_VOLUME_CHANGE,
  UPDATE_PLAYBACK,
  UPDATE_CURRENT_VIDEO,
  UPDATE_VOLUME,
  UPDATE_PLAYER_SUCCESS,
  REQUEST_PLAYBACK_CHANGE,
  REQUEST_PLAYBACK_UPDATE,
  UPDATE_PLAYER, START_SEEKING, STOP_SEEKING, UPDATE_PLAYER_STATE, PLAY_VIDEO, PAUSE_VIDEO
} from './types'

export const updateCurrentVideo = video => ({
  type: UPDATE_CURRENT_VIDEO,
  video
})

export const updateVolume = volume => ({
  type: UPDATE_VOLUME,
  volume
})

export const updatePlayerState = playerState => ({
  type: UPDATE_PLAYER_STATE,
  playerState
})

export const requestVolumeChange = volume => ({
  type: REQUEST_VOLUME_CHANGE,
  volume
})

export const updatePlayback = playback => ({
  type: UPDATE_PLAYBACK,
  playback
})

export const changePlayback = () => ({
  type: UPDATE_PLAYER
})

export const changePlaybackSuccess = () => ({
  type: UPDATE_PLAYER_SUCCESS,
})

export const requestPlaybackUpdate = playback => ({
  type: REQUEST_PLAYBACK_UPDATE,
  playback
})

export const requestPlaybackChange = playback => ({
  type: REQUEST_PLAYBACK_CHANGE,
  playback
})

export const startSeeking = () => ({
  type: START_SEEKING
})

export const stopSeeking = () => ({
  type: STOP_SEEKING
})

export const playVideo = () => ({
  type: PLAY_VIDEO
})

export const pauseVideo = () => ({
  type: PAUSE_VIDEO
})