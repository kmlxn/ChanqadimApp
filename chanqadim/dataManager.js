import {AsyncStorage} from 'react-native';

function getAuthToken() {
  return AsyncStorage.getItem('@chanqadimv3:auth_token')
    .catch(error => console.error('AsyncStorage error: ' + error.message))
}

function setAuthToken(token) {
  return AsyncStorage.setItem('@chanqadimv3:auth_token', token)
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
  return fetch("http://localhost:8000/api-token-auth/", {
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
  return fetchJson('http://localhost:8000/categories/')
}

export function getBundles(categoryUrl) {
  console.log('url', categoryUrl);
  return fetchJson(categoryUrl)
}
