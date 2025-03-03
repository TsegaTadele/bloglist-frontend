/* eslint-disable linebreak-style */

import { Button, Container, TextField, Grid } from '@mui/material';
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
    <Container>
      <form onSubmit={onSubmit}>

        <Grid container spacing={2}>
          <Grid item xs={12}>

            <TextField
              label="Title"
              variant="outlined"
              value={title}
              name="title"
              data-testid='title'
              id='blog-title'
              placeholder='Write title content here'
              onChange={({ target }) => setTitle(target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Author"
              variant="outlined"
              value={author}
              id='blog-author'
              name="author"
              data-testid='author'
              onChange={({ target }) => setAuthor(target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="URL"
              variant="outlined"
              value={url}
              id='blog-url'
              data-testid='url'
              name="url"
              onChange={({ target }) => setUrl(target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" style={{ margin: '2px' }} type="submit">Save</Button>
          </Grid>
        </Grid>
      </form>
    </Container>

  // <Container>
  //   <form onSubmit={onSubmit}>
  //     <div>
  //       <label>
  //       title :
  //         <input
  //           type="text"
  //           value={title}
  //           name="title"
  //           data-testid='title'
  //           id='blog-title'
  //           placeholder='write title content here'
  //           onChange={({ target }) => setTitle(target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <label>
  //       author :
  //         <input
  //           type="text"
  //           value={author}
  //           id='blog-author'
  //           name="author"
  //           data-testid='author'
  //           onChange={({ target }) => setAuthor(target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <label>
  //       url :
  //         <input
  //           type="text"
  //           value={url}
  //           id='blog-url'
  //           data-testid='url'
  //           name="url"
  //           onChange={({ target }) => setUrl(target.value)}
  //         />
  //       </label>
  //     </div>
  //     <Button variant="contained"  style={{ margin:'2px' }}  type="submit">Save</Button>
  //   </form>
  // </Container>

  )
}

export default NewBlog