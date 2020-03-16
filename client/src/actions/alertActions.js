import {DISABLE_ALERT, NEW_ALERT} from './types'

export const newAlert = (message, alertType) => ({
  type: NEW_ALERT,
  message,
  alertType
})

export const disableAlert = () => ({
  type: DISABLE_ALERT,
})