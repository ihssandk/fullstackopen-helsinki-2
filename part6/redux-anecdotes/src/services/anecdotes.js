import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const createNew = async (content) => {
  const object = { content , votes : 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (objectToUpdateId) => {
  const existingObj = await axios.get(`${baseUrl}/${objectToUpdateId}`)
  const response = await axios.put(`${baseUrl}/${objectToUpdateId}`, {...existingObj.data , votes: existingObj.data.votes + 1 })
  return response.data
}

export default { getAll , createNew , update}