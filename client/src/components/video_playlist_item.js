import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItem,
  Typography,
  Paper
} from '@material-ui/core'

const VideoListItem = ({video, onVideoSelect, onRemoveSelect}) => {
  const imageUrl = video.thumbnails.medium.url

  return (
      <Paper>
        <ListItem style={{paddingTop: 0, paddingBottom: 0, marginTop: 2, marginBotom: 2}} key={video.id} button
                  onClick={() => onVideoSelect(video)}>
          <ListItemAvatar style={{paddingRight: 8}}>
            <Avatar style={{height: '50px', width: '70px'}} variant="square" src={imageUrl}
                    alt={"Thumbnail"}/>
          </ListItemAvatar>
          <ListItemText disableTypography>
            <Typography variant="subtitle1" style={{height: '3.3em', overflow: 'hidden'}}
                        align="left">{video.title}</Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton onClick={() => onRemoveSelect(video)}
                        edge={'end'}><DeleteIcon/></IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
  )
}

export default VideoListItem