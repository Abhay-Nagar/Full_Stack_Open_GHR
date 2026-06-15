import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      setErrorMessage('wrong credentials')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken('')
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try{
    const blog = await blogService.create({title, author, url})
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogs(blogs.concat(blog))
    console.log('this is blog',blog)
    } catch (exception){
      console.log(exception)
    }
  }


  const loginForm = () => (
    <div>
    <h1>login form</h1>
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
    <h2>blogs</h2>
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <form onSubmit={handleCreate}>
      <div>
        <div>
        <label>
          title
          <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
        </label>
        </div>
        <div>
        <label>
          author
          <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/>
        </label>
        </div>
        <div>
        <label>
          url
          <input type="text" value={url} onChange={({target}) => setUrl(target.value)}/>
        </label>
        </div>
        <button type="submit">create</button>
      </div>
    </form>
      
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  return (
    <div>
      <h2>{errorMessage}</h2>
      {!user && loginForm()}
      {user && loggedIn()}
    </div>
  )
}

export default App