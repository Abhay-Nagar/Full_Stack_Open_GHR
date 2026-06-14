const blogsRouter = require('express').Router()
const Blog = require('../models/blog')







//handles get requests for all the blogs and fetches all blogs from mongoDB
blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//handles post requests and posts a blog to mongoDB
blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)

  const user = request.user
  if(!user){
    return response.status(401).json({ error: 'token invalid' })
  }

  blog.user = user.id
  const savedBlog = await blog.save()
  console.log(savedBlog)
  user.blogs = user.blogs.concat(savedBlog.id)

  await user.save()

  response.status(201).json(savedBlog)

})

//handles DELETE requests and deletes a blog from the mongodb by its id, need to add dunctionality to delete blogs ids from the user if deleted
blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  const blogToDelete = await Blog.findById(request.params.id)

  if(!blogToDelete){
    return response.status(401).json({ error: 'blog does not exist' })
  }
  if(!(user.id === blogToDelete.user.toString())){
    return response.status(401).json({ error: 'invalid user' })
  }
  request.user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)

  await request.user.save()
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {

  const { likes } = request.body

  const blogToUpdate = await Blog.findById(request.params.id)

  blogToUpdate.likes = likes


  const updatedBlog = await blogToUpdate.save()

  response.json(updatedBlog)
})
/*
blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)


  blog.save().then(savedBlog => {
    response.status(201).json(savedBlog)
  })
    .catch(error => next(error))

})
*/
module.exports = blogsRouter