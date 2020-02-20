import {combineReducers} from 'redux'

import client from './client'
import player from './player'

export default combineReducers({
  client,
  player
})