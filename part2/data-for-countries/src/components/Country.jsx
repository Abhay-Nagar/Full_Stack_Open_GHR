
const Country = ({country, onClick}) => {


return(
<li>
    {country.name.common}
    <button onClick={() => onClick(country)}>Show</button>
</li> 

)
}
export default Country