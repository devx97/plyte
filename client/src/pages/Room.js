import React, {Fragment} from 'react'

import {Grid} from '@material-ui/core'
import {useSelector} from 'react-redux'

import SearchBar from '../components/utils/SearchBar'
import VideoList from '../components/videos/SuggestedVideos'
import VideoPlaylist from '../components/videos/Playlist'
import VideoDetail from '../components/videos/VideoDetails'
import HostButton from '../components/utils/HostButton'
import PlayerControls from '../components/player/PlayerControls'
// import {useRouteMatch} from 'react-router-dom'

export default () => {
  const master = useSelector(state => state.client.master)
  // const match = useRouteMatch()

  return (
      <Fragment>
        <Grid item container justify="center" direction="column"
              style={{maxWidth: '400px', margin: '0 auto'}}>
          {!master && <PlayerControls/>}
        </Grid>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <SearchBar/>
          </Grid>
          <Grid item>
            <HostButton/>
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
      </Fragment>
  )
}