import { createSlice } from '@reduxjs/toolkit'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
  return [...state,
    {content : content,
      id : getId(),
      votes : 0}]},
    likeAnecdote(state, action) {
      let idToLike, anecdoteToVote, changedAnecdote
      idToLike = action.payload
      anecdoteToVote = state.find(n => n.id === idToLike)
      changedAnecdote = { 
        ...anecdoteToVote, 
      votes: anecdoteToVote.votes + 1
    }
    
    const newList = state.map(anecdote =>
      anecdote.id !== idToLike ? anecdote : changedAnecdote 
      )
      return newList.sort((a, b) => {
        if (a.votes === b.votes) {
          return a.id - b.id}
          return b.votes - a.votes})
        }
      },
    })

export const { createAnecdote , likeAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
        
