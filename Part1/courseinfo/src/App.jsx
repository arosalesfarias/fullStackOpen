import { useState } from "react";

const Course = ({ course }) => {
  const {total, setTotal} = useState(0)

  const initTotal = () => {
    let sum = 0
    for (let index = 0; index < course.parts.length; index++) {
      sum += course.parts[index].exercises
    }
    return sum
  }

  return(
  <>
    <Header name={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total sum={initTotal()} />
  </>
  )
}

const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sum }) => <p><strong>Total of {sum} exercises</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part)=> <Part key={part.id} part={part}/>)}  
  </>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  }

  return <Course course={course} />
}

export default App