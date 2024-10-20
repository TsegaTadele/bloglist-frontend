/* eslint-disable linebreak-style */

import React, { useState } from 'react'

const NewBlog = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    createNewBlog(title,author,url)
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          title :
          <input
            type="text"
            value={title}
            name="title"
            data-testid='title'
            id='blog-title'
            placeholder='write title content here'
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author :
          <input
            type="text"
            value={author}
            id='blog-author'
            name="author"
            data-testid='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url :
          <input
            type="text"
            value={url}
            id='blog-url'
            data-testid='url'
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default NewBlog