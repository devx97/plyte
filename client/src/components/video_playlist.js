import React from 'react'
import VideoPlaylistItem from './video_playlist_item'
import Grid from '@material-ui/core/Grid'
import {List} from '@material-ui/core'

const VideoPlaylist = ({playlist, onRemoveSelect, onVideoSelect, playerHeight}) => {
  return <Grid item xs={12} sm={12} md={4} justify="flex-start" direction="column"
               style={{overflowY: 'auto', maxHeight: playerHeight || '500px'}}>
    <List style={{paddingTop: 0, paddingBottom: 0}}>
      {playlist.map(video => {
        return <VideoPlaylistItem
            onRemoveSelect={onRemoveSelect}
            onVideoSelect={onVideoSelect}
            key={video.id}
            video={video}/>
      })}
    </List>
  </Grid>
}

export default VideoPlaylist