import { useState, useEffect } from "react"
import axios from "axios"

const App= () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const countriesEffect = () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }
  useEffect(countriesEffect,[])

  const changeCountryFilter = event => setCountryFilter(event.target.value)

  const result = () => countries.filter( c => c.name.common.toLocaleLowerCase().includes(countryFilter.toLocaleLowerCase()))

  return(
    <>
      <div>
      find countries <input name='countryFilter' value={countryFilter} onChange={changeCountryFilter}/>
      </div>
      <Result result={result()} />
    </>
  )
}

const Result = ({result}) => {
  if (result.length > 10) { 
    return <>To many matches, specify another filter</>
  }
  if (result.length == 1) {
    const [head] = result 
    return <CountryDetail country={head} />
  }
  return <>{result.map(country => <p key={country.name.common}>{country.name.common}</p>)}</>
}

const CountryDetail = ({country}) => {
  const [capital] = country.capital
  
  return( 
    <>
      <h1>{country.name.common}</h1>
      <div>Capital: {capital}</div>
      <div>Population: {country.population}</div>
      <h3>Languages</h3>
      {Object.values(country.languages).map( lenguage => <li key={lenguage}>{lenguage}</li>)}
    </>
  )
}

export default App
