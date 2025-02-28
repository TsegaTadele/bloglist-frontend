/* eslint-disable linebreak-style */
import { useRef  } from 'react'

import blogService from '../services/blogService'
import loginService from '../services/loginService'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch,useSelector } from 'react-redux'

import { useNotification } from './NotificationContext'
import { setUser } from '../reducer/userReducer'
import userService from '../services/userService'



import { Link, useParams } from 'react-router-dom'

const Blog = ({ blog, handleLike, handleRemove }) => {

  const userInfo= useSelector((state) => state.user.userInfo)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const incrementLike = (event) => {
    event.preventDefault()
    handleLike(blog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (confirm(`Remove blog  ${blog.title}`)) {
      handleRemove(blog)
    }
  }
  return (
    <div style={blogStyle}>
      <div className="blog">{blog.title} </div>
      {/* <Togglable buttonLabel="view" buttonHide="hide">
        <div>{blog.url}</div>
        <div>
          <span   data-testid='likes' className="likes"> {`likes ${blog.likes}`}</span>
          <button onClick={incrementLike}>like</button>
        </div>
        <div>{blog.author}</div>
        {userInfo.username?.toString() === blog.user.username?.toString() && (
          <div style={{ marginTop: 5 }}>
            <button style={{ backgroundColor: '#0089ff' }} onClick={deleteBlog}>remove</button>
          </div>
        )}
      </Togglable> */}
    </div>
  )
}

const Blogs=({ blogs }) => {
  const { addNotification } = useNotification()
  const blogFormRef = useRef()
  const dispatch= useDispatch()
  const user = useSelector((state) => state.user.userInfo)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
    refetchOnWindowFocus: false,
  })

  const usersList = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getuserList(),
    refetchOnWindowFocus: false,
  })
  const queryClient = useQueryClient()
  const newBlogs = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newB) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newB))
    },
  })

  // const updateBlogs = useMutation({
  //   mutationFn: blogService.updateBlog,
  //   onSuccess: (updatedB) => {
  //     const blog = queryClient.getQueryData(['blogs'])
  //     queryClient.setQueryData(
  //       ['blogs'],
  //       blog.map((b) => (b.id === updatedB.id ? updatedB : b))
  //     )
  //   },
  // })

  // const removeBlogs = useMutation({
  //   mutationFn: blogService.deleteBlog,
  //   onSuccess: (_, variables) => {
  //     const blog = queryClient.getQueryData(['blogs'])
  //     queryClient.setQueryData(
  //       ['blogs'],
  //       blog.filter((b) => b.id.toString() !== variables.blog.id.toString())
  //     )
  //   },
  // })

  const addBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility()
    try {
      newBlogs.mutate({ title, author, url })

      addNotification({
        type: 'info',
        message: ' Saved successfully',
      })
    } catch (error) {
      addNotification({ message: `${error}`, type: 'error' })
    }
  }
  // const updateBlogLike = async (blog) => {
  //   try {
  //     updateBlogs.mutate({ blog })
  //     addNotification({ message: 'Updated', type: 'info' })
  //   } catch (error) {
  //     addNotification({ message: `${error}`, type: 'error' })
  //   }
  // }
  // const deleteBlog = async (blog) => {
  //   try {
  //     removeBlogs.mutate({ blog })
  //     addNotification({ message: `${blog.title} is deleted `, type: 'info' })
  //   } catch (error) {
  //     addNotification({ message: `${error}`, type: 'error' })
  //   }
  // }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog createNewBlog={addBlog} />
      </Togglable>
      <div>
        {blogs?.map((blog) =>  {

          return (
            <div style={blogStyle} key={blog.id}>
              <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
            </div>
          // <Blog
          //   key={blog.id}
          //   blog={blog}
          //   handleLike={updateBlogLike}
          //   handleRemove={deleteBlog}
          // />
          )})}
      </div>



    </div>
  )

}
export default Blogs
