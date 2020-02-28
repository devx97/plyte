import React, {useEffect} from 'react'

import {createMuiTheme, CssBaseline, Paper} from '@material-ui/core'
import {ThemeProvider} from "@material-ui/styles";

import {useDispatch} from 'react-redux'
import {INIT_SOCKET} from './actions/types'
import Room from './pages/Room'

export default () => {
  const dispatch = useDispatch()
  useEffect(() => dispatch({type: INIT_SOCKET}))

  const theme = createMuiTheme({palette: {type: "dark"}})

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Paper style={{maxWidth: 1200, margin: '0 auto', padding: 5}} elevation={3}>
          <Room/>
        </Paper>
      </ThemeProvider>
  )
}