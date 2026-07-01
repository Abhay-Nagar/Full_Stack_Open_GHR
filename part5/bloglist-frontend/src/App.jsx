import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Blogform from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Home from './components/Home'


const App = () => {

  const [user, setUser] = useState(null)

  //const blogFormRef = useRef()



  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      console.log('this is effect', user)
      blogService.setToken(user.token)
    }

  },[])



  const loginUser = (loggedInUser) => {
    setUser(loggedInUser)

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken('')
  }





  const padding = {
    padding: 5
  }

  const loggedOut = () => (
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/login">login</Link>
      </div>


      <Routes>
        <Route path="/login" element={ <LoginForm loginUser = {loginUser}/> } />
        <Route path="/" element={<Home handleLogout = {handleLogout} user= {user}/>} />
      </Routes>
    </Router>
  )

  const loggedIn = () => (
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <button onClick={handleLogout}>logout</button>
      </div>


      <Routes>
        <Route path="/" element={<Home user= {user}/>} />
      </Routes>
    </Router>
  )

  return(
    <div>
      {user && loggedIn()}
      {!user && loggedOut()}
    </div>
  )
}

export default App