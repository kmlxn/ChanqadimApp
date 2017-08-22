import { AsyncStorage } from 'react-native'
import { normalize } from 'normalizr'
import * as schema from '../schema'

const AUTH_TOKEN_NAME = '@chanqadimv3:auth_token1'

// AsyncStorage.setItem(AUTH_TOKEN_NAME, '')

function wait () {
  return new Promise(resolve => setTimeout(resolve, 500))
}

function fetchJSON (token, url) {
  return wait().then(() => fetch(url, {
    headers: { 'Authorization': `Token ${token}` }
  }))
}

function postJSON (token, url, data) {
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

export const fetchCategories = () => (dispatch, getState) => {
  dispatch(requestCategories())
  const authToken = getState().status.authToken

  return fetchJSON(authToken, 'http://localhost:8000/categories/')
    .then(
      response => response.json(),
      error => console.error('ERROR:', error))
    .then(json => {
      const normalizedJSON = normalize(json.results, schema.categories)
      dispatch(recieveCategories(normalizedJSON))
    })
}

export const fetchCategory = (url) => (dispatch, getState) => {
  dispatch(requestCategory(url))
  const authToken = getState().status.authToken

  return fetchJSON(authToken, url)
    .then(
      response => response.json(),
      error => console.error('ERROR:', error))
    .then(json => {
      const normalizedJSON = normalize(json, schema.category)
      dispatch(recieveCategory(normalizedJSON))
    })
}

export const fetchBundle = url => (dispatch, getState) => {
  dispatch(requestBundle(url))
  const authToken = getState().status.authToken

  return fetchJSON(authToken, url)
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

export const fetchCurrentUser = () => (dispatch, getState) => {
  dispatch(requestCurrentUser())
  const authToken = getState().status.authToken

  return fetchJSON(authToken, 'http://localhost:8000/users/current/')
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

export const updateCurrentUser = data => (dispatch, getState) => {
  dispatch(requestUpdateCurrentUser())
  const authToken = getState().status.authToken

  return postJSON(authToken, 'http://localhost:8000/users/current/edit/', data)
    .then(
      response => response.json(),
      error => console.error('ERROR:', error))
    .then(json => {
      // json.bundles = []
      const normalizedJSON = normalize(json, schema.user)
      dispatch(receiveUpdateCurrentUser(normalizedJSON))
    })
}

export const requestLogin = credentials => ({
  type: 'REQUEST_LOGIN',
  credentials
})

export const loginSuccess = authToken => ({
  type: 'LOGIN_SUCCESS_RESPONSE',
  authToken
})

export const loginError = error => ({
  type: 'LOGIN_ERROR_RESPONSE',
  error
})

export const login = (username, password) => dispatch => {
  dispatch(requestLogin({ username, password }))

  return fetch('http://localhost:8000/api-token-auth/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (response.status !== 200) {
        return Promise.reject('Login error')
      }

      return response.json()
    })
    .then(data =>
      AsyncStorage.setItem(AUTH_TOKEN_NAME, data.token)
        .then(() => dispatch(loginSuccess(data.token)))
    )
    .catch(error => dispatch(loginError(error)))
}

function requestAuthTokenFromDisk () {
  return {
    type: 'REQUEST_AUTH_TOKEN_FROM_DISK'
  }
}

function receiveAuthTokenFromDisk (token) {
  return {
    type: 'RECEIVE_AUTH_TOKEN_FROM_DISK',
    authToken: token
  }
}

function authTokenRequestError (error) {
  return {
    type: 'AUTH_TOKEN_REQUEST_FROM_DISK_ERROR',
    error
  }
}

export const retrieveAuthToken = () => dispatch => {
  dispatch(requestAuthTokenFromDisk())

  AsyncStorage.getItem(AUTH_TOKEN_NAME)
    .then(token => {
      dispatch(receiveAuthTokenFromDisk(token))
    })
    .catch(error => {
      dispatch(authTokenRequestError(error))
    })
}
