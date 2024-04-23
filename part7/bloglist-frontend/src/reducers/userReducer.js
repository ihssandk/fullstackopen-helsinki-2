import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    logoutUser(state) {
      state.user = null
    },
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload
    },
  },
})

export const { setUser, logoutUser , setLoggedInUser } = userSlice.actions

export default userSlice.reducer