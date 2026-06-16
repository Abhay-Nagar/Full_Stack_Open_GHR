import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log(token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {headers: {Authorization: token}}
  const response = await axios.post(baseUrl, newBlog, config)
  console.log('this is response',response)
  return response.data
}

export default { getAll , create, setToken}