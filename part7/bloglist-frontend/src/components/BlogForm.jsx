import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ currUser }) => {

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    dispatch(createBlog({
      title,
      author,
      url,
      user: currUser
    }))
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    dispatch(setNotification(`a new blog ${title} by ${author}`, 'green', 10))
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
            name='title'/>
        </label>
        <br />
        <label>author
          <input
            data-testid='author'
            placeholder='who is the author?'
            name='author'/>
        </label>
        <br />
        <label>url
          <input
            data-testid='url'
            placeholder='add link to the post?'
            name = 'url'/>
        </label>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm