const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  console.log('hahahaha')
  const newUser = new User({
    name: 'Arto Hellas',
    username: 'hellas',
    password: 'Jmaps'
  })
  await newUser.save()
})

test('valid user can be succesfully added', async () => {

  const newUser = {
    username: 'mluukai',
    name: 'Matti Luukkainen',
    password: 'kforkode'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  const usernames = usersAtEnd.map(u => u.username)
  assert.strictEqual(usersAtEnd.length, 2)
  assert.ok(usernames.includes(newUser.username))

})

test.only('reject adding user with existing username', async () => {
  const usersAtStart = await helper.usersInDb()
  const newUser = {
    name: 'Arto Hellas',
    username: 'hellas',
    password: 'Jmaps'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  console.log('THIS IS BS',  result.body.error)
  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('expected `username` to be unique'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)

})

test('reject user if username is too short', async () => {
  const usersAtStart = await helper.usersInDb()
  const newUser = {
    username: 'ml',
    name: 'Matti Luukkainen',
    password: 'kforkode'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('`username` (`ml`, length 2) is shorter than the minimum allowed length '))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)

})

test('reject user if password is too short', async () => {
  const usersAtStart = await helper.usersInDb()
  const newUser = {
    username: 'mliikai',
    name: 'Matti Luukkainen',
    password: 'kf'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('password is shorter than minimum allowed length (3)'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)

})

after(async () => {
  await mongoose.connection.close()
})
