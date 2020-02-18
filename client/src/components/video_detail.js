import React, {useEffect, useRef, useState} from 'react'
import YouTube from 'react-youtube'
import {Grid, Typography, Link, Button} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'

import {playNextVideo, updatePlayerHeight} from '../actions'

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
    console.log(res)
    if (res.data.response.hits[0]) {
      geniusSongURL = res.data.response.hits[0].result.url
    }
  }
  return geniusSongURL
}

export default () => {
  const video = useSelector(state => state.client.currentVideo)
  const dispatch = useDispatch()
  const player = useRef(null)
  const [geniusURL, setGeniusURL] = useState('')

  useEffect(() => async () => {
    const URL = await generateGeniusSongURL(video && video.title)
    setGeniusURL(URL)
  }, [video])

  useEffect(() => {
    const handleResize = () => {
      dispatch(updatePlayerHeight(player && player.current.scrollHeight))
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [player])

  return !video
      ? null
      : <Grid item container direction="column" sm={12} md={8}>
        <Grid ref={player} item className="video">
          <YouTube
              opts={{playerVars: {autoplay: 1}}}
              videoId={video.id}
              onStateChange={event => {
                // eslint-disable-next-line
                if (event.data === YT.PlayerState.ENDED) {
                  dispatch(playNextVideo())
                }
              }}
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