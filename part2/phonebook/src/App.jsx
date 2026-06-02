import { useState } from 'react'

const Number = ({person}) => {

return(

  <p>{person.name} {person.number}</p>
)
}

const Filter = ({value, onChange}) => <div>filter shown with <input value={value} onChange={onChange}/></div>

const Persons = ({persons}) => <div>{persons.map(person => <Number key={person.name} person={person}/>)}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNewName = (event) =>{
    
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) =>{

    setNewNumber(event.target.value)
  }
  const addName = (event) => {
    
    event.preventDefault()
    const exists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (exists){
      
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    
    const newObject = {
      name: newName,
      number: newNumber
    }
    
    
    setPersons(persons.concat(newObject))
    setNewName('')
    setNewNumber('')
  
  }
  const handleFilter = (event) =>{

    setFilter(event.target.value)
  }

  const numbersToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter value={filter} onChange={handleFilter}/>
      
      
      <h2>add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={numbersToShow}/>
      
    </div>
  )
}

export default App