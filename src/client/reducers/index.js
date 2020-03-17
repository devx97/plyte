import {combineReducers} from 'redux'

import auth from './auth'
import client from './client'
import player from './player'
import alert from './alert'

export default combineReducers({
  auth,
  client,
  player,
  alert,
})