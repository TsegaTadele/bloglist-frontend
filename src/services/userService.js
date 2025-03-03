/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/users'
export const getuserList=async () => {
  console.log('userList')
  try{
    const response=await axios.get(baseUrl)
    return response.data
  }catch (error) {
    console.log('service login ', error)
    throw error
  }
}

export default { getuserList }