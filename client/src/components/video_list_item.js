import React from 'react'

const VideoListItem = ({video, onVideoSelect, onVideoAdd}) => {
  const imageUrl = video.thumbnails.medium.url

  return (
    <div className="column hover-button">
      <div onClick={() => onVideoAdd(video)}>
        <img className="clickable" src={imageUrl} alt="Thumbnail"/>
      </div>
      <div onClick={() => onVideoSelect(video)} className="clickable">
        <div className="title">
          {video.title}
        </div>
      </div>
    </div>
  )
}

export default VideoListItem