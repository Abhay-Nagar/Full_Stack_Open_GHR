const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}


//handles get requests for all the blogs and fetches all blogs from mongoDB
blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//handles post requests and posts a blog to mongoDB
blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if(!decodedToken){
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if(!user){
    return response.status(401).json({ error: 'UserId missong or not valid' })
  }

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)

  await user.save()

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