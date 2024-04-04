import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      let message = action.payload
      return {message }
    },
    hideNotification(state, action) {
      return {message :null}
    },
  },
})


export const { setNotification , hideNotification } = notificationSlice.actions

export const clearNotification = () => (dispatch) => {
  return setTimeout(() => {
    dispatch(hideNotification())
  }, 2000)
}
export default notificationSlice.reducer

          
  
  