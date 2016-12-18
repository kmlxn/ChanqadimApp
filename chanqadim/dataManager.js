import {AsyncStorage} from 'react-native';

const CURRENT_USER_URL = 'http://localhost:8000/users/current/',
  AUTH_URL = 'http://localhost:8000/api-token-auth/',
  CATEGORIES_URL = 'http://localhost:8000/categories/',
  BUNDLES_URL = 'http://localhost:8000/bundles/'
  PRODUCTS_URL = 'http://localhost:8000/products/'
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
      return 'not authenticated'
    if (response.status === 402)
      return 'access denied'

    const data = await response.json()

    return data;
  } catch (error) {
    console.error(error)
  }
}

async function upload(url, data) {
  console.log('dataManager - upload', data);
  const formdata = new FormData()
  for (let key in data)
      formdata.append(key, data[key])

  const token = await getAuthToken()
console.log('token', token);
  let response;
  try {
    response = await fetch(url, {
      method: 'post',
      body: formdata,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
        'Authorization': 'Token ' + token,
        'Content-Disposition': 'attachment; filename=image.jpg',
      },
    })

    console.log('dataManager - upload - response', response)

    if (response.status === 401)
      return 'not authenticated';
    if (response.status === 402)
      return 'access denied';

    const responseData = await response.json()

    return responseData;
  } catch (error) {
    console.log('dataManager - upload - response', response)
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

export function uploadBundle(bundle) {
  return upload(BUNDLES_URL, bundle)
}

export function uploadProduct(product) {
  return upload(PRODUCTS_URL, product)
}