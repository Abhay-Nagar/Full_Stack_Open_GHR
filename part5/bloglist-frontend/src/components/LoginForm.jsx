import blogService from '../services/blogs'
import loginService from '../services/login'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ loginUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const handleLogin = async (event) => {

    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log('fuckthisshit')
      loginUser(user)
      console.log('fuckthisshit2')
      console.log('wtfdgdgd', user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      navigate('../')
    } catch {
      setMessage('wrong credentials')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  return (
    <div>
      <h1>login form</h1>
      <h1>{message}</h1>
      <form onSubmit={handleLogin}>
        <div>
          <div>
            <label>
            username
              <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}/>
            </label>
          </div>
          <div>
            <label>
            password
              <input type="text" value={password} onChange={({ target }) => setPassword(target.value)}/>
            </label>
          </div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )

}

export default LoginForm