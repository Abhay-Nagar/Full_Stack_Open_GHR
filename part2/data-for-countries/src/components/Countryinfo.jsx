import Languages from './Languages'
import Capitals from './Capitals'
import countryService from '../services/countries'
import {useState, useEffect} from 'react'

const Countryinfo = ({country}) =>{

    const [weather, setWeather] = useState(null)

    console.log('this is country info',country.capitalInfo.latlng)
    const imageUrl = country.flags.png
    

useEffect(() => {
    countryService.getWeather(country).then((response) =>{
    setWeather(response)
    })
    console.log(weather)
},[country])
   

if(!weather){
    return
}
const icon = weather.weather[0].icon
const iconUrl = `https://openweathermap.org/payload/api/media/file/${icon}.png`

return(
    <div>
        <h1>{country.name.common}</h1>
        <p>Capitals:</p>
        <Capitals capitals={country.capital}/>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <Languages languages={country.languages}/>
        <img src={imageUrl} alt={`Flag of ${country.name.common}`}/>
        <p>Temp: {weather.main.temp} Celsius</p>
        <img src={iconUrl}/>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
    
)}

export default Countryinfo