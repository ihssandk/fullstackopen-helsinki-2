import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  color : null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      let message = action.payload.message
      let color = action.payload.color
      return { message , color }
    },
    hideNotification(state, action) {
      return initialState
    },
  },
})


export const { showNotification , hideNotification } = notificationSlice.actions

export const setNotification = ( message, color , time) => (dispatch) => {
  dispatch(showNotification({ message, color }))
  return setTimeout(() => {
    dispatch(hideNotification())
  }, time*1000)
}
export default notificationSlice.reducer