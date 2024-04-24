import { useEffect , useRef } from 'react'
import loginService from '../services/login'


const Users = () => {
  const usersRef = useRef([])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await loginService.users()
      usersRef.current = users
    }
    fetchUsers()
  }, [])
  console.log(usersRef)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
        </thead>
        <tbody>
          {usersRef.current.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users