import React from 'react'
import YouTube from 'react-youtube'

const VideoDetail = ({geniusSongUrl, video, onVideoEnds}) => {
  if (!video) return <div className="column is-two-thirds"/>
  const videoId = video.id

  return (
    <div className="column is-two-thirds">
      <div className="video">
        <YouTube
          opts={{playerVars: {autoplay: 1}}}
          videoId={videoId}
          onStateChange={event => onVideoEnds(video, event)}
        />
      </div>
      <div className="columns details is-mobile flex-container">
        <div className="column is-10 mainTitle">{video.title}</div>
        <a className="column is-2 button flex-item flex-container" href={geniusSongUrl} target={'_blank'}>
          <div className="flex-item">Lyrics</div>
        </a>
      </div>
    </div>
  )
}

export default VideoDetail