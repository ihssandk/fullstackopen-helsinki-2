import { useSelector , useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
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
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TextField,
  Menu,
  MenuItem
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const App = () => {

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
        <TextField
          id="outlined-basic" label="username" variant="outlined" size="small"
          type="text"
          data-testid='username'
          name="username"
        />
      </div>
      <div>
        <TextField
          id="outlined-basic" label="password" variant="outlined" size="small"
          type="password"
          data-testid='password'
          name="password"
        />
      </div>
      <Button variant="contained" color="primary" type="submit">login</Button>
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
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

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
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs.map(blog => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  return (
    <Container>
      <Router >
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen} sx={{ mr: 2 }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                  <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Blogs</Link>
                </Typography>
                <Typography variant="h6" color="inherit" component="div">
                  <Link to="/users" style={{ color: 'white', textDecoration: 'none' }}>Users</Link>
                </Typography>
                <Toolbar sx={{ justifyContent: 'flex-end', backgroundColor: '#inherit' }}>
                  <div>
                    {user === null ?
                      (
                        <div>
                          <div>{loginForm()} </div>
                        </div>
                      )
                      :
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
                  </div>
                </Toolbar>
              </Toolbar>
            </AppBar>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/">Blogs</MenuItem>
            <MenuItem component={Link} to="/users">Users</MenuItem>
          </Menu>
          <Notification />

          <Routes>
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog user={user?.username} />} />
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </Router>
    </Container>
  )
}

export default App