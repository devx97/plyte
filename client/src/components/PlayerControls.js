import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {
  Forward10, Pause, PlayArrow, Replay10, SkipNext, SkipPrevious, VolumeDown, VolumeUp
} from '@material-ui/icons'
import {useDispatch, useSelector} from 'react-redux'
import ButtonBase from '@material-ui/core/ButtonBase'
import {Slider} from '@material-ui/core'
import {
  pauseVideo, playVideo,
  requestPlaybackChange, requestVideoChange,
  requestVolumeChange,
  startSeeking,
  stopSeeking,
  updatePlayback,
  updateVolume
} from '../actions'

const getIndexOfFirstNumber = elapsed => {
  for (let i = 0; i < elapsed.length; i++) {
    if (elapsed[i] !== '0' && elapsed[i] !== ':') {
      return i
    }
  }
  return 0
}

export default () => {
  const video = useSelector(state => state.player.currentVideo)
  const isPlaying = useSelector(state => state.player.isPlaying)
  const volume = useSelector(state => state.player.volume)
  const playback = useSelector(state => state.player.playback) || 0
  const dispatch = useDispatch()
  let indexOfFirstNumber
  let duration
  let elapsed = new Date(1000 * Math.round(playback)).toISOString().substr(11, 8)

  if (video && video.duration) {
    duration = new Date(1000 * Math.round(video.duration || 0)).toISOString().substr(11, 8)
    indexOfFirstNumber = getIndexOfFirstNumber(duration)
    elapsed = elapsed.substr(indexOfFirstNumber, 8 - indexOfFirstNumber)
    duration = duration.substr(indexOfFirstNumber, 8 - indexOfFirstNumber)
  }

  return !video ? null : <React.Fragment>
    <Grid item>
      <Typography align="center" variant="h6" color="secondary">
        {video.title}
      </Typography>
    </Grid>

    <Grid item container spacing={1} justify="center" alignItems="center">
      <Grid item>
        <ButtonBase onClick={() => {
          dispatch(requestVideoChange(-1))
        }}>
          <SkipPrevious/>
        </ButtonBase>
      </Grid>
      <Grid item>
        <ButtonBase>
          {isPlaying
              ? <Pause onClick={() => dispatch(pauseVideo())} fontSize="large"/>
              : <PlayArrow onClick={() => dispatch(playVideo())} fontSize="large"/>}
        </ButtonBase>
      </Grid>
      <Grid item>
        <ButtonBase onClick={() => {
          dispatch(requestVideoChange(1))
        }}>
          <SkipNext/>
        </ButtonBase>
      </Grid>
    </Grid>

    <Grid item container spacing={1}>
      <Grid item>
        <ButtonBase onClick={() => dispatch(requestVolumeChange(volume - 10))}>
          <VolumeDown/>
        </ButtonBase>
      </Grid>
      <Grid item xs>
        <Slider
            step={5}
            valueLabelDisplay="auto"
            aria-labelledby="discrete-slider"
            onChange={(event, value) => {
              dispatch(updateVolume(value))
            }}
            onMouseUp={() => dispatch(requestVolumeChange(volume))}
            value={volume} max={100}
        />
      </Grid>
      <Grid item>
        <ButtonBase onClick={() => dispatch(requestVolumeChange(volume + 10))}>
          <VolumeUp/>
        </ButtonBase>
      </Grid>
    </Grid>

    <Grid item container spacing={1}>
      <Grid item>
        <ButtonBase onClick={() => dispatch(requestPlaybackChange(playback - 10))}>
          <Replay10/>
        </ButtonBase>
      </Grid>
      <Grid item xs>
        <Slider aria-labelledby="continuous-slider"
                marks={[
                  {value: 0, label: elapsed},
                  {value: video.duration, label: duration}
                ]}
                value={playback}
                step={1}
                onChange={(event, value) => dispatch(updatePlayback(value))}
                onMouseDown={() => dispatch(startSeeking())}
                onMouseUp={() => {
                  dispatch(requestPlaybackChange(playback))
                  dispatch(stopSeeking())
                }}
                max={video.duration}/>
      </Grid>
      <Grid item>
        <ButtonBase onClick={() => dispatch(requestPlaybackChange(playback + 10))}>
          <Forward10/>
        </ButtonBase>
      </Grid>
    </Grid>
  </React.Fragment>
}
