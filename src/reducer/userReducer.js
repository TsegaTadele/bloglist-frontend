/* eslint-disable linebreak-style */
import { createSlice } from '@reduxjs/toolkit'

const userSlicer=createSlice({
  name:'user',
  initialState: {
    userInfo: null,
  },
  reducers:{
    setUser:(state,action) => {
      state.userInfo=action.payload
    },
    clearUser:(state) => {state.userInfo=null}
  }
})
export const { setUser,clearUser }=userSlicer.actions
export default userSlicer.reducer