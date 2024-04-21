/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog  } from '../reducers/blogReducer'
import blogService from '../services/blogs'
const BlogForm = ({ createBlog , currUser }) => {
  const dispatch = useDispatch()
  const [newTitle, setNewTitle]= useState('')
  const [newAuthor, setNewAuthor]= useState('')
  const [newUrl, setNewUrl]= useState('')

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title : newTitle,
      author : newAuthor,
      url : newUrl,
      user: currUser
    }))
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div className='formDiv'>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <label>title
          <input
            data-testid='title'
            id='title-input'
            placeholder='type a blog post title'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}/>
        </label>
        <br />
        <label>author
          <input
            data-testid='author'
            placeholder='who is the author?'
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}/>
        </label>
        <br />
        <label>url
          <input
            data-testid='url'
            placeholder='add link to the post?' 
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)} />
        </label>
        <br />
        <button type="submit">create</button>
      </form> 
    </div>
  )
}

export default BlogForm