/* eslint-disable linebreak-style */

import { Button, Container, TextField, Grid } from '@mui/material';
import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
  }

  return (
    // <Container>
    //   <h2> log in to application</h2>
    //   <form onSubmit={onSubmit}>
    //     <div>
    //       <label>
    //       Username
    //         <input
    //           type="text"
    //           value={username}
    //           name="username"
    //           data-testid="username"
    //           onChange={({ target }) => setUsername(target.value)}
    //         />
    //       </label>
    //     </div>
    //     <div>
    //       <label>
    //       Password
    //         <input
    //           type="password"
    //           value={password}
    //           name="password"
    //           data-testid="password"
    //           onChange={({ target }) => setPassword(target.value)}
    //         />
    //       </label>
    //     </div>
    //     <Button variant="contained"  style={{margin:'2px'}} type="submit">Login</Button>
    //   </form>
    // </Container>
 <Container>
 <h2>Log in to application</h2>
 <form onSubmit={onSubmit}>
   <Grid container spacing={2}>
     <Grid item xs={12}>
       <TextField
         label="Username"
         variant="outlined"
         value={username}
         name="username"
         data-testid="username"
         onChange={({ target }) => setUsername(target.value)}
         fullWidth
       />
     </Grid>
     <Grid item xs={12}>
       <TextField
         label="Password"
         variant="outlined"
         type="password"
         value={password}
         name="password"
         data-testid="password"
         onChange={({ target }) => setPassword(target.value)}
         fullWidth
       />
     </Grid>
     <Grid item xs={12}>
       <Button variant="contained" style={{ margin: '2px' }} type="submit">Login</Button>
     </Grid>
   </Grid>
 </form>
</Container>
  )
}

export default Login