import React, {useState} from 'react'
import {Button, FormGroup, Grid, TextField, Paper} from '@material-ui/core'
import {logIn,} from '../actions'
import {useDispatch} from 'react-redux'

export default () => {
  const [nickname, setNickName] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (nickname.trim().length) {
      dispatch(logIn(nickname.trim()))
    }
  }

  return (
      <Paper elevation={3}>
        <Grid container
              style={{minHeight: '30vh', maxWidth: 300, margin: '0 auto'}}
              justify="center"
              alignItems="center">
          <FormGroup>
            <TextField
                autoFocus
                label="Nickname"
                value={nickname}
                style={{paddingBottom: 5}}
                onChange={event => setNickName(event.target.value)}
                onKeyDown={event => {
                  if (event.keyCode === 13) {
                    handleSubmit()
                  }
                }}
            />
            <Button
                variant={'outlined'}
                onClick={handleSubmit}>
              Login
            </Button>
          </FormGroup>
        </Grid>
      </Paper>
  )
}