import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
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

export const { likeAnecdote , appendAnecdote , setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}}

export const createAnecdote = content => {
  return async dispatch => {
  const newAnedcote = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(newAnedcote))
}}

export default anecdoteSlice.reducer
        

