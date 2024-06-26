import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { likeBlog , deleteBlog , addCommentToBlog,initializeBlogs } from '../reducers/blogReducer'
import { useEffect } from 'react'

const Blog = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs )
  console.log(blogs)
  const id = useParams().id
  const blog = blogs.filter(n => n.id === id)[0]

  const likePost= async (b) => {
    dispatch(likeBlog(b.id , { ...b , likes : b.likes + 1 }))
  }

  const deletePost = async (b) => {
    if (window.confirm(`Are you sure you want to delete ${b.title}`)){
      dispatch(deleteBlog(b.id))
      navigate('/')
    }
  }
  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(addCommentToBlog(blog.id,comment))
    event.target.comment.value = ''
  }

  return (
    <div className='blog' style={{ border: '1px dotted rgba(0, 0, 0, 1)', padding: '5px', marginBottom: '5px' }}>
      <div>
        <h2 >{blog.title}</h2>
        <a href={blog.url}> {blog.url}</a>
        <div> {blog.likes} likes
          <button type='button' onClick={() => likePost(blog)}>like</button>
          <div>added by {blog.author}</div>
        </div>
        {user && user === blog.user?.username && (
          <button onClick={() => deletePost(blog)} style={{ background: '#0ed2ff' }}>remove</button>
        )
        }
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input
            type="text"
            name="comment"
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments?.map(comment => <li key={Math.floor(Math.random()*1000)}>{comment}</li>)}
        </ul>
      </div>

    </div>
  )
}

export default Blog