import React from 'react'
import VideoListItem from './video_list_item'

const VideoList = ({videos, onVideoAdd, onVideoSelect}) => {
  if (!videos.length)
    return <div className="loading">Click the title to play the video<br/>Click the thumbnail to add to the playlist
    </div>

  const videoItems = videos.map(video => {
    return <VideoListItem
      onVideoAdd={onVideoAdd}
      onVideoSelect={onVideoSelect}
      key={video.id}
      video={video}/>
  })

  return (
    <div className="columns is-mobile video-list">
      {videoItems}
    </div>
  )
}

export default VideoList