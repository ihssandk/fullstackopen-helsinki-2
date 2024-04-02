import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotificationForNew(state, action) {
      let currAnecdote
      currAnecdote = action.payload
      return {message : `You just added '${currAnecdote}'`}
    },
    showNotificationforVote(state, action) {
      let currAnecdote
      currAnecdote = action.payload
      return {message : `You just upvoted '${currAnecdote}'`}
    },
    hideNotification(state, action) {
      return {message :null}
    },
  },
})


export const { showNotificationForNew , showNotificationforVote , hideNotification } = notificationSlice.actions
export default notificationSlice.reducer

          
  
  