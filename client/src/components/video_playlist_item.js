import React from 'react'

const VideoListItem = ({video, onVideoSelect, onRemoveSelect}) => {
  const imageUrl = video.thumbnails.medium.url

  return (
    <div className="hover-button">
      <div className="columns is-mobile">
        <div className="column" onClick={() => onVideoSelect(video)}>
          <img className="clickable" src={imageUrl} alt="Thumbnail"/>
        </div>
        <div className="column is-7" onClick={() => onVideoSelect(video)}>
          <div className="title clickable">
            {video.title}
          </div>
        </div>
        <div className="column is-2 clickable" onClick={() => onRemoveSelect(video)}>
          <ion-icon className="trash-icon" name="trash"/>
        </div>
      </div>
    </div>
  )
}

export default VideoListItem