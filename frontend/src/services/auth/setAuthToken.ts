import axios from 'axios'

export async function setAuthToken(token?: string) {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
