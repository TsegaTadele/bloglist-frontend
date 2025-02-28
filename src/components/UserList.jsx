/* eslint-disable linebreak-style */
import { Link } from 'react-router-dom'
import './userList.css'
const UserList = ({ usersList }) => {
  return (
    <div className="user-list-container">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
           {usersList.data?.map((user, index) => (
            <tr key={index}>
              <Link to={`/user/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <td>{user.username}</td>
                <td>{user.blogs.length}</td>
              </Link>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default UserList