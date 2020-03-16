import {LOGIN, NEW_ALERT, DISABLE_ALERT, LOGIN_SUCCESS, UPDATE_AUTH} from './types'

export const logInSuccess = id => ({
  type: LOGIN_SUCCESS,
  id
})

export const logIn = nickname => ({
  type: LOGIN,
  nickname
})

export const updateAuth = ({id, nickname}) => ({
  type: UPDATE_AUTH,
  id,
  nickname
})
