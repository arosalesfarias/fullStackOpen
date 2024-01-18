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

export default Course