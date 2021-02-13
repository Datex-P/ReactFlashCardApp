import React, { useState} from 'react'
import CutWord from './CutWord'


export default function DeckOrCardName({ name, paused, index
                                      }) {

  const [hovered, setHovered] = useState(false)

  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

  return (

    <div   
        onMouseEnter={
          name.length > 14 && !paused ? 

          ()=> {setHovered(true) }
          : 
          null
        }
    
        onMouseLeave={() => setHovered(false)}
    
        className='deckOrCardNameContainer'
        style={{
            background: colors[index % 5],
            cursor: name.length > 13 && !paused ? 
              'pointer' 
                  : 
              'default'
      }}
    >
      {
        hovered
          ?
          <div
              className='hoveredDeckOrCardName'
              style={{
                  top: name.length > 17 && !paused ? 
                      '-13px' 
                        : 
                      '0px',
                  background: colors[index % 5],
                  cursor: name.length > 15 && !paused ? 
                      'pointer' 
                          : 
                      'default'
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