import union from 'lodash/union'
import { combineReducers } from 'redux'

function allIds (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_CURRENT_USER':
      return union(state.allIds, [action.items.result])
  }

  return state
}

function byId (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_CURRENT_USER':
      return {
        ...state.byId,
        ...action.items.entities.users
      }
  }

  return state
}

function current (state = 'http://localhost:8000/users/1/', action) {
  return state
}

export function getCurrentUserUrl (state) {
  return state.current
}

export function getCurrentUser (state) {
  return state.byId[state.current]
}

export function getCurrentUserBundlesIds (state) {
  const user = getCurrentUser(state)
  return user ? user.bundles : []
}

export default combineReducers({
  current,
  byId,
  allIds
})
