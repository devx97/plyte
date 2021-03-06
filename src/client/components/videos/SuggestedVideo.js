import React from 'react'
import {Grid, Paper, ButtonBase, Typography} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {addSelectedVideo} from '../../actions'

export default ({video}) => {
  const dispatch = useDispatch()

  return <Grid item container direction="column" xs>
    <Paper elevation={2}>
      <Grid item>
        <ButtonBase onClick={() => dispatch(addSelectedVideo(video))}>
          <img src={video.thumbnailURL} alt="Thumbnail"
               style={{
                 margin: '2px',
                 maxWidth: '100%',
                 maxHeight: '100%'
               }}
          />
        </ButtonBase>
      </Grid>
      <Grid item>
        <ButtonBase onClick={() => dispatch(addSelectedVideo(video, true))}>
          <Typography variant="subtitle1" style={{height: '3.3em', overflow: 'hidden'}}
                      align="left">
            {video.title}
          </Typography>
        </ButtonBase>
      </Grid>
    </Paper>
  </Grid>
}