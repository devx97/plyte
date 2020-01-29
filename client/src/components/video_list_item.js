import React from 'react'
import {Grid, Paper, ButtonBase, Typography} from '@material-ui/core'

const VideoListItem = ({video, onVideoSelect, onVideoAdd}) => {
  const imageUrl = video.thumbnails.medium.url

  return (
      <Grid item container direction="column" xs>
        <Paper elevation={2}>
          <Grid item>
            <ButtonBase onClick={() => onVideoAdd(video)}>
              <img src={imageUrl} alt="Thumbnail"
                   style={{
                     margin: '2px',
                     maxWidth: '100%',
                     maxHeight: '100%'
                   }}
              />
            </ButtonBase>
          </Grid>
          <Grid item>
            <ButtonBase onClick={() => onVideoSelect(video)}>
              <Typography variant="subtitle1" style={{height: '3.3em', overflow: 'hidden'}} align="left">
                {video.title}
              </Typography>
            </ButtonBase>
          </Grid>
        </Paper>
      </Grid>
  )
}

export default VideoListItem