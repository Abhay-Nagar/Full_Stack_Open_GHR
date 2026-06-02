


const Header = ({courseName}) => {
  console.log('this in header', courseName)
  
  return (
    <div>
      <h2>
        {courseName}
      </h2>
    </div>
  )
}

export default Header