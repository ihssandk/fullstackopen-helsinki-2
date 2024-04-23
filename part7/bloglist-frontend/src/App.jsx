import { useSelector , useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs , likeBlog , deleteBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser, logoutUser , setLoggedInUser  } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const loggedIn = useSelector((state) => state.user.loggedInUser)
  const blogFormRef = useRef()
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(setNotification('Incorrect username or password, please retry', 'red', 10))
    }
  }

  useEffect(() => {
    loginService.users()
      .then(users => {
        const loggedInUser = users.find(listUser => listUser.username === user?.username)
        if (loggedInUser) {
          dispatch(setLoggedInUser(user))}
      })}, [dispatch, user, user?.username])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
    window.localStorage.removeItem('loggedBlogappUser')
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
    dispatch(likeBlog(b.id,{ ...b , likes : b.likes + 1 }))
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
            {user.name} logged-in
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
              currUser={loggedIn?.id}
            />
          </Togglable>
        </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <div key={blog.id}>
          <Blog
            user={loggedIn?.username}
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