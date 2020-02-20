import React, {useEffect} from 'react'

import {createMuiTheme, CssBaseline, Grid, Paper, Typography} from '@material-ui/core'
import {ToggleButton} from '@material-ui/lab'
import {CheckBox, CheckBoxOutlineBlank} from '@material-ui/icons'
import {ThemeProvider} from "@material-ui/styles";

import SearchBar from './SearchBar'
import VideoList from './VideoList'
import VideoPlaylist from './VideoPlaylist'
import VideoDetail from './VideoDetail'
import {useDispatch, useSelector} from 'react-redux'
import {INIT_SOCKET} from '../actions/types'
import {updateMaster} from '../actions'
import PlayerControls from './PlayerControls'

const App = () => {
  const master = useSelector(state => state.client.master)
  const dispatch = useDispatch()
  useEffect(() => dispatch({type: INIT_SOCKET}))

  const theme = createMuiTheme({palette: {type: "dark"}})

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Paper style={{maxWidth: 1200, margin: '0 auto', padding: 5}} elevation={3}>
          <Grid item container justify="center" direction="column"
                style={{maxWidth: '400px', margin: '0 auto'}}>
            {!master && <PlayerControls/>}
          </Grid>

          <Grid container alignItems="center" justify="center">
            <Grid item>
              <SearchBar/>
            </Grid>
            <Grid item>
              <ToggleButton
                  value="check"
                  selected={master}
                  size={'small'}
                  onChange={() => dispatch(updateMaster())}
              >
                <Typography variant="subtitle2">
                  Host
                </Typography>
                {master
                    ? <CheckBox fontSize="small" color="primary"/>
                    : <CheckBoxOutlineBlank fontSize="small"/>}
              </ToggleButton>
            </Grid>
          </Grid>

          <Grid container direction="row" justify="space-evenly"
                alignItems="stretch" spacing={1}>
            <VideoList/>
          </Grid>

          <Grid container style={{overflow: 'hidden', paddingTop: 16}} justify="center">
            {master && <VideoDetail/>}
            <VideoPlaylist/>
          </Grid>
        </Paper>
      </ThemeProvider>
  )
}

export default App