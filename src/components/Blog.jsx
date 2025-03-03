/* eslint-disable linebreak-style */

import { Link, useParams } from 'react-router-dom'
import { useNotification } from './NotificationContext'
import { useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { useMutation, useQueryClient } from '@tanstack/react-query'
//services
import commentService from '../services/commentService'
import blogService from '../services/blogService'

// component
import Comment from './Comment'
import { Button, Container } from '@mui/material'

const Blog = ({ blogs, handleLike }) => {

  // const blogFormRef = useRef()
  // const dispatch= useDispatch()
  // const userInfo= useSelector((state) => state.user.userInfo)
  const id= useParams().id
  const blog=blogs?.find(b => b.id=== id)


  const { addNotification } = useNotification()

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
  const addComment= useMutation({
    mutationFn:commentService.addCommentToBlog,
    onSuccess: (updatedB) => {
      const blog = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blog.map((b) => (b.id === updatedB.id ? updatedB : b))
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

  const addCommentHandler =async ({ blogId, comment } ) => {

    addComment.mutate({ blogId, comment })
    addNotification({ message: 'Comment added successfully!' ,  type: 'info' })
  }

  if(!blog) {
    return
  }
  return (
    <Container>

      <div className="blog"> <h2>{blog?.title} </h2> </div>
      <Link to={blog?.url}>{blog?.url}</Link>
      <div>
        <span style={{ margin:'10px' }}   data-testid='likes' className="likes"> {`likes ${blog?.likes}`}</span>
        <Button variant="contained"  style={{ padding:'0px' }}  onClick={incrementLike}>like</Button>
      </div>
      <div>{blog.author}</div>
      <div></div>
      <Comment  blog={blog} addComment={addCommentHandler}/>

    </Container>

  )
}

export default Blog
