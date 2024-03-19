import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle]= useState('')
  const [newAuthor, setNewAuthor]= useState('')
  const [newUrl, setNewUrl]= useState('')
  const [loggedIn,setLoggedIn] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    loginService.users()
      .then(users => {
        const loggedInUser = users.find(
          listUser => listUser.username.toLowerCase() == user?.username.toLowerCase()
          )
        if (loggedInUser) {
          setLoggedIn(loggedInUser);
        }
      })
   }, []);

    

    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  useEffect(() => {
    blogService.getAll(user?.token)
    .then(blogs =>setBlogs( blogs ))  
  }, [])


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

  const addBlog = (e) =>{
    e.preventDefault()
    const blogObject = {
      title : newTitle,
      author: newAuthor,
      url: newUrl,
      user:loggedIn.id
    }

    blogService
      .create(blogObject, user.token)
      .then(returnedObj => 
        {setBlogs(blogs.concat(returnedObj))
          setNewAuthor('')
          setNewTitle('')
          setNewUrl('')
          setMessage(`a new blog ${newTitle} by ${newAuthor}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)}
          )}

      const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
      const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
  
  return (
    <div>
       <h1>login</h1>
         <Notification color='red' message={errorMessage} />
         <Notification color='green' message={message} />
         {user === null ?
          loginForm() :
          <div>
            <span>
            {user.name} logged-in
            </span>
            <button type='button' onClick={logout}>logout</button>
           
            <div style={hideWhenVisible}>
              <button onClick={() => setBlogFormVisible(true)}>create new</button>
            </div>
            <div style={showWhenVisible}>

                <BlogForm 
                  addBlog={addBlog}
                  title={newTitle}
                  author={newAuthor}
                  url={newUrl}
                  handleTitle={({target}) =>setNewTitle(target.value)}
                  handleAuthor={({target}) =>setNewAuthor(target.value)}
                  handleUrl={({target}) =>setNewUrl(target.value)}/>
              <button onClick={() => setBlogFormVisible(false)}>cancel</button>
            </div>
          </div>
        
        }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App