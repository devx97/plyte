import React, {Fragment, useEffect} from 'react'
import {Container, createMuiTheme, CssBaseline, Paper} from '@material-ui/core'
import {ThemeProvider} from "@material-ui/styles";
import {useDispatch, useSelector} from 'react-redux'

import {INIT_SOCKET} from './actions/types'
import Room from './pages/Room'
import LoginPage from './pages/LoginPage'
import Header from './components/layout/Header'
import {useRoutes} from 'react-router-dom'
import Rooms from './pages/Rooms'
import PasswordDialog from './components/utils/PasswordDialog'
import Alert from './components/utils/Alert'

export default () => {
  const nickname = useSelector(state => state.auth.nickname)
  const dispatch = useDispatch()
  useEffect(() => dispatch({type: INIT_SOCKET}), [])
  const theme = createMuiTheme({palette: {type: "dark"}})

  const routes = useRoutes([
    {path: 'rooms', element: <Rooms/>},
    {path: 'room/:id', element: <Room/>},
    {path: '*', redirectTo: '/rooms'}
  ])

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Alert/>
        {nickname
            ? <Fragment>
              <Header/>
              <Paper elevation={3}>
                <Container style={{padding: 0}}>
                  {routes}
                  <PasswordDialog/>
                </Container>
              </Paper>
            </Fragment>
            : <LoginPage/>}
      </ThemeProvider>
  )
}