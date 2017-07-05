import { combineReducers } from 'redux'
import union from 'lodash/union'

import products from './products'

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

const scenesInitialState = {
  categories: {},
  category: {},
  bundle: {},
  profile: {},
  editProfile: {},
  login: {},
  add: {}
}

function scenes (state = scenesInitialState, action) {
  switch (action.type) {
    case 'REQUEST_CATEGORY':
      return {
        ...state,
        category: {isFetching: true, url: action.url}
      }
    case 'RECEIVE_CATEGORY':
      return {
        ...state,
        category: {isFetching: false, url: action.items.entities.categories[action.items.result].url}
      }
    case 'REQUEST_BUNDLE':
      return {
        ...state,
        bundle: {isFetching: true, url: action.url}
      }
    case 'RECEIVE_BUNDLE':
      return {
        ...state,
        bundle: {isFetching: false, url: action.items.entities.bundles[action.items.result].url}
      }
  }

  return state
}

function activeScene (state = 'categories', action) {
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

export function getCurrentSceneItemUrl (state) {
  return state.scenes[state.activeScene].url
}

export function isCurrentSceneLoading (state) {
  return state.scenes[state.activeScene].isFetching
}

function bundles (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_CATEGORY':
      return {
        ...state,
        byId: bundlesById(state.byId, action),
        allIds: bundlesAllIds(state.allIds, action)
      }
    case 'REQUEST_BUNDLE':
      return state
    case 'RECEIVE_BUNDLE':
      return {
        ...state,
        byId: bundlesById(state.byId, action),
        allIds: bundlesAllIds(state.allIds, action)
      }
    default:
      return state
  }
}

export function getBundle (bundles, url) {
  return bundles.byId[url]
}

export function getActiveCategoryBundles ({bundles, categories, scenes}) {
  const activeCategoryUrl = scenes.category.url
  const activeCategory = categories.byId[activeCategoryUrl]

  return activeCategory && activeCategory.bundles && activeCategory.bundles.map(id => bundles.byId[id])
}

function bundlesById (state = {}, action) {
  if (action.items.entities.bundles) {
    return {
      ...state,
      ...action.items.entities.bundles
    }
  }

  return state
}

function bundlesAllIds (state = [], action) {
  if (action.items.entities.bundles) {
    return union(state, Object.keys(action.items.entities.bundles))
  }

  return state
}

const reducers = combineReducers({
  categories,
  bundles,
  products,
  scenes,
  activeScene
})

export default reducers
