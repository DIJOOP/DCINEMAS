import React from 'react'
import { useLocation } from 'react-router-dom'



const TEST = () => {

    const location=useLocation()
  return (
    <div>
      <button onClick={()=>{
console.log(location);
      }} >click</button>
    </div>
  )
}

export default TEST
