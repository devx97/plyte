import {combineReducers} from 'redux'

import auth from './auth'
import client from './client'
import player from './player'

export default combineReducers({
  auth,
  client,
  player,
})