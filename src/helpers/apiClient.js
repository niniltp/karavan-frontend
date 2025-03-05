import { API_URL } from './constants.js';

export const apiClient = {
  get: (endpoint, withCreds=false) => fetch(`${API_URL}${endpoint}`, {
    credentials: withCreds ? "include" : "omit"
  }).then(handleResponse),
  post: (endpoint, body, withCreds=false) => fetch(`${API_URL}${endpoint}`, {
    mode: 'cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: withCreds ? "include" : "omit"
  }).then(handleResponse),
  // put: (endpoint, body) => fetch(`${API_URL}${endpoint}`, {
  //   mode: 'cors',
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(body),
  // }).then(handleResponse),
  delete: (endpoint, withCreds=false) => fetch(`${API_URL}${endpoint}`, {
    mode: 'cors',
    method: 'DELETE',
    credentials: withCreds? "include" : "omit"
  }).then(handleResponse)
};

async function handleResponse(response) {
  if (!response.ok) throw new Error(await response.text()); // TODO : refactor with code error etc
  return response.json();
}