import Mote from './components/Note'

const App = ({notes}) => {
  

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(banana => 
        <Mote key={banana.id} note={banana}/>
        )}
      </ul>
    </div>
  )
}

export default App
