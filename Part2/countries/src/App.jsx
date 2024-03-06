import { useState, useEffect } from "react"
import axios from "axios"

const App= () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const countriesEffect = () => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')//'https://restcountries.com/v3.1/all'
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
      <br/>
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
  return <>{result.map(country => <CountryItem key={country.name.common} country={country} />)}</>
}

const CountryItem = ({country}) =>{
  const [show, setShow] = useState(false)

  const changeShow = (event) => {
    setShow(!show)
  }
  return(
    <>
      {country.name.common} <button value={show} onClick={changeShow}>{show? "hide":"show"}</button>
      {show? <CountryDetail country={country} />: <></>}
      <br/>
    </>
  )
}

const CountryDetail = ({country}) => {
  const [capital] = country.capital
  const flag = country.flags

  return( 
    <>
      <h1>{country.name.common}</h1>
      <div>Capital: {capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      {Object.values(country.languages).map( lenguage => <li key={lenguage}>{lenguage}</li>)}
      <br/>
      <img src={flag.png} alt={flag.alt} />
      <br/>
    </>
  )
}

export default App
