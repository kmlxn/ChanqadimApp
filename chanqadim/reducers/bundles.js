import union from 'lodash/union'

export default function bundles (state = {}, action) {
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
    case 'RECEIVE_CURRENT_USER':
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
  if (action.items.entities.bundles) {
    return union(state, Object.keys(action.items.entities.bundles))
  }

  return state
}

export function getBundle (state, url) {
  return state.byId[url]
}

export function getBundleProductsIds (state, url) {
  return state.byId[url].products || []
}

export function getBundles (state, ids) {
  return ids.map(id => state.byId[id])
}
