import {LOGIN, LOGIN_ERROR, LOGIN_ERROR_DISABLE, LOGIN_SUCCESS, UPDATE_AUTH} from './types'

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

export const logInError = message => ({
  type: LOGIN_ERROR,
  message
})
export const logInErrorDisable = () => ({
  type: LOGIN_ERROR_DISABLE,
})