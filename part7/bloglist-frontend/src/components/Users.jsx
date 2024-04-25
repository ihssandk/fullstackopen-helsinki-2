import { useEffect } from 'react'
import loginService from '../services/login'
import { setUsers } from '../reducers/usersReducer'
import { useDispatch , useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await loginService.users()
      dispatch(setUsers(fetchedUsers))
    }
    fetchUsers()
  }, [dispatch])

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
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users