const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//handles get requests for all the blogs and fetches all blogs from mongoDB
blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
})

//handles post requests and posts a blog to mongoDB
blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  console.log('this is blog', blog)
  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)

})

//handles DELETE requests and deletes a blog from the mongodb by its id
blogsRouter.delete('/:id', async (request, response) => {
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