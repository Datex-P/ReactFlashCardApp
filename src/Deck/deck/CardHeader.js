import React, {useState} from 'react'

export default function CardHeader({ bg,children }) {

  const [hovered, setHovered] = useState(false)

  function cutWord(word) {
    if (word.length > 13) {
      return word.substr(0,5) + '...'
    }
    else {
 
      return word.padEnd(10, '⠀')
    }
  }

  return (

    <div onMouseEnter={()=>{setHovered(true)}}
         onMouseLeave = {()=>{setHovered(false)}
         }     
    >

      {
        hovered
        ?
          <div style={{backgroundColor:bg, zIndex:'3000', position:"absolute", top:0}}>{children}</div>
        :
          cutWord(children)
      }
    </div>
  )
}