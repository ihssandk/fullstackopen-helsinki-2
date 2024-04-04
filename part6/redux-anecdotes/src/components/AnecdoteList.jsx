import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
 
  const vote = (id, content) => {
      
      dispatch(voteAnecdote(id))
      dispatch(setNotification(`you voted '${content}'`, 10))

  }
  const anecdotes = useSelector(state => {
    if ( state.filter === '' ) {
      return state.anecdotes
    }
      return state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
}
  )
  return (
    <div>
         {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote( anecdote.id , anecdote.content )}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList