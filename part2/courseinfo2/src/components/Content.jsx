import Part from './Part'

const Content = ({parts}) => {

  console.log('this in content', parts)
  return (
    <ul>
      
    {parts.map(banana => <Part key={banana.id} part={banana}/>)}
        
    </ul>
  )

}
export default Content