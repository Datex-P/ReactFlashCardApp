import React, {useState} from 'react'

export default function CardHeader({ bg,children, hoveredTitle, setHoveredTitle }) {


  const [hovered, setHovered] = useState(false)

  function cutWord(word) {
    if (word.length > 16) {
      return word.substr(0,13) + '...'
    }
    else {
 
      return word.padEnd(16, '⠀')
    }
  }

  return (

    <div onMouseEnter={()=>{setHovered(true)}}
         onMouseLeave = {()=>{setHovered(false)}
         } 
         style={{height: '30px', position: 'relative', top: '4px', cursor: 'pointer', 
         width: 'fit-content'
         }}    
    >
      {
        hovered
        ?
          <div style={{backgroundColor:bg, zIndex:'3000',
           height: 'fit-content',
          width: '140px'
          
           }}
           onMouseEnter = {() => {setHoveredTitle(false)}}
           onMouseLeave = {() => {setHoveredTitle(true)}}
           >{children}</div>
        :
          cutWord(children)
      }
    </div>
  )
}