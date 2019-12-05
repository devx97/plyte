import React from 'react'
import VideoPlaylistItem from './video_playlist_item'

const VideoPlaylist = ({playlist, onRemoveSelect, onVideoSelect}) =>
    playlist.map(video => {
      return <VideoPlaylistItem
          onRemoveSelect={onRemoveSelect}
          onVideoSelect={onVideoSelect}
          key={video.id}
          video={video}/>
    })

export default VideoPlaylist