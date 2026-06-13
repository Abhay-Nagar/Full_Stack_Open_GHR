const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  console.log('this is blog', blog)
  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)

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