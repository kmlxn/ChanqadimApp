import { combineReducers } from 'redux'

function items (state = {}, action) {
  return {
    categories: categories(state.categories, action),
    category: category(state.category, action),
    bundle: bundle(state.bundle, action),
    profile: profile(state.profile, action),
    editProfile: editProfile(state.editProfile, action),
    login: login(state.login, action),
    add: add(state.add, action)
  }
}

function categories (state = { isFetching: true }, action) {
  return state
}

function category (state = { isFetching: true }, action) {
  switch (action.type) {
    case 'REQUEST_CATEGORY':
      return { isFetching: true, url: action.url }
    case 'RECEIVE_CATEGORY':
      return {
        isFetching: false,
        url: action.items.entities.categories[action.items.result].url
      }
  }

  return state
}

function bundle (state = { isFetching: true }, action) {
  switch (action.type) {
    case 'REQUEST_BUNDLE':
      return { isFetching: true, url: action.url }
    case 'RECEIVE_BUNDLE':
      return {
        isFetching: false,
        url: action.items.entities.bundles[action.items.result].url
      }
  }

  return state
}

function profile (state = { isFetching: true }, action) {
  switch (action.type) {
    case 'RECEIVE_CURRENT_USER':
      return { isFetching: false }
    case 'REQUEST_CURRENT_USER':
      return { isFetching: true }
  }

  return state
}

function editProfile (state = { isFetching: false }, action) {
  switch (action.type) {
    case 'REQUEST_UPDATE_CURRENT_USER':
      return { isFetching: true }
    case 'RECEIVE_UPDATE_CURRENT_USER':
      return { wasUpdateSuccessful: true, isFetching: false }
  }

  return state
}

function login (state = { isFetching: false }, action) {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return { isFetching: true }
    case 'LOGIN_ERROR_RESPONSE':
      return { hasErrorHappened: true }
  }

  return state
}

function add (state = { isFetching: true }, action) {
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

export function getSceneItemUrl (state, scene) {
  return state.items[scene].url
}

export function isSceneLoading (state, key) {
  return state.items[key].isFetching
}

export function hasErrorHappened (state, key) {
  return state.items[key].hasErrorHappened
}

export function wasUpdateSuccessful (state, key) {
  return state.items[key].wasUpdateSuccessful
}

export function getActiveCategoryUrl (state) {
  return state.items.category.url
}

export default combineReducers({
  current,
  items
})
