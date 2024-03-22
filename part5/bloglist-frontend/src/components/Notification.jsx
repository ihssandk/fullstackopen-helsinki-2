/* eslint-disable linebreak-style */
const Notification = ({ message , color }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={color==='green' ? 'notification' : 'error'}>
      {message}
    </div>
  )
}

export default Notification