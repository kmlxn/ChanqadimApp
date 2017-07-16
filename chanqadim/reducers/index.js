import union from 'lodash/union'
import { combineReducers } from 'redux'

import products from './products'
import users, * as fromUsers from './users'
import bundles, { getBundles } from './bundles'
import scenes, * as fromScenes from './scenes'

function categories (state = {}, action) {
  switch (action.type) {
    case 'REQUEST_CATEGORIES':
      return { ...state, isFetching: true }

    case 'RECEIVE_CATEGORIES':
      return {
        byId: action.items.entities.categories,
        allIds: action.items.result,
        isFetching: false
      }

    case 'REQUEST_CATEGORY':
      return state

    case 'RECEIVE_CATEGORY':
      return {
        byId: {...state.byId, ...action.items.entities.categories},
        allIds: union(state.allIds, [action.items.result])
      }

    default:
      return state
  }
}

const reducers = combineReducers({
  categories,
  bundles,
  products,
  scenes,
  users
})

export default reducers

export function getCurrentUserBundles ({ bundles, users }) {
  const bundlesIds = fromUsers.getCurrentUserBundlesIds(users)
  return getBundles(bundles, bundlesIds)
}

export function getCurrentUser ({ users }) {
  return fromUsers.getCurrentUser(users)
}

export function isCurrentSceneLoading ({ scenes }) {
  return fromScenes.isCurrentSceneLoading(scenes)
}

export function isSceneLoading ({ scenes }, key) {
  return fromScenes.isSceneLoading(scenes, key)
}
