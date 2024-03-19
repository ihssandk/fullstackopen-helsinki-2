import axios from 'axios'
const baseUrl = '/api/blog'

let token = null
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async (token) => {
  const response = await axios.get(baseUrl)
  return response.data
}

  export default {getAll, setToken}