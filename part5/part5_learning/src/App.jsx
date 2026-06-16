import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import './index.css'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'
import Logform from './components/Logform'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {

  
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

   useEffect(() => {
    console.log('calling getAll')
    noteService
      .getAll()
      .then(banana => {
        console.log('promise fulfilled')
        setNotes(banana)
      })
  }, [])

 useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

 

  const toggleImportanceOf = id => {

      console.log('loggle importance of', id)
  
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  noteService.update(id, changedNote).then(response => {
    setNotes(notes.map(note => note.id === id ? response : note))
  }).catch(error => {
      setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        console.log(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
}

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
      setUser(user)
      setUsername('')
      setPassword('')
      noteService.setToken(user.token)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )
  
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <Logform
    username={username}
    password={password}
    handleUsernameChange={({ target }) => setUsername(target.value)}
    handlePasswordChange={({ target }) => setPassword(target.value)}
    handleSubmit={handleLogin}
  />
      </Togglable>
  )

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      


      {!user && (
      <div>
        {loginForm()}
      </div>
    )}
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user && (
      <div>
        <p>{user.name} logged in</p>
        {noteForm()}
      </div>
    )}
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
        <Footer />
    </div>
  )
}

export default App