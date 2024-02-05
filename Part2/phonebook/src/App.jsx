import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const returnPerson = (name , number) => ({name, number})

  const [ newPerson, setNewPerson ] = useState(returnPerson('',''))
  const [ nameFilter, setNameFilter] = useState('')

  const personsEffect = () => {
    personService.getAll()
    .then(data => setPersons(data))
  }
  useEffect(personsEffect,[])

  const changeName = event => setNewPerson(returnPerson(event.target.value , newPerson.number))

  const changeNumber = event => setNewPerson(returnPerson(newPerson.name , event.target.value))

  const changeNameFilter = event => setNameFilter(event.target.value)

  const nameExists = person => person.name === newPerson.name

  const addClick = event => {
    event.preventDefault()
    persons.some(nameExists)? alert(`${newPerson.name} is already added to phonebook`): addNumber()
  }

  const addNumber = () => {
    personService.post(newPerson)
    .then( data => {
        setPersons(persons.concat(newPerson))
        setNewPerson(returnPerson('','')) 
    })
  }

  const personsFilter = () => 
    persons.filter( person => person.name.toLowerCase().includes(nameFilter.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} changeNameFilter={changeNameFilter} />
      <h3>add a new</h3>
      <PersonForm newPerson={newPerson} changeName={changeName} changeNumber={changeNumber} addClick={addClick} />
      <h3>Numbers</h3>
      <Persons persons={personsFilter()} nameFilter={nameFilter} />
    </div>
  )
}

const Filter = ({ nameFilter, changeNameFilter}) =>
  <div>
    filter show with<input name='nameFilter' value={nameFilter} onChange={changeNameFilter}/>
  </div>

const PersonForm = ({newPerson, changeName, changeNumber, addClick}) =>
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

const Persons = ({ persons }) =>
  <>
    {persons.map((p)=> <Person key={p.name} person={p}/>)}
  </>

const Person = ({ person }) => <p>{person.name} {person.number}</p>

export default App