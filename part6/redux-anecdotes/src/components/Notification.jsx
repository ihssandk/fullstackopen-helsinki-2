import { useSelector } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'


const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = useSelector(state => {
    console.log(state)
    return 'something something'
  
}
  )
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification