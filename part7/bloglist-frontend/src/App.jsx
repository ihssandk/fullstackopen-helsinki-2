import { useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loggedIn,setLoggedIn] = useState(null)
  const [likeUpdate, setLikeUpdate] = useState(false)

  useEffect(() => {
    loginService.users()
      .then(users => {
        const loggedInUser = users.find(listUser => listUser.username === user?.username)
        if (loggedInUser) {
          setLoggedIn(loggedInUser)}
      })}, [user?.username])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        blogs.sort((a, b) => {
          if (a.likes === b.likes) {
            return a.id - b.id}
          return b.likes - a.likes})
        setBlogs(blogs)
      })
  }, [likeUpdate])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Incorrect username or passwor, retry', 'red', 10))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          data-testid='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          data-testid='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject, user.token)
      .then(returnedObj =>
      {setBlogs(blogs.concat(returnedObj))
        dispatch(setNotification(`a new blog ${returnedObj.title} by ${returnedObj.author}`, 'green', 10))
      }
      )
  }

  const likePost= async (b) => {
    blogService.likingBlog(b.id, { ...b,likes : b.likes +1 })
    b.likes = b.likes +1
    setLikeUpdate(!likeUpdate)
  }

  const deleteBlog = async (b) => {
    if (window.confirm(`Are you sure you want to delete ${b.title}`)){
      blogService.deleteBlog(b.id , user.token).then(async (res) =>
      {const newList = await blogService.getAll()
        setBlogs(newList)})

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
              createBlog={addBlog}
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
            deleteBlog={() => deleteBlog(blog)}
          />
        </div>
      )}
    </div>
  )
}

export default App