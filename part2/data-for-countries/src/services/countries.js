import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup

const getAll = () =>{


const request = axios.get(baseURL)

return request.then(response =>response.data)
    
}


const getWeather = (country) => {

  const [lat, lon] = country.capitalInfo.latlng

  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    )
    .then(response => response.data)
}

export default {getAll, getWeather}

