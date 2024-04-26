import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const loadState = () => {
  const serializedState = localStorage.getItem('reduxState')
  if (serializedState === null) {
    return undefined
  }
  return JSON.parse(serializedState)
}

const saveState = (state) => {
  const serializedState = JSON.stringify(state)
  localStorage.setItem('reduxState', serializedState)
}

const preloadedState = loadState()

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  saveState(store.getState())
})

export default store