import { useDispatch} from 'react-redux'
import { createAnecdote  } from '../reducers/anecdoteReducer'
import {  showNotificationForNew, hideNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const hideNotificationWithDelay = () => (dispatch) => {
      setTimeout(() => {
        dispatch(hideNotification())
      }, 2000)
    }
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(showNotificationForNew(content))
        dispatch(hideNotificationWithDelay())
      }
  return (
    <div>
        <h2>create new</h2>
        <form onSubmit ={addAnecdote}> 
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm