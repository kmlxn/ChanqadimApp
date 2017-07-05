import union from 'lodash/union'

export default function products (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_BUNDLE':
      return {
        ...state,
        byId: byId(state.byId, action),
        allIds: allIds(state.allIds, action)
      }
    default:
      return state
  }
}

export function getProducts ({bundles, products}, bundleUrl) {
  const productIds = bundles.byId[bundleUrl] && bundles.byId[bundleUrl].products
  return productIds ? productIds.map(url => products.byId[url]) : []
}

function byId (state = {}, action) {
  if (action.items.entities.products) {
    return {
      ...state,
      ...action.items.entities.products
    }
  }

  return state
}

function allIds (state = [], action) {
  if (action.items.entities.products) {
    return union(state, Object.keys(action.items.entities.products))
  }

  return state
}
