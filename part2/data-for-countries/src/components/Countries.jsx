import Country from './Country'

const Countries = ({countries, onClick}) => {
    return(
        <ul>
          
            {countries.map(country => <Country key={country.cca3} country={country} onClick={onClick}/>)}
            
        </ul>
    )
}

export default Countries