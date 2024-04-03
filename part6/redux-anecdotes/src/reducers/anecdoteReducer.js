import { createSlice } from '@reduxjs/toolkit'
const anecdotesAtStart = []

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
        state.push(action.payload)},

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
      },

      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      
      setAnecdotes(state, action) {
        return action.payload}
    },
    })

export const { createAnecdote , likeAnecdote , appendAnecdote , setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
        

