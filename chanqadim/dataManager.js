import {AsyncStorage} from 'react-native';

const CURRENT_USER_URL = 'http://localhost:8000/users/current/',
  AUTH_URL = 'http://localhost:8000/api-token-auth/',
  CATEGORIES_URL = 'http://localhost:8000/categories/',
  STORAGE_KEY = '@chanqadimv3:auth_token'


function getAuthToken() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .catch(error => console.error('AsyncStorage error: ' + error.message))
}

function setAuthToken(token) {
  return AsyncStorage.setItem(STORAGE_KEY, token)
    .catch(error => console.error('AsyncStorage error: ' + error.message))
}

async function fetchJson(url) {
  const token = await getAuthToken()

  try {
    const response = await fetch(url, {
      headers: {'Authorization': 'Token ' + token}
    })

    if (response.status === 401)
      return 'not authenticated';
    if (response.status === 402)
      return 'access denied';

    const data = await response.json()

    return data;
  } catch (error) {
    console.error(error)
  }
}

export function login(username, password) {
  return fetch(AUTH_URL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => setAuthToken(data.token))
    .catch(error => console.error(error))
}

export function getCategories() {
  return fetchJson(CATEGORIES_URL)
}

export function getBundles(categoryUrl) {
  return fetchJson(categoryUrl)
}

export function getUser(user) {
  const userUrl = user ? user.url : CURRENT_USER_URL
  return fetchJson(userUrl)
}