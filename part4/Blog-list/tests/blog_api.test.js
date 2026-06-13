const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)




beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned in JSON format',async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  console.log(response.body.length)
})

test('all blogs are returned',async () => {
  const blogs = await api.get('/api/blogs')

  assert.strictEqual(blogs.body.length, helper.initialBlogs.length)
})

test('unique identifier is called id',async () => {

  const blogs = await api.get('/api/blogs')
  const blog = blogs.body[0]
  assert.ok(blog.id)
  assert.strictEqual(blog._id,undefined)
})

test('a valid note can be added', async () => {

  const newBlog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()
  assert.strictEqual(blogsAfter.length, helper.initialBlogs.length + 1)
})

test('likes property defaults to 0', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAfter = await helper.blogsInDb()
  const testBlog = blogsAfter.find(blog => blog.title === newBlog.title )

  assert.strictEqual(testBlog.likes, 0 )

})

test('if no title then responds with 400' ,async () => {
  const newBlog = {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('if no url then responds with 400' ,async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const idToDelete = '5a422ba71b54a676234d17fb'

  await api
    .delete(`/api/blogs/${idToDelete}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length-1)
})

test.only('a blog can be updated', async () => {

  const blogToUpdate = {
    id: '5a422ba71b54a676234d17fb',
    likes: 100,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect('Content-Type', /application\/json/)

  const blogsAfterUpdate = await helper.blogsInDb()
  const blogAfterUpdate = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)

  assert.strictEqual(blogAfterUpdate.likes, 100)

})

after(async () => {
  await mongoose.connection.close()
})
