import React from 'react'
import VideoListItem from './video_list_item'
import {Box} from '@material-ui/core'
import {useSelector} from 'react-redux'

export default () => {
  const videos = useSelector(state => state.client.suggestedVideos)

  return videos && videos.length
      ? videos.map(video =>
          <VideoListItem
              key={video.id}
              video={video}
          />)
      : <Box>
        Click the title to play the video<br/>
        Click the thumbnail to add to the playlist
      </Box>
}