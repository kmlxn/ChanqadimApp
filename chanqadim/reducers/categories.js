import union from 'lodash/union'

export default function categories (state = {}, action) {
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

export function getCategoryBundlesIds (state, id) {
  return state.byId[id].bundles
}
