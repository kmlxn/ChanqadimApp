import { AsyncStorage } from 'react-native'
import { normalize } from 'normalizr'
import * as schema from '../schema'

let token = ''

getAuthToken()

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

  return fetch(
      url,
      { headers: { 'Authorization': `Token ${token}` } }
    )
    .then(
      response => response.json(),
      error => console.error('ERROR:', error))
    .then(json => {
      const normalizedJSON = normalize(json.results, schema.category)
      dispatch(recieveCategories(normalizedJSON))
    })
}

function getAuthToken () {
  return AsyncStorage.getItem('@chanqadimv3:auth_token')
    .then(token_ => { token = token_ })
    .catch(error => console.error('AsyncStorage error: ' + error.message))
}
