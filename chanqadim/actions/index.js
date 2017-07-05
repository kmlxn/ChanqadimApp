import { AsyncStorage } from 'react-native'
import { normalize } from 'normalizr'
import * as schema from '../schema'

let token = ''

getAuthToken()

function wait () {
  return new Promise(resolve => setTimeout(resolve, 500))
}

export const requestCategories = () => ({
  type: 'REQUEST_CATEGORIES'
})

export const requestCategory = (url) => ({
  type: 'REQUEST_CATEGORY',
  url
})

export const recieveCategories = (categories) => ({
  type: 'RECEIVE_CATEGORIES',
  items: categories
})

export const recieveCategory = (category) => ({
  type: 'RECEIVE_CATEGORY',
  items: category
})

export const requestBundle = url => ({
  type: 'REQUEST_BUNDLE',
  url
})

export const receiveBundle = bundle => ({
  type: 'RECEIVE_BUNDLE',
  items: bundle
})

export const fetchCategories = () => dispatch => {
  dispatch(requestCategories())
  return fetch(
      'http://localhost:8000/categories/',
      { headers: { 'Authorization': `Token ${token}` } }
    )
    .then(
      response => response.json(),
      error => console.error('ERROR:', error))
    .then(json => {
      const normalizedJSON = normalize(json.results, schema.categories)
      dispatch(recieveCategories(normalizedJSON))
    })
}

export const fetchCategory = (url) => dispatch => {
  dispatch(requestCategory(url))

  return wait().then(() =>
    fetch(
      url,
      { headers: { 'Authorization': `Token ${token}` } }
    )
    .then(
      response => response.json(),
      error => console.error('ERROR:', error))
    .then(json => {
      const normalizedJSON = normalize(json, schema.category)
      dispatch(recieveCategory(normalizedJSON))
    })
  )
}

export const fetchBundle = url => dispatch => {
  dispatch(requestBundle(url))

  return wait().then(() =>
    fetch(
      url,
      { headers: { 'Authorization': `Token ${token}` } }
    )
    .then(
      response => response.json(),
      error => console.error('ERROR:', error))
    .then(json => {
      const normalizedJSON = normalize(json, schema.bundle)
      dispatch(receiveBundle(normalizedJSON))
    })
  )
}

function getAuthToken () {
  return AsyncStorage.getItem('@chanqadimv3:auth_token')
    .then(token_ => { token = token_ })
    .catch(error => console.error('AsyncStorage error: ' + error.message))
}
