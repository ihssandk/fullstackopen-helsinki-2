import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
blogService.setToken(JSON.parse(loggedUserJSON).token)

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(loggedUserJSON) ,
  reducers: {
    setUser(state, action) {
      const userInfo = action.payload
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userInfo)
      )
      blogService.setToken(userInfo.token)
      return userInfo
    },
    logoutUser(state, action) {
      window.localStorage.removeItem('loggedBlogappUser')
      return null
    },
  },
})

export const { setUser, logoutUser } = userSlice.actions

export const userFromList = () => async (dispatch, getState) => {

  const state = getState()
  const users = await loginService.users()
  const loggedInUser = users.find(listUser => listUser.username === state.user.username)
  console.log(loggedInUser)
  return loggedInUser }

export default userSlice.reducer