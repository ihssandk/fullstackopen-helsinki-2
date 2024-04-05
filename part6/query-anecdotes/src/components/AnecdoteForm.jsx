import { useMutation , useQueryClient} from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import Notification from './Notification'
import { useState } from 'react'

const AnecdoteForm = () => {
  const [current, setCurrent] = useState('')
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    setCurrent(content)
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content : content, votes : 0 })
}

  return (
    <div>
      <Notification type='NEW' anecdote={current}/>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
