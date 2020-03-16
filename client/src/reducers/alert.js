import {NEW_ALERT, DISABLE_ALERT} from '../actions/types'

export default (state = {}, {type, message, alertType}) => {
  switch (type) {
    case NEW_ALERT:
      return {...state, message, alertType, active: true}
    case DISABLE_ALERT:
      return {...state, active: false}
    default:
        return state
  }
}