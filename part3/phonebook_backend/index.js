const express = require('express')
const app = express()


app.use(express.json())

let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/info', (request, response) => {
  const now = new Date()
  response.send(`<p>Phonebook has info for ${notes.length} people</p>
                 <p>${now.toString()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
    console.log(`the id is ${id}`)
  if(note){
    response.json(note)
  }
  else{
    response.status(404).end()
  }
  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const Id = Math.floor(Math.random()*1000) 
  return String(Id)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
 
  const note = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})