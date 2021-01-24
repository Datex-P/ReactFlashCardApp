import React, {useState} from 'react'

export default function CardHeader({ bg,children }) {

  const [hovered, setHovered] = useState(false)

  function cutWord(word) {
    if (word.length > 14) {
      return word.substr(0,11) + '...'
    }
    else {
 
      return word.padEnd(14, '⠀')
    }
  }

  return (

    <div onMouseEnter={()=>{setHovered(true)}}
         onMouseLeave = {()=>{setHovered(false)}
         } 
         style={{height: '30px', position: 'relative', top: 0}}    
    >
      {
        hovered
        ?
          <div style={{backgroundColor:bg, zIndex:'3000',
           position:"absolute",
            top:0,
           height: '30px'
           }}>{children}</div>
        :
          cutWord(children)
      }
    </div>
  )
}