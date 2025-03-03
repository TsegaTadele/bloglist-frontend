/* eslint-disable linebreak-style */
import { Link } from 'react-router-dom'
import './userList.css'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
const UserList = ({ usersList }) => {
  const filteredUsers = usersList.data?.filter(
    (user) => user.blogs.length >= 1
  )
  return (

    <div className="user-list-container">
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {filteredUsers?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link
                    to={`/user/${user.id}`}
                  >
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  )
}

export default UserList
