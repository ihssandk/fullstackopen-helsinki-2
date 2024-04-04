import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    setAnecdotes(state, action) {
        const anecdotes = action.payload
            return anecdotes.sort((a, b) => {
              if (a.votes === b.votes) {
                return a.id - b.id}
                return b.votes - a.votes})
      },

      appendAnecdote(state, action) {
        state.push(action.payload)
      }}
    })

export const { setAnecdotes , appendAnecdote } = anecdoteSlice.actions

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

export const voteAnecdote = idToVote => {
 return async dispatch => {
  await anecdoteService.update(idToVote)
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
 }
}

export default anecdoteSlice.reducer
        

