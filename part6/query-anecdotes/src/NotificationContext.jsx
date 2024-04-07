import { createContext , useContext, useReducer} from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'NEW':
        return `You just added '${action.payload}'`
      case 'VOTE':
        return `You just voted '${action.payload}'`
      case 'ERROR':
        return `'${action.payload}' is too short , must be at least 5 characters long`
      case 'CLEAR_NOTIFICATION':
        return null
        default:
        return null
    }
  };
const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]} >
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAnDispatch = useContext(NotificationContext)
    return notificationAnDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAnDispatch = useContext(NotificationContext)
    return notificationAnDispatch[1]
}

export default NotificationContext