import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import Countryinfo from './components/Countryinfo'

const App = () => {

const [filter, setFilter] = useState('')
const [countries, setCountries] = useState(null)


//handleFilter updates the filter state every time you enter a digit into the input box
const handleFilter = (event) =>{
  setFilter(event.target.value)
}

//Handles clicking the how button, we pass in the arg in the country comp
const handleShowButton = (country) => {
  setFilter(country.name.common)
}

//this useEffect runs upon first render, loads all data from the db
useEffect(() =>{
  countryService.getAll().then(response =>setCountries(response))
      },[])

//this statement ensures no errors occur on first render when countries===null
if(!countries){
  return
}

//filters the countries array to remove any countries that dont include filter
const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

//renders different html if the num of countries that include filter is >10
if(countriesToShow.length>10){
  return(
    <div>
    <input value={filter} onChange={handleFilter}/>
    <p>Too many matches, specify another filter</p>
  </div>
)}

//just renders a list of countries if not narrowed down to 1 yet
if(countriesToShow.length>1){
return(
//Renders list of Countries
  <div>
    <input value={filter} onChange={handleFilter}/>
    <Countries countries={countriesToShow} onClick={handleShowButton}/> 
  </div>
)}

//make sure that we dont try render an empty list to Countryinfo
if(countriesToShow.length===1){
return(
  <div>
    <input value={filter} onChange={handleFilter}/>
    <Countryinfo country={countriesToShow[0]}/>
  </div>
)
}

return(
  <div>
    <input value={filter} onChange={handleFilter}/>
    <p>No countries match filter</p>
  </div>
)
}

export default App