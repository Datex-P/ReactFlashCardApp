import React, {useState} from 'react'
import Child from  './Child'

export default function Parent(){
  
  const [tick, setTick] = useState(0)

  return(
    <div>
      <button onClick={()=>setTick(tick+1)}>{tick}</button>
      <Child tick={tick} setTick={setTick}/>
    </div>
    
  )
}