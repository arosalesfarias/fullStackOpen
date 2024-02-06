import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'

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

  const nameExists = person => person.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase()

  const addClick = event => {
    event.preventDefault()
    persons.some(nameExists)? replaceNumber(): addNumber()
  }

  const addNumber = () => {
    personService.post(newPerson)
    .then( data => {
        setPersons(persons.concat(newPerson))
        setNewPerson(returnPerson('','')) 
    })
  }

  const replaceNumber = () => {
    const [person] = persons.filter(nameExists)
    if( person.number === newPerson.number){
      alert(`${newPerson.name} is already added to phonebook`)
    }else{
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`) === true){
        const replacePerson = { ...newPerson, id: person.id }
        personService.update(replacePerson)
        .then(data => {
          const newPersons = persons.filter( p => p.id !== replacePerson.id)
          setPersons(newPersons.concat(replacePerson))
        })
        .catch(error => alert(`${replacePerson.name} ${error.response.statusText}`))
      }
    }
  }

  const personsFilter = () => 
    persons.filter( person => person.name.toLowerCase().includes(nameFilter.toLocaleLowerCase()))

  const removePerson = person => {
    if (window.confirm('Delete '+ person.name + '?' ) == true) {
      personService.remove(person)
      .then( data => {
        setPersons(persons.filter(
          p => p.id !== person.id
        ))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} changeNameFilter={changeNameFilter} />
      <h3>add a new</h3>
      <PersonForm newPerson={newPerson} changeName={changeName} changeNumber={changeNumber} addClick={addClick} />
      <h3>Numbers</h3>
      <Persons persons={personsFilter()} removePerson={removePerson}/>
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

const Persons = ({ persons, removePerson }) =>
  <>
    {persons.map((p)=> <Person key={p.name} person={p} removePerson={removePerson} />)}
  </>

const Person = ({ person, removePerson }) => {
  const removeButton = () => removePerson(person)

  return(
  <>
    <p>{person.name} {person.number} <button onClick={removeButton}>delete</button></p>
  </>
  )
}

export default App