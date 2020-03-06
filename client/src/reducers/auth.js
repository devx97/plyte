import {LOGIN_ERROR, LOGIN_ERROR_DISABLE, UPDATE_AUTH} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_AUTH:
      return {...state, id: action.id, nickname: action.nickname}
    case LOGIN_ERROR:
      return {...state, loginError: action.message}
    case LOGIN_ERROR_DISABLE:
      return {...state, loginError: false}
    default:
      return state
  }
}