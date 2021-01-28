import React, {useState} from 'react'
import CutWord from './CutWord'

export default function CardHeader({ bg,name}) {



  const [hovered, setHovered] = useState(false)
 
  return (

    <div onMouseEnter={()=>{setHovered(true)}}
         onMouseLeave = {()=>{setHovered(false)}
         } 
         style={{height: '30px', position: 'relative', top: '4px', cursor: 'pointer', 
         width: '132px',backgroundColor:bg
         }}    
    >
      {
        hovered
        ?
          <div 
          style={{
         
            zIndex:30000,
            height: 'fit-content',
            width: '149px',
            top: name.length>16? '-10px': '0px',
            backgroundColor: bg,
            position: 'relative'
           }}
      
           >{name}</div>
        :
          <CutWord name = {name} number = {16} />
      }
    </div>
  )
}