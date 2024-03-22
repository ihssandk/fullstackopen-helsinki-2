import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {

  const blogFormRef = useRef()
  const blogInfoRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loggedIn,setLoggedIn] = useState(null)
  const [likeUpdate, setLikeUpdate] = useState(false)

  useEffect(() => {
    loginService.users()
      .then(users => {
        const loggedInUser = users.find(listUser => listUser.username == user?.username)
        if (loggedInUser) {
          setLoggedIn(loggedInUser);}
      })}, [user]);

    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll(user?.token)
      .then(blogs => {
        blogs.sort((a, b) => {
          if (a.likes === b.likes) {
            return a.id - b.id}
          return b.likes - a.likes});
        setBlogs(blogs);
      });
  }, [likeUpdate]);
  
  
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
       } catch (exception){
      setErrorMessage('Incorrect username or password, Retry')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const addBlog = (blogObject) =>{
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject, user.token)
      .then(returnedObj => 
        {setBlogs(blogs.concat(returnedObj))
          setMessage(`a new blog ${blogObject.title} by ${blogObject.author}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
         }
          )       
  }

  const likePost= async (b) => {
    blogService.likingBlog(b.id, {...b,likes : b.likes +1})
    const newList = await blogService.getAll()
    setBlogs(newList)
    setLikeUpdate(!likeUpdate)
  }

  const deleteBlog = async (b) =>{
    if (window.confirm(`Are you sure you want to delete ${b.title}`)){
        blogService.deleteBlog(b.id , user.token)
        const newList = await blogService.getAll()
        setBlogs(newList)
    }
  }

  return (
    <div>
       <h1>login</h1>
         <Notification
          color='red'
          message={errorMessage} />
         <Notification
          color='green'
          message={message} />
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
        <div 
          key={blog.id}
          style={{border: '1px dotted rgba(0, 0, 0, 1)' ,padding :'5px' ,marginBottom : '5px'}}>
          <span>{blog.title} by {blog.author}</span>
          <Togglable
            buttonLabel='view'
            cancelLabel='hide'
            ref={blogInfoRef}>
                <Blog
                  userId={loggedIn?.id}
                  blog={blog}
                  likeBlog={() =>likePost(blog)}
                  deleteBlog={() =>deleteBlog(blog)}
                />
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App