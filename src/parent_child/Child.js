import React from 'react'


export default function Child({tick, setTick}){
  

  return(
    <div>
      <button onClick={()=>setTick(tick+1)}>{tick}</button>
    </div>
    
  )
}