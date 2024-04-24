import { useSelector , useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import { initializeBlogs , likeBlog , deleteBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser, logoutUser, userFromList } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const [loggedIn , setLoggedIn] = useState(null)
  console.log(loggedIn)
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const user = await loginService.login({
        username, password
      })
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(setNotification('Incorrect username or password, please retry', 'red', 10))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          data-testid='username'
          name="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          data-testid='password'
          name="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logout = () => {
    dispatch(logoutUser())
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => {
    return state.blogs
  }
  )

  const likePost= async (b) => {
    dispatch(likeBlog(b.id , { ...b , likes : b.likes + 1 }))
  }

  const deletePost = async (b) => {
    if (window.confirm(`Are you sure you want to delete ${b.title}`)){
      dispatch(deleteBlog(b.id))
    }
  }

  return (
    <div>
      <h1>login</h1>
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          <span>
            {user?.name} logged-in
          </span>
          <button
            type='button'
            onClick={logout}>logout
          </button>
          <Togglable
            buttonLabel='create new'
            cancelLabel='cancel'
            ref={blogFormRef}>
            <BlogForm
              currUser={userFromList(user).id}
            />
          </Togglable>
        </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <div key={blog.id}>
          <Blog
            user={user?.username}
            blog={blog}
            likeBlog={() => likePost(blog)}
            deleteBlog={() => deletePost(blog)}
          />
        </div>
      )}
    </div>
  )
}

export default App