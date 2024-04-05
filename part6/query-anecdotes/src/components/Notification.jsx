import React, { useReducer ,useEffect } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW':
      return `You just added '${action.payload}'`;
    case 'VOTE':
      return `You just voted '${action.payload}'`;
    case 'ERROR':
      return `You just committed an error`;
    default:
      return null;
  }
};

const Notification = ({ type, anecdote }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  const [notification, notificationDispatch] = useReducer(notificationReducer, null);

  useEffect(() => {
      notificationDispatch({ type: type, payload: anecdote })
      setTimeout(() => {
        notificationDispatch({type : null , payload : null});
      }, 5000)
  
  }, [type, anecdote])
  
  if (anecdote.length> 0 && notification) {
      return (
        <div style={style}>
          {notification}
        </div>
      )
  }
  return null
}

export default Notification;
