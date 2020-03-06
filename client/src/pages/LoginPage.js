import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper'
import {FormGroup, Snackbar, TextField} from '@material-ui/core'
import {logIn, logInErrorDisable} from '../actions'
import {useDispatch, useSelector} from 'react-redux'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert';

export default () => {
  const [nickname, setNickName] = useState('')
  const error = useSelector(state => state.auth.loginError)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (nickname.trim().length) {
      dispatch(logIn(nickname.trim()))
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(logInErrorDisable());
  };

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
            <Snackbar
                open={!!error}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
              <Alert elevation={6}
                     variant="filled"
                     onClose={handleClose}
                     severity="error">
                {error}
              </Alert>
            </Snackbar>
          </FormGroup>
        </Grid>
      </Paper>
  )
}