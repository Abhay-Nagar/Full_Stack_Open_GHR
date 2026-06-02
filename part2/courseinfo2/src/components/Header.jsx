


const Header = ({courseName}) => {
  console.log('this in header', courseName)
  
  return (
    <div>
      <h1>
        {courseName}
      </h1>
    </div>
  )
}

export default Header