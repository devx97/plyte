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
import {removeVideo, requestVideoChange} from '../../actions'
import {useDispatch} from 'react-redux'

export default ({video}) => {
  const dispatch = useDispatch()

  return <Paper>
    <ListItem style={{paddingTop: 0, paddingBottom: 0, marginTop: 2, marginBottom: 2}}
              key={video.id} button
              onClick={() => dispatch(requestVideoChange(video))}>
      <ListItemAvatar style={{paddingRight: 8}}>
        <Avatar style={{height: '50px', width: '70px'}} variant="square"
                src={video.thumbnailURL}
                alt={"Thumbnail"}/>
      </ListItemAvatar>
      <ListItemText disableTypography>
        <Typography variant="subtitle1" style={{height: '3.3em', overflow: 'hidden'}}
                    align="left">{video.title}</Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={() => dispatch(removeVideo(video))}
                    edge={'end'}><DeleteIcon/></IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </Paper>
}