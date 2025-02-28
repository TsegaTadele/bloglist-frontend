/* eslint-disable linebreak-style */

import Togglable from './Togglable'
import { Link, useParams } from 'react-router-dom'
import { useNotification } from './NotificationContext'
import { useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import blogService from '../services/blogService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// component

const Blog = ({ blogs, handleLike }) => {
  const blogFormRef = useRef()
  const dispatch= useDispatch()
  const userInfo= useSelector((state) => state.user.userInfo)
  const id= useParams().id
  const blog=blogs.find(b => b.id=== id)
  const { addNotification } = useNotification()
  console.log(' on Blog page ' , blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const incrementLike = (event) => {
    event.preventDefault()
    updateBlogLike(blog)
  }
  const queryClient = useQueryClient()
  const newBlogs = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newB) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newB))
    },
  })
  const updateBlogs = useMutation({
    mutationFn:  blogService.updateBlog,
    onSuccess: (updatedB) => {
      const blog = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blog.map((b) => (b.id === updatedB.id ? updatedB : b))
      )
    },
  })

  const removeBlogs = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (_, variables) => {
      const blog = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blog.filter((b) => b.id.toString() !== variables.blog.id.toString())
      )
    },
  })


  const updateBlogLike = async (blog) => {
    try {
      updateBlogs.mutate({ blog })
      addNotification({ message: 'Updated', type: 'info' })
    } catch (error) {
      addNotification({ message: `${error}`, type: 'error' })
    }
  }
  const deleteBlog = async (blog) => {

    console.log('Delete Blog ', blog)
    try {
      removeBlogs.mutate({ blog })
      addNotification({ message: `${blog.title} is deleted `, type: 'info' })
    } catch (error) {
      addNotification({ message: `${error}`, type: 'error' })
    }
  }

  return (
    <div>
      <div className="blog"> <h2>{blog.title} </h2> </div>
      <Link to={blog.url}>{blog.url}</Link>
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
    </div>
  )
}

export default Blog
