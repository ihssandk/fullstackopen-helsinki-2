import { useState } from 'react'

const BlogForm = ({ createBlog , currUser }) => {

  const [newTitle, setNewTitle]= useState('')
  const [newAuthor, setNewAuthor]= useState('')
  const [newUrl, setNewUrl]= useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title : newTitle,
      author : newAuthor,
      url : newUrl,
      user: currUser
    })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <label>title
            <input 
            value={newTitle}
            onChange={(e) =>setNewTitle(e.target.value)}/>
          </label>
          <br />
        <label>author
            <input
            value={newAuthor}
            onChange={(e) =>setNewAuthor(e.target.value)}/>
        </label>
            <br />
        <label>url
            <input 
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