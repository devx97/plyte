import React from 'react'
import {Snackbar} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import {disableAlert} from '../../actions'
import {useDispatch, useSelector} from 'react-redux'

export default () => {
  const dispatch = useDispatch()
  const active = useSelector(state => state.alert.active)
  const message = useSelector(state => state.alert.message)
  const alertType = useSelector(state => state.alert.alertType)

  const handleClose = (event, reason) => {
    dispatch(disableAlert())
  }

  return <Snackbar
      open={active}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
  >
    <Alert elevation={6}
           variant="filled"
           onClose={handleClose}
           severity={alertType}>
      {message}
    </Alert>
  </Snackbar>
}