/* eslint-disable linebreak-style */
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, setUser } from './reducer/userReducer'
import userService from './services/userService'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Services
import blogService from './services/blogService'
import loginService from './services/loginService'

// Components
import Blogs from './components/Blogs'
import Login from './components/Login'
import Togglable from './components/Togglable'
import { useNotification } from './components/NotificationContext'
import Notification from './components/Notification'
import UserList from './components/UserList'
import UserBlogs from './components/userBlogs'
import Blog from './components/Blog'

const App = () => {
  const { addNotification } = useNotification()

  const dispatch = useDispatch()
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

  const onLogin = async (username, password) => {
    try {
      console.log(username)
      const user = await loginService.login({
        username,
        password,
      })
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } catch (error) {
      let message = ''
      if (error.response && error.response.status === 401) {
        message = 'wrong username or password'
      }

      const myMessage = {
        message: message,
        type: 'error',
      }
      addNotification(myMessage)
    }
  }

  if (user === null)
    return (
      <div>
        <Notification />
        <Togglable buttonLabel={'Login'}>
          <Login handleLogin={onLogin} />
        </Togglable>
      </div>
    )

  return (
    <Router>
      <div><Link to="/blogs">blogs</Link>
        <Link to="/user">bsers</Link>
        {user?.username} logged in
        <button
          style={{ marginTop: '10px' }}
          onClick={() => dispatch(clearUser())}
        >
              logout
        </button>
      </div>

      <div>
        <h1>blog app</h1>
        <Notification />
        <div>

        </div>

        <Routes>
          <Route
            path="/user/:id"
            element={<UserBlogs userList={usersList} />}
          />

          <Route path="/user" element={<UserList usersList={usersList} />} />
          <Route path="/blog/:id" element={<Blog blogs={result.data} />} />
          <Route path="/blogs" element={<Blogs blogs={result.data} />} />
          <Route path="" element={<Blogs blogs={result.data} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
