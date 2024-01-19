import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number:'1234' }
  ]) 
  const returnPerson = (name , number) => ({name, number})

  const [ newPerson, setNewPerson ] = useState(returnPerson('',''))

  const changeName = event => setNewPerson(returnPerson(event.target.value , newPerson.number))

  const changeNumber = event => setNewPerson(returnPerson(newPerson.name , event.target.value))

  const nameExists = person => person.name === newPerson.name

  const addClick = event => {
    event.preventDefault()
    persons.some(nameExists)? alert(`${newPerson.name} is already added to phonebook`): addNumber()
  }

  const addNumber = () =>{
    setPersons(persons.concat(newPerson))
    setNewPerson(returnPerson('',''))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input name='newName' value={newPerson.name} onChange={changeName}/>
        </div>
        <div>
          Number: <input name='newNumber' value={newPerson.number} onChange={changeNumber}/>
        </div>
        <div>
          <button type="submit" onClick={addClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=> <p key={person.name}>{person.name} - {person.number}</p>)}
    </div>
  )
}

export default App