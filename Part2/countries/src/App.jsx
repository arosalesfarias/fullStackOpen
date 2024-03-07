import { useState, useEffect } from "react"
import axios from "axios"

const App= () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const countriesEffect = () => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
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
  const api_key = import.meta.env.VITE_SOME_KEY
  const [capital] = country.capital
  const flag = country.flags
  const [weather, setWeather] = useState(null)
  const [lat,lng] = country.capitalInfo.latlng
  console.log(lat,lng)
  const WeatherEffect = () => {
    axios.get('https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+lng+'&appid='+api_key)
      .then(res => setWeather(res.data))
  }
  useEffect(WeatherEffect,[])
  if (!weather) return null
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
      <h2>Weather in {capital}</h2>
      <div>temperature {(weather.current.temp - 273.15).toFixed(2) } Celsius</div>
      <div>wind { weather.current.wind_speed } m/s</div>
    </>
  )
}

export default App
