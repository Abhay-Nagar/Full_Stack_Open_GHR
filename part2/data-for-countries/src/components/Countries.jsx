import Country from './Country'

const Countries = ({countries}) => {

    return(
        <ul>
            {countries.map(country => <Country key={country.cca3} country={country}/>)}
        </ul>
    )
}

export default Countries