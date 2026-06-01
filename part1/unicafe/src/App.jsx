import { useState } from 'react'


const Button = ({onClick, text}) => <button onClick ={onClick}>{text}</button>

const StatisticsLine = ({displayValue, name}) => {

  return(

      <tr>
        <td>{name}</td>
        <td>{displayValue}</td>
      </tr>
    
  )
}

const Statistics = ({good, neutral, bad}) => {

  const total = good +neutral +bad
  const score = good-bad
  const avg = score/total
  const positive = good/total

  return(

    <table>
      <tbody>
      <StatisticsLine displayValue={good} name='good'/>
      <StatisticsLine displayValue={neutral} name='neutral'/>
      <StatisticsLine displayValue={bad} name='bad'/>
      <StatisticsLine displayValue={total} name='all'/>
      <StatisticsLine displayValue={avg} name='average'/>
      <StatisticsLine displayValue={positive} name='positive'/>
      </tbody>    
    </table>

    
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const[score, setScore] = useState(0)

  const handleGood = () => {

    setGood(good+1)
    setTotal(total+1)
    setScore(score+1)
  }
  const handleNeutral = () => {

    setNeutral(neutral+1)
    setTotal(total+1)
  }
  const handleBad = () => {

    setBad(bad+1)
    setTotal(total+1)
    setScore(score-1)
  }

  if(total === 0){

    return(

      <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text = 'good'/>
      <Button onClick={handleNeutral} text = 'neutral'/>
      <Button onClick={handleBad} text = 'bad'/>
      <h1>stats</h1>
      <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>

      <h1>give feedback</h1>
      <Button onClick={handleGood} text = 'good'/>
      <Button onClick={handleNeutral} text = 'neutral'/>
      <Button onClick={handleBad} text = 'bad'/>
      <h1>stats</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>

      
    </div>
  )
}

export default App
