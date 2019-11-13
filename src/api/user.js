import fetch from '../utils/fetch'

export function register(obj) {
  return fetch.post('api/user/register',obj)
}

export function login(obj) {
  return fetch.post('api/user/login',obj)
}
