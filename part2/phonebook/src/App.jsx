import { useState, useEffect} from 'react'
import phonebookService from './services/phonebook'



const Number = ({person, onDelete}) => {

return(

  <div>{person.name} {person.number}<button onClick={onDelete}>delete</button></div>
)
}

const Filter = ({value, onChange}) => <div>filter shown with <input value={value} onChange={onChange}/></div>

const Persons = ({persons, onDelete}) => <div>{persons.map(person => <Number key={person.name} person={person} onDelete={() => onDelete(person.id)}/>)}</div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() =>{

    console.log('calling getAll')
    phonebookService.getAll().then( response =>{

  
      setPersons(response)
      
    })

  },[])


  const handleNewName = (event) =>{
    
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) =>{

    setNewNumber(event.target.value)
  }
  const addPerson = (event) => {
    
    event.preventDefault()
    const exists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    const newObject = {
      name: newName,
      number: newNumber
    }
    if (exists){
      
      if(window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
        const pers = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        phonebookService.update(pers.id, newObject).then(response => {

          setPersons(persons.map(person => person.id === pers.id ? response : person))

        })
      setNewName('')
      setNewNumber('')
      return
      }
      return
    }
    

    
    
    phonebookService.create(newObject).then(person =>{

      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    })
    
    
  
  }
  const handleFilter = (event) =>{

    setFilter(event.target.value)
  }

  const handleDelete = (id) => {

    const pers = persons.find(person => person.id === id)
    
    if(window.confirm(`Delete ${pers.name} ?`)){
    console.log('this is handleDelete', id)
    phonebookService.destroy(id).then( ()=> {
      console.log("this is id in delete handler", id)
      setPersons(persons.filter(person => person.id !== id))
    
    })
  }
  }
  console.log('this is final lof', persons)
  const numbersToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter value={filter} onChange={handleFilter}/>
      
      
      <h2>add new</h2>
      <form onSubmit={addPerson}>
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
      <Persons persons={numbersToShow} onDelete={handleDelete}/>
      
    </div>
  )
}

export default App