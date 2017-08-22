import { combineReducers } from 'redux'

function authToken (state = null, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS_RESPONSE':
      return action.authToken
    case 'RECEIVE_AUTH_TOKEN_FROM_DISK':
      return action.authToken
  }

  return state
}

function isBootingUp (state = true, action) {
  switch (action.type) {
    case 'RECEIVE_AUTH_TOKEN_FROM_DISK':
      return false
    case 'AUTH_TOKEN_REQUEST_FROM_DISK_ERROR':
      return false
  }

  return state
}

export function getSignInStatus (state) {
  return !!state.authToken
}

export function getBootingUpStatus (state) {
  return state.isBootingUp
}

export default combineReducers({
  authToken,
  isBootingUp
})
