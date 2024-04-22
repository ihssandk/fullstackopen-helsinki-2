/* eslint-disable linebreak-style */
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    console.log(state)
    if(state) {
      return state.notification.message
    }
    return null
  })
  const color = useSelector(state => {
    console.log(state.notification.color)
    if(state.notification) {
      return state.notification.color
    }
    return null
  })

  if (notification) {
    return (
      <div className={color==='green' ? 'notification' : 'error'}>
        {notification}
      </div>
    )
  }
}

export default Notification