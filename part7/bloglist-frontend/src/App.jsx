import { useSelector , useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import loginService from './services/login'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const padding = {
    padding: 5
  }
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
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

  const Blogs = () => {
    return (
      <div>
        { user && <Togglable
          buttonLabel='create new'
          cancelLabel='cancel'
          ref={blogFormRef}>
          <BlogForm/>
        </Togglable> }
        <h2>blogs</h2>
        {blogs.map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <div className='blog' style={{ border: '1px dotted rgba(0, 0, 0, 1)', padding: '5px', marginBottom: '5px' }}>
                {blog.title}
              </div>
            </Link>
          </div>
        )}
      </div>
    )
  }

  return (
    <Router >
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
      <div>
        <Notification />
        {user === null ?
          (<><h1>login</h1><div>{loginForm()} </div></>) :
          <div>
            <span>
              {user?.name} logged-in
            </span>
            <button
              type='button'
              onClick={logout}>logout
            </button>
          </div>
        }

        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog user={user?.username} />} />
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>


    </Router>
  )
}

export default App