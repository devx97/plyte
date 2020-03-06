import React, {Fragment, useEffect} from 'react'

import {Container, createMuiTheme, CssBaseline, Paper} from '@material-ui/core'
import {ThemeProvider} from "@material-ui/styles";

import {useDispatch, useSelector} from 'react-redux'
import {INIT_SOCKET} from './actions/types'
import Room from './pages/Room'
import LoginPage from './pages/LoginPage'
import Header from './components/layout/Header'
import {Route, Routes} from 'react-router-dom'
import Rooms from './pages/Rooms'

export default () => {
  const nickname = useSelector(state => state.auth.nickname)
  const dispatch = useDispatch()
  useEffect(() => dispatch({type: INIT_SOCKET}))

  const theme = createMuiTheme({palette: {type: "dark"}})

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {nickname
            ? <Fragment>
              <Header/>
              <Paper elevation={3}>
                <Container style={{padding: 0}}>
                  <Routes>
                    <Route path={'/'} element={<Rooms/>}/>
                    <Route path={'/room'} element={<Room/>}/>
                  </Routes>
                </Container>
              </Paper>
            </Fragment>
            : <LoginPage/>}
      </ThemeProvider>
  )
}