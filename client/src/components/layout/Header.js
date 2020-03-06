import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import {Container, Tabs} from '@material-ui/core'
import {Link, useLocation} from 'react-router-dom'
import Tab from '@material-ui/core/Tab'
import {useSelector} from 'react-redux'

const Extender = () => <div style={{flexGrow: 1}}/>

export default () => {
  const [value, setValue] = useState(0)
  const nickname = useSelector(state => state.auth.nickname)

  const location = useLocation()
  if (value !== location.pathname) {
    setValue(location.pathname)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return <AppBar position="sticky">
    <Container style={{maxWidth: 1200, padding: 0}}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label={'Menu'} component={Link} to={'/'} value={'/'}/>
        <Tab label={'Room'} component={Link} to={'room'} value={'/room'}/>
        <Extender/>
        <Tab label={nickname} component={Link} to={nickname} value={`/${nickname}`}/>
      </Tabs>
    </Container>
  </AppBar>
}