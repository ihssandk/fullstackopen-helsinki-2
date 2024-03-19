import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const users = async () => {
  const response = await axios.get('api/users')
  return response.data
}

export default {login ,users}