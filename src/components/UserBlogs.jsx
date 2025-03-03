import { Container, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

/* eslint-disable linebreak-style */
const UserBlogs = ({ userList }) => {
  const id = useParams().id
  const user = userList.data?.find((u) => u.id === id)

  if (!user) {
    return null
  }
  return (
    <Container>
      <div>
        <h2>{user.username} </h2>
        <div>
          <h3>added blogs </h3>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {user.blogs?.map((blog, i) => (
                  <TableRow   style={{ marginLeft: '10px' }} key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </TableContainer>
          {/* <List>
            {user.blogs?.map((blog, i) => (
              <ListItem primary={`${i + 1}. ${blog.title}`}  style={{ marginLeft: '10px' }} key={i}>
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
              </ListItem>
            ))}
          </List> */}
        </div>
      </div>
    </Container>
  )
}
export default UserBlogs
