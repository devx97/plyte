import React, {useCallback, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {
  FastForward,
  FastRewind,
  Forward10, Forward30,
  Forward5, Replay10, Replay30, Replay5,
  VolumeDown,
  VolumeUp
} from '@material-ui/icons'
import {useDispatch, useSelector} from 'react-redux'
import ButtonBase from '@material-ui/core/ButtonBase'
import {Slider} from '@material-ui/core'
import {requestVolumeChange, updateVolume} from '../actions'
import {debounce} from 'lodash'

export default () => {
  const video = useSelector(state => state.player.currentVideo)
  const volume = useSelector(state => state.player.volume)
  const dispatch = useDispatch()

  const requestVolumeChangeDebounced = useCallback(debounce(value => {
    dispatch(requestVolumeChange(value))
  }, 300), [])

  return !video ? null : <React.Fragment>
    <Grid item>
      <Typography variant="h6" color="secondary">
        {video.title}
      </Typography>
    </Grid>

    <Grid item>
      <Grid container spacing={1}>
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
                requestVolumeChangeDebounced(value)
              }}
              value={volume} max={100}
          />
        </Grid>
        <Grid item>
          <ButtonBase onClick={() => dispatch(requestVolumeChange(volume + 10))}>
            <VolumeUp/>
          </ButtonBase>
        </Grid>
      </Grid>
    </Grid>

    <Grid item>
      <Grid container spacing={1}>
        <Grid item>
          <ButtonBase>
            <Replay10/>
          </ButtonBase>
        </Grid>
        <Grid item xs>
          <Slider aria-labelledby="continuous-slider"
                  marks={[{value: 0, label: '0:00'}, {value: 100, label: '5:00'}]}
                  defaultValue={50}
                  max={100}/>
        </Grid>
        <Grid item>
          <ButtonBase>
            <Forward10/>
          </ButtonBase>
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment>
}
