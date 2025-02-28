/* eslint-disable linebreak-style */
import axios from 'axios'
export const getuserList=async () => {
  console.log('userList')
  try{
    const response=await axios.get('http://localhost:3001/api/users')
    return response.data
  }catch (error) {
    console.log('service login ', error)
    throw error
  }
}

export default { getuserList }