import {UPDATE_AUTH} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_AUTH:
      return {...state, id: action.id, nickname: action.nickname}
    default:
      return state
  }
}