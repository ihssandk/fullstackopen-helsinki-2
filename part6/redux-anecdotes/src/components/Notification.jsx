import { useSelector, useDispatch } from 'react-redux'
import { showNotification , hideNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const dispatch = useDispatch()
  dispatch(showNotification('yes'))
  const notification = useSelector(state => {
    console.log(state.anecdotes)
    console.log(state.notification)
   if(state.notification)
    {return state.notification.message}
    return null
  }
  )
  if (notification)
  {return (
    <div style={style}>
      {notification}
    </div>
  )}

}

export default Notification