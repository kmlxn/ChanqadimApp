import { combineReducers } from 'redux'

const scenesInitialState = {
  categories: { isFetching: true },
  category: { isFetching: true },
  bundle: { isFetching: true },
  profile: { isFetching: true },
  editProfile: { isFetching: false },
  login: { isFetching: true },
  add: { isFetching: true }
}

function items (state = scenesInitialState, action) {
  switch (action.type) {
    case 'REQUEST_CATEGORY':
      return {
        ...state,
        category: { isFetching: true, url: action.url }
      }
    case 'RECEIVE_CATEGORY':
      return {
        ...state,
        category: { isFetching: false, url: action.items.entities.categories[action.items.result].url }
      }
    case 'REQUEST_BUNDLE':
      return {
        ...state,
        bundle: { isFetching: true, url: action.url }
      }
    case 'RECEIVE_BUNDLE':
      return {
        ...state,
        bundle: { isFetching: false, url: action.items.entities.bundles[action.items.result].url }
      }
    case 'RECEIVE_CURRENT_USER':
      return {
        ...state,
        profile: { isFetching: false }
      }
    case 'REQUEST_CURRENT_USER':
      return {
        ...state,
        profile: { isFetching: true }
      }
    case 'REQUEST_UPDATE_CURRENT_USER':
      return {
        ...state,
        editProfile: { isFetching: true }
      }
    case 'RECEIVE_UPDATE_CURRENT_USER':
      return {
        ...state,
        editProfile: { wasUpdateSuccessful: true, isFetching: false }
      }
  }

  return state
}

function current (state = 'categories', action) {
  if (action.type !== 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
    return state
  }

  switch (action.scene.sceneKey) {
    case 'main':
    case 'categories': return 'categories'
    case 'category': return 'category'
    case 'bundle': return 'bundle'
    case 'profile': return 'profile'
    case 'editProfile': return 'editProfile'
    case 'login': return 'login'
    case 'add': return 'add'
  }

  return state
}

export function getCurrentSceneItemUrl ({ scenes }) {
  return scenes.items[scenes.current].url
}

export function isCurrentSceneLoading (state) {
  return state.items[state.current].isFetching
}

export function isSceneLoading (state, key) {
  return state.items[key].isFetching
}

export function wasUpdateSuccessful (state, key) {
  return state.items[key].wasUpdateSuccessful
}

export default combineReducers({
  current,
  items
})
