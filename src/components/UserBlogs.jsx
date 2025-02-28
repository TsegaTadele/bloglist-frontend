import { Link, useParams } from 'react-router-dom'

/* eslint-disable linebreak-style */
const UserBlogs=({ userList }) => {
  const id = useParams().id
  const user= userList.data?.find(u => u.id ===id)
  console.log('Selected User ',  user)
  // console.log('blogs ', blogs)
  //  const userBlogs= blogs.find(b=>b.)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{ user.username} </h2>
      <div>
        added blogs
        { user.blogs?.map( (blog, i) => (
          <li style={{ marginLeft: '10px' }} key={i}>
            <Link to={`/blog/${blog.id}` }>{blog.title}</Link>
          </li>
        )
        )}
      </div>
    </div>
  )}
export default UserBlogs



