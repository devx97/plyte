import React, {useEffect, useRef, useState} from 'react'
import ReactPlayer from 'react-player'
import {Grid, Typography, Link, Button} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'

import {
  playNextVideo,
  updatePlayerHeight,
  changePlaybackSuccess, requestPlaybackUpdate, pauseVideo, playVideo
} from '../../actions'

const GENIUS_API_KEY = 'DncOPjHRnMOPSe3Yzl56lpCsIah0zalJ-u9UjhWetfuaZ_4lsaA6RYhDsZSTEkWK'

const generateGeniusSongURL = async title => {
  if (!title) {
    return ''
  }
  let geniusSongURL = ''
  let indexOfSecondQuotationMark = title.indexOf('"', title.indexOf('"') + 1) //some advanced searching algorithms XD
  if (indexOfSecondQuotationMark > 0) {
    title = title.substring(0, indexOfSecondQuotationMark + 1)
  } else if (title.indexOf(' ', title.indexOf('- ') + 2) > 0) {
    title = title.substring(0, title.indexOf(' ', title.indexOf('- ') + 2))
  } else {
    title = ''
  }
  if (title.length) {
    const res = await axios.get(
        `https://api.genius.com/search?q=${title}&access_token=${GENIUS_API_KEY}`)
    if (res.data.response.hits[0]) {
      geniusSongURL = res.data.response.hits[0].result.url
    }
  }
  return geniusSongURL
}

export default () => {
  const video = useSelector(state => state.player.currentVideo)
  const dispatch = useDispatch()
  const player = useRef()
  const playerHeight = useSelector(state => state.client.playerHeight)
  const [geniusURL, setGeniusURL] = useState('')
  const volume = useSelector(state => state.player.volume)
  const playback = useSelector(state => state.player.playback)
  const isPlaying = useSelector(state => state.player.isPlaying)
  const playerShouldBeUpdated = useSelector(state => state.player.playerShouldBeUpdated)

  useEffect(() => async () => {
    const URL = await generateGeniusSongURL(video && video.title)
    setGeniusURL(URL)
  }, [video])

  useEffect(() => {
    if (player && player.current && player.current.scrollHeight
        && player.current.scrollHeight !== playerHeight) {
      video && dispatch(updatePlayerHeight(player.current.scrollHeight))
    }
  }, [player, video, dispatch, playerHeight])

  useEffect(() => {
    const handleResize = () => {
      if (player && player.current && player.current.scrollHeight
          && player.current.scrollHeight !== playerHeight) {
        dispatch(updatePlayerHeight(player.current.scrollHeight))
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [player, dispatch, playerHeight])

  if (playerShouldBeUpdated && player.current) {
    player.current.seekTo(playback)
    dispatch(changePlaybackSuccess())
  }

  return !video
      ? null
      : <Grid item container direction="column" sm={12} md={8}>
        <Grid item className="video">
          <ReactPlayer
              ref={player}
              controls
              playing={isPlaying}
              onPause={() => dispatch(pauseVideo())}
              onPlay={() => dispatch(playVideo())}
              url={`https://www.youtube.com/watch?v=${video.id}`}
              onProgress={progress => {
                dispatch(requestPlaybackUpdate(progress.playedSeconds))
              }}
              config={{youtube: {playerVars: {autoplay: 1}}}}
              onEnded={() => dispatch(playNextVideo())}
              height={'100%'}
              width={'100%'}
              volume={volume / 100}
              style={{position: 'absolute', top: 0, left: 0}}
          />
        </Grid>
        <Grid container item justify="space-between" style={{paddingTop: 5}}>
          <Grid item>
            <Typography variant={'h6'}>{video.title}</Typography>
          </Grid>
          <Grid item>
            <Link href={geniusURL} target={'_blank'} underline={'none'}>
              <Button variant={'outlined'} size="small">
                Lyrics
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
}