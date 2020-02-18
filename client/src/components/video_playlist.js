import React from 'react'
import VideoPlaylistItem from './video_playlist_item'
import {List, Grid} from '@material-ui/core'
import {useSelector} from 'react-redux'

export default () => {
  const playlist = useSelector(state => state.client.playlist)
  const playerHeight = useSelector(state => state.client.playerHeight)
  const master = useSelector(state => state.client.master)
  console.log(window.innerHeight)

  return !playlist
      ? null
      : <Grid item xs={12} sm={12} md={4}
              style={{
                overflowY: 'auto',
                maxHeight: master && window.innerWidth >= 960 && playerHeight
              }}>
        <List style={{paddingTop: 0, paddingBottom: 0}}>
          {playlist.map(video => {
            return <VideoPlaylistItem
                key={video.id}
                video={video}/>
          })}
        </List>
      </Grid>
}