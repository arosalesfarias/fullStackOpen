import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const changeName = event => setNewName(event.target.value)

  const addNumber = event => {
    event.preventDefault()
    setPersons(persons.concat({ name : newName }))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input name='newName' value={newName} onChange={changeName}/>
        </div>
        <div>
          <button type="submit" onClick={addNumber}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=> <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App