import {useState} from 'react'
import blogService from '../services/blogs'




const Blog = ({ blog }) => {

 const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


const [visable, setVisable] = useState(false)

const handleLike = async () => {
  blog.likes +=1
  console.log(blog)
  await blogService.update(blog)
}

if(!visable){
  return (
  <div>
    {blog.title} {blog.author}
    <button onClick={() => {setVisable(true)}}>view</button>
  </div>  
)
} else {
  return (
    <div style={blogStyle}>
    <div>{blog.title} {blog.author}<button onClick={() => {setVisable(false)}}>hide</button></div>
  <div>{blog.url}</div>
  <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
  <div>{blog.user.id}</div>
  </div>
  )
}
} 

export default Blog