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
  const currentRoom = useSelector(state => state.client.currentRoom)

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
        <Tab label={'Rooms'} component={Link} to={'/rooms'} value={'/rooms'}/>
        <Tab label={`Room ${currentRoom}`} component={Link} to={`/room/${currentRoom}`}
             value={`/room/${currentRoom}`}/>
        <Extender/>
        <Tab label={"Profile"}
             onClick={event => console.log(event.target.value)}
             value={`/${nickname}`}/>
      </Tabs>
    </Container>
  </AppBar>
}