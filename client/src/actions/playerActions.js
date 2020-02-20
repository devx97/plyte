import {
  REQUEST_VOLUME_CHANGE,
  UPDATE_SERVER_PLAYBACK,
  UPDATE_CURRENT_VIDEO,
  UPDATE_VOLUME
} from './types'

export const updateCurrentVideo = video => ({
  type: UPDATE_CURRENT_VIDEO,
  video
})

export const updateVolume = volume => ({
  type: UPDATE_VOLUME,
  volume
})

export const requestVolumeChange = volume => ({
  type: REQUEST_VOLUME_CHANGE,
  volume
})

export const updateClientPlayback = serverPlayback => ({
  type: UPDATE_SERVER_PLAYBACK,
  serverPlayback
})

export const updateServerPlayback = serverPlayback => ({
  type: UPDATE_SERVER_PLAYBACK,
  serverPlayback
})