import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogform from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()
 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      console.log('this is effect', user)
      blogService.setToken(user.token)
    }
    
  },[])


 
  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
      setUser(user)
      console.log('wtfdgdgd', user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch {
      setMessage('wrong credentials')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken('')
  }

  const createBlog = async ({title, author, url}) => {

  try{
    blogFormRef.current.toggleVisibility
    const newBlog = {title, author, url}
    console.log('this is neBlog', newBlog)
    const blog = await blogService.create(newBlog)
    setBlogs(blogs.concat(blog))
    setMessage(`${blog.title} ${blog.author}`)
    setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception){
      setMessage('not a valid blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(exception)
    }
  }


  const loginForm = () => (
    <div>
    <h1>login form</h1>
    <h1>{message}</h1>
    <form onSubmit={handleLogin}>
      <div>
        <div>
        <label>
          username
          <input type="text" value={username} onChange={({target}) => setUsername(target.value)}/>
        </label>
        </div>
        <div>
        <label>
          password
          <input type="text" value={password} onChange={({target}) => setPassword(target.value)}/>
        </label>
        </div>
        <button type="submit">login</button>
      </div>
    </form>
    </div>
  )

  const loggedIn = () => (
    <div>
    <h1>blogs</h1>
    <h1>{message}</h1>
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <Blogform createBlog={createBlog} />
    </Togglable>
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && loggedIn()}
    </div>
  )
}

export default App