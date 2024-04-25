import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const users = useSelector(state => state.users )
  const id = useParams().id
  const user = users.filter(n => n.id === id)
  console.log(user)
  return (
    <div>
      <h2>{user[0].name}</h2>
      <h3>added blogs</h3>
      <ul>{user[0].blogs.map( blog => <li key={blog.id}>{blog.title}</li> )}</ul>
    </div>
  )
}

export default User