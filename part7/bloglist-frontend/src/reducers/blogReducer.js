import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState : [],
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload
      return blogs.sort((a, b) => {
        if (a.likes === b.likes) {
          return a.id - b.id}
        return b.likes - a.likes})
    },

    appendBlogs(state, action) {
      state.push(action.payload)
    } }
})

export const { setBlogs , appendBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlogs(newBlog))
  }}

export const likeBlog = idToLike => {
  return async dispatch => {
    await blogService.update(idToLike)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer