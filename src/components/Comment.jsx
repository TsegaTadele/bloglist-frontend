/* eslint-disable linebreak-style */
import { Button } from '@mui/material'
import React, { useState } from 'react'


const Comment = ({  blog,addComment }) => {

  const [comment, setComment] = useState('')


  if(!blog) return null


  const comments=blog?.comments
  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (comment.trim()) {
      try {
        addComment({ blogId:blog.id, comment })
        setComment('')
      } catch (error) {
        console.error('Error adding comment:', error)
        alert('Failed to add comment.')
      }
    }
  }

  return (
    <div>
      <h1>comments</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={handleChange}
          placeholder="Add a comment..."
        />
       
        <Button variant="contained"  style={{margin:'2px'}}  type="submit">Add Comment</Button>
      </form>

      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comment