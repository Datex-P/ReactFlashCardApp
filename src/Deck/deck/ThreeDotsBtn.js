import React, { useState, useRef, useEffect } from 'react'
import trashimg from '../../icons/trash.svg'
import pauseimg from '../../icons/pause.svg'
import editimg from '../../icons/edit.svg'
import resetimg from '../../icons/reset.svg'
import useOutsideAlerter from '../../LittleComponents/useOutsideAlerter'



export default function ThreeDotsBtn({ text, showFromParent, setShowFromParent = () => { },
  editEvent = () => { }, trashEvent = () => { }, style,edit=false,trash=false,pause=false,reset=false}) {
  
    const [show, setShow] = useState(showFromParent);

  useEffect(() => {
    setShow(showFromParent)
  }, [showFromParent])

  const handleClick = () => {
    setShow(!show);
    setShowFromParent(!show)

  };

  const ref = useRef(null)
  useOutsideAlerter(ref, () => { setShow(false) })

  function handleTrash() {
    editEvent()
    setShow(false)
  }

  return (
    <div style={{ right: reset? '-65px' : '', position:'relative'   }}>
      <div onClick={handleClick} className='rotateLittleModal' >...</div>


      {/* cursor: el ===year? 'default':'pointer', margin: el===year? '5px': '', wi */}


      {show
        &&

        <div ref={ref} style={style}

          className='ml-2 rounded mt-2'>
          {edit&&<button onClick={handleTrash}

            className='buttonStyling flexAlignCenter outline-none p-1 '><img src={editimg} alt='edit' style={{ marginRight: '3px' }} />{text}</button>}
          
          {pause&&<button className='buttonStyling flexAlignCenter outline-none p-1 '
            style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>

            <img src={pauseimg} alt='pause' style={{ marginRight: '3px' }} />{text}
          </button>}
          {trash &&<button 
            onClick={() => {
              trashEvent()
              setShow(false)
            }}
            className='buttonStyling flexAlignCenter outline-none p-1 '>

            <img src={trashimg} alt='trash' style={{ marginRight: '3px' }} />{text}
          </button>}
          {reset &&<button 
            onClick={() => {
             
            }}
            className='buttonStyling flexAlignCenter outline-none p-1 '>

            <img src={resetimg} alt='reset' style={{ marginRight: '3px', width: '23px', height: '23px'}} />{text}
          </button>}
        </div>
      }
    </div>
  );
}


