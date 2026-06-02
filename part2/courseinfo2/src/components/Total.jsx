
const Total = ({parts}) => {

    const exercises = parts.map(part => part.exercises)
    console.log("this is the exercises arr", exercises)
    const total = exercises.reduce((sum, number)=>sum+number,0)
  return (
    <div>
      <p>

        total of {total} exercises
       
      </p>
    </div>
  )
}

export default Total