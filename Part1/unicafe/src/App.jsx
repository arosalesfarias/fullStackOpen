import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [positive, setPositive] = useState(good / (good + neutral + bad) * 100)
  const [average, setAverage] = useState((good + neutral * 0 + bad * -1)/ (good + neutral + bad))

  const handleOnClikGood = () => {
    setGood(good+1)
    refreshStatisticts(good+1, neutral, bad)
  }
  const handleOnClikNeutral = () => {
    setNeutral(neutral+1)
    refreshStatisticts(good, neutral+1, bad)
  }
  const handleOnClikBad = () => {
    setBad(bad+1)
    refreshStatisticts(good, neutral, bad+1)
  }

  const refreshStatisticts = (_good, _neutral, _bad) => {
    setAverage((_good + _neutral * 0 + _bad * -1)/ (_good + _neutral + _bad))
    setPositive(_good / (_good + _neutral + _bad) * 100)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleOnClikGood}>good</button>
      <button onClick={handleOnClikNeutral}>neutral</button>
      <button onClick={handleOnClikBad}>bad</button>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

export default App
