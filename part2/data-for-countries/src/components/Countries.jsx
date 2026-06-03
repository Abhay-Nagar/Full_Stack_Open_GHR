import Country from './Country'

const Countries = ({countries, onClick}) => {
    console.log('this is countries', countries)
    return(
        <ul>
          
            {countries.map(country => <Country key={country.cca3} country={country} onClick={onClick}/>)}
            
        </ul>
    )
}

export default Countries