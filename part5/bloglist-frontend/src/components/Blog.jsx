import { useState } from 'react'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'



const Blog = ({ blog, updateBlogs, user, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const belongsToUser = user?.username === blog.user?.username

  const [visable, setVisable] = useState(false)
  const [liked, setLiked] = useState(false)

  const showDelete = { display: belongsToUser ? '' : 'none' }
  const hideWhenLiked = { display: liked ? 'none' : '' }

  const handleLike = async () => {
    const updatedBlog = blog
    updatedBlog.likes +=1
    await blogService.update(updatedBlog)
    setLiked(true)
    console.log('this is blog comp',blog.likes)
    updateBlogs(blog)
  }

  if(!visable){
    return (
      <div className="blog">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>{blog.title} {blog.author}<button onClick={() => {setVisable(false)}} >hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={handleLike} style={hideWhenLiked}>like</button></div>
        <div>{blog.user?.name}</div>
        <button style={showDelete} onClick={() => deleteBlog(blog.id)}>delete</button>
      </div>
    )
  }
}

export default Blog