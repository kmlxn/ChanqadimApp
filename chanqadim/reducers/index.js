import { combineReducers } from 'redux'

import products from './products'
import users, * as fromUsers from './users'
import bundles, * as fromBundles from './bundles'
import scenes, * as fromScenes from './scenes'
import categories, * as fromCategories from './categories'

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
  return fromBundles.getBundles(bundles, bundlesIds)
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

export function wasUpdateSuccessful ({ scenes }, key) {
  return fromScenes.wasUpdateSuccessful(scenes, key)
}

export function getActiveCategoryBundles ({ bundles, categories, scenes }) {
  const activeCategoryBundlesIds = fromCategories.getCategoryBundlesIds(categories, fromScenes.getActiveCategoryUrl(scenes))

  return activeCategoryBundlesIds ? fromBundles.getBundles(bundles, activeCategoryBundlesIds) : []
}
