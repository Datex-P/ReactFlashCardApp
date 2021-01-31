import React, {useState} from 'react'
import CutWord from './CutWord'

export default function DeckOrCardname({ bg,name}) {

  const [hovered, setHovered] = useState(false)
 
  return (

    <div onMouseEnter={()=>{if (name.length>14){return setHovered(true)}}}
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
            width: '146px',
            border: '1px solid black',
            height: '33px',
            top: name.length>15? '-13px': '0px',
            backgroundColor: bg,
            position: 'relative'
           }}
      
           >{name}</div>
        :
          <CutWord name = {name} />
      }
    </div>
  )
}