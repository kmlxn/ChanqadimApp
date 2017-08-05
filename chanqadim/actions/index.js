import { AsyncStorage } from 'react-native'
import { normalize } from 'normalizr'
import * as schema from '../schema'
let token = ''

getAuthToken()

function wait () {
  return new Promise(resolve => setTimeout(resolve, 500))
}

function fetchJSON (url) {
  return wait().then(() => fetch(url, {
    headers: { 'Authorization': `Token ${token}` }
  }))
}

function postJSON (url, data) {
  const formdata = new FormData()
  for (let key in data) { formdata.append(key, data[key]) }

  return wait().then(() => fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
      'Authorization': `Token ${token}`,
      'Content-Disposition': 'attachment; filename=image.jpg'
    },
    method: 'POST',
    body: formdata
  }))
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
  return fetchJSON('http://localhost:8000/categories/')
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

  return fetchJSON(url)
    .then(
      response => response.json(),
      error => console.error('ERROR:', error))
    .then(json => {
      const normalizedJSON = normalize(json, schema.category)
      dispatch(recieveCategory(normalizedJSON))
    })
}

export const fetchBundle = url => dispatch => {
  dispatch(requestBundle(url))

  return fetchJSON(url)
    .then(
      response => response.json(),
      error => console.error('ERROR:', error))
    .then(json => {
      const normalizedJSON = normalize(json, schema.bundle)
      dispatch(receiveBundle(normalizedJSON))
    })
}

export const requestCurrentUser = url => ({
  type: 'REQUEST_CURRENT_USER',
  url
})

export const receiveCurrentUser = items => ({
  type: 'RECEIVE_CURRENT_USER',
  items
})

export const fetchCurrentUser = () => dispatch => {
  dispatch(requestCurrentUser())

  return fetchJSON('http://localhost:8000/users/current/')
    .then(
      response => response.json(),
      error => console.error('ERROR:', error))
    .then(json => {
      const normalizedJSON = normalize(json, schema.user)
      dispatch(receiveCurrentUser(normalizedJSON))
    })
}

export const requestUpdateCurrentUser = () => ({
  type: 'REQUEST_UPDATE_CURRENT_USER'
})

export const receiveUpdateCurrentUser = items => ({
  type: 'RECEIVE_UPDATE_CURRENT_USER',
  items
})

export const updateCurrentUser = data => dispatch => {
  dispatch(requestUpdateCurrentUser())

  return postJSON('http://localhost:8000/users/current/edit/', data)
    .then(
      response => response.json(),
      error => console.error('ERROR:', error))
    .then(json => {
      // json.bundles = []
      const normalizedJSON = normalize(json, schema.user)
      dispatch(receiveUpdateCurrentUser(normalizedJSON))
    })
}

function getAuthToken () {
  return AsyncStorage.getItem('@chanqadimv3:auth_token')
    .then(token_ => { token = token_ })
    .catch(error => console.error('AsyncStorage error: ' + error.message))
}
