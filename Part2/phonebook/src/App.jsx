import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const changeName = event => setNewName(event.target.value)

  const nameExists = person => person.name === newName

  const addClick = event => {
    event.preventDefault()
    persons.some(nameExists)? alert(`${newName} is already added to phonebook`): addNumber()
  }

  const addNumber = () =>{
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
          <button type="submit" onClick={addClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=> <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App