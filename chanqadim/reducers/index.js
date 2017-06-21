import { combineReducers } from 'redux'

function categories (state = {}, action) {
  switch (action.type) {
    case 'REQUEST_CATEGORIES':
      return { ...state, isFetching: true }
    case 'RECEIVE_CATEGORIES':
      return {
        ...state,
        byId: action.items.entities.categories,
        allIds: action.items.result,
        isFetching: false
      }
    default:
      return state
  }
}

function bundles (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_CATEGORY':
      return {
        ...state,
        byId: bundlesById(state.byId, action),
        allIds: bundlesAllIds(state.allIds, action)
      }
    default:
      return state
  }
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
  if (action.items.result) {
    return [
      ...state,
      ...action.items.result
    ]
  }
  return state
}

function items (state = {}, action) {
  return state
}

const reducers = combineReducers({
  categories,
  bundles,
  items
})

export default reducers
