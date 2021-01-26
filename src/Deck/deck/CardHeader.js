import React, {useState} from 'react'

export default function CardHeader({ bg,children, hoveredTitle, setHoveredTitle }) {

  const Hovered = {
//   backgroundColor:bg, zIndex:'3000',
//   height: 'fit-content',
//  width: '140px'
backgroundColor: 'yellow',
top: '-10px',
position:'absolute',
zIndex:30000
}

const notHovered = {
    backgroundColor:bg, zIndex:'3000',
    height: 'fit-content',
   width: '140px'
  }


  const [hovered, setHovered] = useState(false)
  const [cut, setCut] = useState(false)

  function cutWord(word) {
    if (word.length > 16) {
      //  setCut(true)
      return word.substr(0,13) + '...'
    }
    else {
 
      // setCut(false)
      return word.padEnd(16, '⠀')
    }
  }

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
          // cut? Hovered : notHovered
          // }
            // backgroundColor:bg,
             zIndex:30000,
            height: 'fit-content',
            width: '140px',
            backgroundColor: 'yellow',
            position: 'relative'
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