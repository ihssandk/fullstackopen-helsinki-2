import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    sortAnecdotes(state, action) {
        const newList = action.payload
            return newList.sort((a, b) => {
              if (a.votes === b.votes) {
                return a.id - b.id}
                return b.votes - a.votes})
      },

      appendAnecdote(state, action) {
        state.push(action.payload)
      }}
    })

export const { sortAnecdotes , appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(sortAnecdotes(anecdotes))
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
  dispatch(sortAnecdotes(anecdotes))
 }
}

export default anecdoteSlice.reducer
        

