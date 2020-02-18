import YouTubeSearch from 'youtube-search'
import {
  UPDATE_SUGGESTED_VIDEOS,
  UPDATE_CURRENT_VIDEO,
  UPDATE_PLAYLIST,
  ADD_VIDEO,
  REMOVE_VIDEO,
  UPDATE_PLAYER_HEIGHT, UPDATE_MASTER
} from './types'

const YOUTUBE_API_KEY = 'AIzaSyAyfE1ZVDNN4TzrsqNAAeV_m3vaISoUG8E'

export const searchForVideos = (term, videoId) => async dispatch => {
  try {
    const opts = {
      maxResults: 6,
      type: 'video',
      key: YOUTUBE_API_KEY
    }
    if (videoId) {
      opts.relatedToVideoId = videoId
    }
    let response = await YouTubeSearch(term, opts)

    let videos = response.results
    videos.map(video => {
      let parsedTitleEl = new DOMParser().parseFromString(video.title, "text/html");
      video.title = parsedTitleEl.documentElement.textContent
      return video
    })
    dispatch(updateSuggestedVideos(videos.slice(0, 5)))
  } catch (e) {
    console.log(e)
  }
}

const updateSuggestedVideos = videos => ({
  type: UPDATE_SUGGESTED_VIDEOS,
  videos
})

export const updateLocalPlaylist = playlist => ({
  type: UPDATE_PLAYLIST,
  playlist
})

export const updateCurrentVideo = video => ({
  type: UPDATE_CURRENT_VIDEO,
  video
})

export const playNextVideo = () => (dispatch, getState) => {
  const state = getState()
  const playlist = state.client.playlist
  const currentVideo = state.client.currentVideo
  const index = playlist.findIndex(i => i.id === currentVideo.id)
  if (playlist[index + 1]) {
    dispatch({
      type: UPDATE_CURRENT_VIDEO,
      video: playlist[index + 1]
    })
  }
}

export const addVideo = (video, addAsNext) => dispatch => {
  dispatch(searchForVideos('', video.id))
  dispatch({
    type: ADD_VIDEO,
    video,
    addAsNext
  })
}

export const removeVideo = video => ({
  type: REMOVE_VIDEO,
  video
})

export const updatePlayerHeight = height => ({
  type: UPDATE_PLAYER_HEIGHT,
  height
})

export const updateMaster = () => (dispatch, getState) => {
  const state = getState()
  dispatch({
    type: UPDATE_MASTER,
    master: !state.client.master
  })
}