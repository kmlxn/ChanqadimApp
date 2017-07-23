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

export const getBundles = (bundles, ids) =>
  ids.map(id => bundles.byId[id])