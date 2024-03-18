import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async (token) => {
  const request = await axios.get(baseUrl)
  return request.then(response => response.data)
}

  export default {getAll, setToken}