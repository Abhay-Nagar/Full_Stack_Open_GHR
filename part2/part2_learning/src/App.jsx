import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

   useEffect(() => {
    console.log('calling getAll')
    noteService
      .getAll()
      .then(banana => {
        console.log('promise fulfilled')
        setNotes(banana)
      })
  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = event => {

  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
  }

  
  noteService.create(noteObject).then( apple =>{
      setNotes(notes.concat(apple))
      setNewNote('')
  })
  

    
    
}

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

    const toggleImportanceOf = id => {

      console.log('loggle importance of', id)
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  noteService.update(id, changedNote).then(response => {
    setNotes(notes.map(note => note.id === id ? response : note))
  }).catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
}

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App