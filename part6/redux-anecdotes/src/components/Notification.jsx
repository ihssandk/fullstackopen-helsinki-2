import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(state => {
    console.log(state.notification)
    console.log(state)
   if(state.notification) {
      return state.notification.message
    }
      return null
  })

  if (notification) {
    return (
    <div style={style}>
      {notification}
    </div>
  )}

}

export default Notification