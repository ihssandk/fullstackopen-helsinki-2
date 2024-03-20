import axios from 'axios'
const baseUrl = '/api/blog'

let token = null
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const likingBlog = async (id ,updatedObj) => {
  const response = axios.put(`${baseUrl}/${id}`,updatedObj)
  return response.data
}

  export default {getAll, create, likingBlog ,setToken}