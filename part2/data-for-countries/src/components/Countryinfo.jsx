import Languages from './Languages'
import Capitals from './Capitals'

const Countryinfo = ({country}) =>{

    console.log('this is country info',country)
    const imageUrl = country.flags.png
return(
    <div>
        <h1>{country.name.common}</h1>
        <p>Capitals:</p>
        <Capitals capitals={country.capital}/>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <Languages languages={country.languages}/>
        <img src={imageUrl} alt={`Flag of ${country.name.common}`}/>
    </div>
    
)}

export default Countryinfo