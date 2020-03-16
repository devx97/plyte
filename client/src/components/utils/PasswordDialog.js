import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'

export default () => {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Password</DialogTitle>
    <DialogContent>
      <TextField
          autoFocus
          margin="dense"
          label="Password"
          inputProps={{style: {WebkitTextSecurity: 'disc'}}}
          fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleClose} color="primary">
        Join
      </Button>
    </DialogActions>
  </Dialog>
}