import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
const Home = ({ user }) => {

  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const deleteBlog = async (id) => {
    try{
      await blogService.atomize(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch(exception) {
      setMessage('unable to delete at this moment')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(exception)
    }
  }
  /*
  const createBlog = async ({ title, author, url }) => {

    try{
      blogFormRef.current.toggleVisibility
      const newBlog = { title, author, url }
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
*/
  const updateBlogsLikes = (updatedBlog) => {
    const updatedBlogs = blogs.map(blog => blog = updatedBlog.id === blog.id ? updatedBlog : blog)
    console.log('this is app comp',updatedBlogs)
    setBlogs(updatedBlogs)
  }
  const sortedBlogs = blogs.sort((a, b) => b.likes-a.likes)


  return (

    <div>
      <h1>blogs</h1>
      <h1>{message}</h1>
      {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} updateBlogs={updateBlogsLikes} user={user} deleteBlog={deleteBlog}/>)}
    </div>
  )
}

/*<h1>{message}</h1>
<Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <Blogform createBlog={createBlog} />
      </Togglable> */

export default Home