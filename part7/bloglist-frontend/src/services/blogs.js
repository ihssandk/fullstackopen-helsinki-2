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
  console.log(response.data)
  return response.data
}

const addComment = async (id,comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`,{ data : comment })
  console.log(response.data)
  return response.data
}

const likingBlog = async (id ,updatedObj) => {
  const response = await axios.put(`${baseUrl}/${id}`,updatedObj)
  return response.data
}
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.ok
}

export default { getAll, create, likingBlog, deleteBlog, setToken , addComment }