require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', function getBody (req) {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(cors())//this allows me to process requests from any location
app.use(express.static('dist'))//runs my frontend
app.use(express.json())//formats to json so its readable
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))//logs to terminal all requests


//handles any errors catched
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

//returns all persons stored in database in json format
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
      response.json(persons)
    }).catch()
})

//
app.get('/info', (request, response) => {
  const now = new Date()
  response.send(`<p>Phonebook has info for ${notes.length} people</p>
                 <p>${now.toString()}</p>`)
})

//returns a specific person by id
app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id).then(person => {
  
      if(person){
      response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

   
  


//deletes a specific person by id
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  Person.findByIdAndDelete(id).then(result => response.status(204).end())
  .catch(error => next(error))

  response.status(204).end()
})



app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

person.save().then(savedPerson =>{
   response.json(savedPerson)
})
 
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body
  console.log("popopopo")
  Person.findById(request.params.id)
  .then(person => {
    console.log('this is put',person)
    if(!person){
      return response.status(404).end()
    }
    person.number = number
    person.name = name

    return person.save().then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})