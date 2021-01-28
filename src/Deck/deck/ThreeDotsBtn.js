import React, { useState, useRef, useEffect, useContext } from 'react'
import trashimg from '../../icons/trash.svg'
import pauseimg from '../../icons/pause.svg'
import editimg from '../../icons/edit.svg'
import resetimg from '../../icons/reset.svg'
import saveimg from '../../icons/save.svg'
import playimg from '../../icons/play.svg'
import useOutsideAlerter from '../../LittleComponents/useOutsideAlerter'
import {Context} from '../../Context';
import {withRouter} from 'react-router-dom'



function ThreeDotsBtn({ text, showFromParent, setShowFromParent = () => { },
  editEvent = () => { }, trashEvent = () => { }, style,edit=false,trash=false,pause=false,reset=false, className, 
  editName, name, nameOfTopDeck, history, index, input, threeDotsContainer

  , pauseName, setPauseName = () => {}, pauseEvent = () => {}
}) {

  const [startAnimation, setStartAnimation] = useState(false)
  
  const [show, setShow] = useState(showFromParent);
  const {dataBase, setDataBase} = useContext(Context);

  // useEffect(() => {
  //   setShow(showFromParent)
  // }, [showFromParent])

  const handleClick = () => {
    setShow(!show);
    setShowFromParent(!show)

  };

  const ref = useRef(null)
  // const {ref, ref1} = useRef(null)

  function handleDeckname() {
    let newDataBase = {...dataBase}
    newDataBase.DeckNames[index].name = nameOfTopDeck
    //delete newDataBase.DeckNames[name]
    console.log(newDataBase)
    setDataBase(newDataBase)
  
  }


  useOutsideAlerter([ref,input], editName, ()=>{setShow(false)},()=>{
    setStartAnimation(true)
    // input.current.focus()
    setTimeout(()=>{setStartAnimation(false)},2000)
  } )
    
    
  function handleEdit() {
    editEvent() 
    // !editName && setShow(false) 
    // other way of writing it
    if (!editName) {
      setShow(false)

      handleDeckname()
    }
  }
  

  function handlePause () {
    let newDataBase = {...dataBase}
    pauseEvent()
    let newPauseName = !pauseName
    setPauseName(newPauseName)
    dataBase.DeckNames[index].paused =  !dataBase.DeckNames[index].paused
    setDataBase(newDataBase)
    
  }


// <div style={{ right: reset? '-65px' : '50px', position:'fixed'}}></div>

  return (
    <div style={threeDotsContainer}>
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
            <img className={
              startAnimation ? 'blinkingIcon':''} 
              src={editName? editimg: saveimg} 

              alt='edit' style={{ marginRight: '3px' }} />{text}</button>}       
          {
            pause&&
            <button className='buttonStyling flexAlignCenter outline-none p-1 '
            style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }
            }
             onClick={handlePause}
             >
            <img src={ pauseName? pauseimg: playimg}  alt='pause' 
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


export default  withRouter(ThreeDotsBtn)