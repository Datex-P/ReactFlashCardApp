import React, { useState, useContext } from 'react'
import CutWord from './CutWord'
import {Context} from '../../Context'


export default function DeckOrCardname({ name, index}) {

  const [hovered, setHovered] = useState(false)
  const { dataBase} = useContext(Context)
  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

  return (

    <div 
    
      onMouseEnter={
    
        name.length > 14 && !dataBase.DeckNames[index].paused ? 
        ()=> {setHovered(true) }
       
        :
       
        null
      }

      onMouseLeave={

        () => { setHovered(false)}
    
      }

      style={{
        height: '30px',
        position: 'relative',
        top: '4px', 
        cursor: name.length > 13 && !dataBase.DeckNames[index].paused ? 'pointer' : 'default',
        width: '148px', 
        background: colors[index % 5]
      }}
    >
      {
        hovered
          ?
          <div
              style={{

              zIndex: 30000,
              width: '146px',
              height: '33px',
              top: name.length > 17 && !dataBase.DeckNames[index].paused ? '-13px' : '0px',
              cursor: name.length > 15 && !dataBase.DeckNames[index].paused ? 'pointer' : 'default',
              position: 'relative',
              background: colors[index % 5]
            }}
          >
              {name}
          </div>
      
          :

          <CutWord name={name} />
      
      }
    </div>
  )
}