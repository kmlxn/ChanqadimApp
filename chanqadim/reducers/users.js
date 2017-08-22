import union from 'lodash/union'
import mapValues from 'lodash/mapValues'

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
        ...state,
        ...action.items.entities.users
      }
    case 'RECEIVE_UPDATE_CURRENT_USER':
      return mapValues(state, value => user(value, action))
  }

  return state
}

function current (state = null, action) {
  switch (action.type) {
    case 'RECEIVE_CURRENT_USER':
      return action.items.result
  }

  return state
}

function user (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_UPDATE_CURRENT_USER':
      if (!(state.url in action.items.entities.users)) {
        return state
      }

      const newState = action.items.entities.users[state.url]

      return {...state, ...newState}
  }
}

export function getCurrentUserUrl (state) {
  return state.current
}

export function getCurrentUser (state) {
  return state.current ? state.byId[state.current] : {}
}

export function getCurrentUserBundlesIds (state) {
  const user = getCurrentUser(state)
  const bundlesIds = user && user.bundles

  return bundlesIds || []
}

export function getSignInStatus (state) {
  return !!state.current
}

export default combineReducers({
  current,
  byId,
  allIds
})
