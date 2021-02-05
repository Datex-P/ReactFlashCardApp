import React, {useState} from 'react'
import CutWord from './CutWord'

export default function DeckOrCardname({ bg,name}) {

  const [hovered, setHovered] = useState(false)
 
  return (

    <div onMouseEnter={()=>{if (name.length>14){return setHovered(true)}}}
         onMouseLeave = {()=>{setHovered(false)}
         } 
         style={{height: '30px', 
         position: 'relative', 
         top: '4px', cursor: 'pointer', 
         width: '132px',background:bg
         }}    
    >
      {
        hovered
        ?
          <div 
          style={{
         
            zIndex:30000,
            width: '146px',
            height: '33px',
            top: name.length>16? '-13px': '0px',
            background: bg,
            position: 'relative'
           }}

           >{name}</div>
        :
          <CutWord name = {name} />
      }
    </div>
  )
}