const Course = ({ course }) => {

  const initTotal = course.parts.reduce(
    (sum, v) => sum + v.exercises
  , 0)

  return(
  <>
    <Header name={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total sum={initTotal} />
  </>
  )
}

const Header = ({ name }) => <h2>{name}</h2>

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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return <>
    <h1>Web development curriculum</h1>
    {courses.map( (course) => <Course key= {course.id} course={course} />)}
    </>
}

export default App