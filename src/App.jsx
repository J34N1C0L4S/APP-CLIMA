import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import ClimateCard from './components/ClimateCard'

function App () {
  
    const [coords, setCoords] = useState()
    const [weather, setweather] = useState()
    const [temp, setTemp] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {

    const success = pos => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      })
    }

    const error = () => {
      setHasError(true)
      setIsLoading(false)
    }

    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

    useEffect(() => {
    if(coords) {
      const API_Key = '3fc47577e30987b6a253606f36afbaee'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_Key}`

      axios.get(url)
        .then(res => {
          setweather(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const fahrenheit = (celsius * 9/5 + 32).toFixed(1)
          setTemp({celsius, fahrenheit})
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }, [coords])

  console.log(weather)
  return (
    <div className='app'>
      {
        isLoading 
          ? <h1 className='loading'>loadin...</h1>
          : (
            hasError
              ? <h1>Debes acceder a la ubicacion.</h1>
              : 
            <ClimateCard
              weather={weather}
              temp={temp}
              />
          )
      }      
    </div>
  )
}

export default App