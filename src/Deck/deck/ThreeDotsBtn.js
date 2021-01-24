import React, { useState, useRef, useEffect } from 'react'
import trashimg from '../../icons/trash.svg'
import pauseimg from '../../icons/pause.svg'
import editimg from '../../icons/edit.svg'
import resetimg from '../../icons/reset.svg'
import saveimg from '../../icons/save.svg'
import playimg from '../../icons/play.svg'
import useOutsideAlerter from '../../LittleComponents/useOutsideAlerter'



export default function ThreeDotsBtn({ text, showFromParent, setShowFromParent = () => { },
  editEvent = () => { }, trashEvent = () => { }, style,edit=false,trash=false,pause=false,reset=false, className, 
  editName, pauseName, setPauseName = () => {}, pauseEvent = () => {}
}) {
  const [startAnimation, setStartAnimation] = useState(false)
    const [show, setShow] = useState(showFromParent);

  useEffect(() => {
    setShow(showFromParent)
  }, [showFromParent])

  const handleClick = () => {
    setShow(!show);
    setShowFromParent(!show)

  };

  const ref = useRef(null)



 
  
  useOutsideAlerter(ref, editName, ()=>{setShow(false)},()=>{
    setStartAnimation(true)
    setTimeout(()=>{setStartAnimation(false)},2000)
  } )
    
    

  
  

  function handleEdit() {
    editEvent() 
    if (!editName) {
      setShow(false)
    }

    // !editName && setShow(false) 
    // other way of writing it
  }

  function handlePause () {
    setPauseName(!pauseName)

    if (pauseName) {
      console.log('hello')
    }
  }

  return (
    <div style={{ right: reset? '-65px' : '', position:'relative'   }}>
      <div 
       onClick={editName? handleClick: ()=>{} } 
      className='rotateLittleModal' style={{height: '24px'}}>...</div>


      {show
        &&


        <div 
          ref={ref}
         style={style}

          className={`ml-2 rounded mt-2 ${className}`}>
          {edit&&<button onClick={handleEdit}

            className='buttonStyling flexAlignCenter outline-none p-1 '>
            <img className={startAnimation && 'blinkingIcon'} src={editName? editimg: saveimg} alt='edit' style={{ marginRight: '3px' }} />{text}</button>}
          
          {
            pause&&
            <button className='buttonStyling flexAlignCenter outline-none p-1 '
            style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }
            }
            onClick={handlePause}
            >
    
            <img src={pauseName? pauseimg: playimg} 
                 alt='pause' 
                 style={{ marginRight: '3px' }} />
                 {text}
          </button>
          }

          {
            trash &&<button 

            onClick={() => {
              trashEvent()
              setShow(false)
            }}
            className='buttonStyling flexAlignCenter outline-none p-1 '>

            <img src={trashimg} alt='trash' style={{ marginRight: '3px' }} />{text}
          </button>
          }
          {
            reset &&<button 

            onClick={() => {
             
            }
            }
            className='buttonStyling flexAlignCenter outline-none p-1 '>

            <img src={resetimg} alt='reset' style={{ marginRight: '3px', width: '23px', height: '23px'}} />{text}
          </button>
          }
        </div>
      }
    </div>
  );
}


