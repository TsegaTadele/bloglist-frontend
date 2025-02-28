/* eslint-disable linebreak-style */
import { createSlice } from '@reduxjs/toolkit'

const userSlicer = createSlice({
  name: 'user',
  initialState: {
    userInfo: JSON.parse(localStorage.getItem('loggedBlogUser')) || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload
      window.localStorage.setItem(
        'loggedBlogUser',
        JSON.stringify(action.payload)
      )
    },
    clearUser: (state) => {
      state.userInfo = null
      window.localStorage.removeItem('loggedBlogUser')
    },
  },
})
export const { setUser, clearUser } = userSlicer.actions
export default userSlicer.reducer
