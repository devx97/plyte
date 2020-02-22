import {
  UPDATE_SUGGESTED_VIDEOS,
  UPDATE_CURRENT_VIDEO,
  UPDATE_PLAYLIST,
  ADD_VIDEO,
  REMOVE_VIDEO,
  UPDATE_PLAYER_HEIGHT, UPDATE_MASTER, SELECT_VIDEO, REQUEST_NEXT_VIDEO, REQUEST_PLAYBACK_CHANGE
} from './types'

import axios from 'axios'
import querystring from 'querystring'
import moment, {ISO_8601} from 'moment'

const YOUTUBE_API_KEY = 'AIzaSyCVdT6xJMmub0pTiQfRJLOP0r-K3r9vpnE'

const YouTubeSearchAPI = 'https://www.googleapis.com/youtube/v3/search?'
const YouTubeVideosAPI = 'https://www.googleapis.com/youtube/v3/videos?'

export const searchForVideos = ({term, id}) => async dispatch => {
  try {
    const opts = {
      q: term,
      maxResults: 6,
      type: 'video',
      key: YOUTUBE_API_KEY,
      part: 'snippet'
    }
    if (id) {
      opts.relatedToVideoId = id
    }
    let response = await axios.get(YouTubeSearchAPI + querystring.stringify(opts))
    let videos = response.data.items
    videos = videos.map(video => {
      const formattedVideo = {}
      let parsedTitleEl = new DOMParser().parseFromString(video.snippet.title, "text/html");
      formattedVideo.title = parsedTitleEl.documentElement.textContent
      formattedVideo.id = video.id.videoId
      formattedVideo.thumbnailURL = video.snippet.thumbnails.medium.url
      return formattedVideo
    })
    dispatch(updateSuggestedVideos(videos.slice(0, 5)))
  } catch (e) {
    console.log(e)
  }
}

const getDetailsAboutVideo = async id => {
  const opts = {
    id,
    part: 'contentDetails',
    key: YOUTUBE_API_KEY
  }
  let response = await axios.get(YouTubeVideosAPI + querystring.stringify(opts))
  return response.data.items[0].contentDetails
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

export const playNextVideo = () => ({
  type: REQUEST_NEXT_VIDEO
})

export const addVideo = (video, addAsNext) => dispatch => {
  dispatch(searchForVideos({id: video.id}))
  dispatch({
    type: ADD_VIDEO,
    video,
    addAsNext
  })
}

export const addSelectedVideo = (video, addAsNext) => async dispatch => {
  const details = await getDetailsAboutVideo(video.id)
  video.duration = moment.duration(details.duration, ISO_8601).asSeconds()
  dispatch(addVideo(video, addAsNext))
}

export const addFirstVideo = () => (dispatch, getState) => {
  try {
    const video = getState().client.suggestedVideos[0]
    dispatch(addVideo(video))
  } catch (e) {
    console.log(
        'You haven\'t searched for videos but still you want to add first one with Enter key')
  }
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
  dispatch({
    type: UPDATE_MASTER,
    master: !getState().client.master
  })
}

export const requestVideoChange = video => ({
  type: SELECT_VIDEO,
  video
})

export const requestPlaybackChange = playback => ({
  type: REQUEST_PLAYBACK_CHANGE,
  playback
})