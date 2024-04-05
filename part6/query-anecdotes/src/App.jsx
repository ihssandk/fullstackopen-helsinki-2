import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes , updateAnecdote} from './requests'

const App = () => {
  
  const queryClient = useQueryClient()
  
  const updateAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], 
      anecdotes.map(anec => anec.id === updatedAnecdote.id 
        ? updatedAnecdote : anec))
      }
    })

      const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({...anecdote, votes : anecdote.votes + 1})
        anecdote.votes += 1
      }
      
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false})

  console.log(JSON.parse(JSON.stringify(result)))
  
  if (result.error)
    return 'anecdote service not available due to problems in server'
  if ( result.isLoading ) 
    return <div>loading data...</div>

  const anecdotes = result.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
