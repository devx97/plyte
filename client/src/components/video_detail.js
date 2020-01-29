import React from 'react'
import YouTube from 'react-youtube'
import {Grid, Typography} from '@material-ui/core'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'

const VideoDetail = ({geniusSongUrl, video, onVideoEnds}) => {
  if (!video) {
    return <div className="column is-two-thirds"/>
  }
  const videoId = video.id

  return (
      <Grid item container direction="column" sm={12} md={8}>
        <Grid item className="video">
          <YouTube
              opts={{
                playerVars: {autoplay: 1},
              }}
              videoId={videoId}
              onStateChange={event => onVideoEnds(video, event)}
          />
        </Grid>
        <Grid container item justify="space-between" style={{paddingTop: 5}}>
          <Grid item>
            <Typography variant={'h6'}>{video.title}</Typography>
          </Grid>
          <Grid item>
            <Link href={geniusSongUrl} target={'_blank'} underline={'none'}>
              <Button variant={'outlined'} size="small">
                Lyrics
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
  )
}

export default VideoDetail