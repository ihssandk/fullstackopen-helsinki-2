import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      let message = action.payload
      return { message }
    },
    hideNotification(state, action) {
      return { message :null }
    },
  },
})


export const { showNotification , hideNotification } = notificationSlice.actions

export const setNotification = (content, time) => (dispatch) => {
  dispatch(showNotification(content))
  return setTimeout(() => {
    dispatch(hideNotification())
  }, time*1000)
}
export default notificationSlice.reducer