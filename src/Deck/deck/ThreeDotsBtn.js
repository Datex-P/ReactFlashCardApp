import React, { useState, useRef, useContext } from 'react'
import {withRouter} from 'react-router-dom'
import {Context} from '../../Context';

import useOutsideAlerter from '../../LittleComponents/useOutsideAlerter'

import trashimg from '../../icons/trash.svg'
import pauseimg from '../../icons/pause.svg'
import editimg from '../../icons/edit.svg'
import resetimg from '../../icons/reset.svg'
import saveimg from '../../icons/save.svg'
import playimg from '../../icons/play.svg'


function ThreeDotsBtn({    
                        text, showFromParent, style, className, editName, nameOfTopDeck, 
                        index, input, threeDotsContainer, setEditName,
                        
                        setShowFromParent = () => { },
                        editEvent = () => { }, 
                        trashEvent = () => { },

                        edit=false,trash=false,pause=false,reset=false,
                      }) 

{

  const [startAnimation, setStartAnimation] = useState(false)
  const [pauseIsActive, setPauseIsActive] = useState(true)
  
  const [show, setShow] = useState(showFromParent);
  const {dataBase, setDataBase} = useContext(Context);


  const handleClick = () => {
    setShow(!show);
    // setShowFromParent(!show)

  };

  const ref = useRef(null)


  function handleDeckname() {
    let newDataBase = {...dataBase}
    newDataBase.DeckNames[index].name = nameOfTopDeck
    //delete newDataBase.DeckNames[name]
    console.log(newDataBase)
    setDataBase(newDataBase)
  }


  useOutsideAlerter([ref,input], 
                    editName, 
                    ()=>{setShow(false)},
                    ()=>{
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
    let savePausedState = !pauseIsActive
    setPauseIsActive(savePausedState)
    dataBase.DeckNames[index].paused = !dataBase.DeckNames[index].paused
    setDataBase(newDataBase)
    setEditName(true)
    setShow(false)
    
  }


  return (
    <>
    {
      index && dataBase?.DeckNames[index].paused?
    
      null
    :

      <div style={threeDotsContainer}
      >
        <div 
            className='rotateLittleModal' 
            style={{height: '24px'}}
            onClick={
                    editName? 

                    handleClick                
                    : 
                    ()=>{} 
                    } 
          >
                  ...
       
        </div>

        {
          show &&
          
          <div 
            ref={ref}
            style={style}
            className={`ml-2 rounded mt-2 ${className}`}
          >

            {
              edit&&

              <button 
                  className='buttonStyling flexAlignCenter outline-none p-1 '
                  onClick={handleEdit} 
              >
                      
                  <img 
                      className={startAnimation ? 'blinkingIcon':''} 
                      src={editName? editimg: saveimg} 
                      alt='edit' 
                      style={{ marginRight: '3px' }}              
                  /> 

                {text}

              </button>
            }

            {
              pause&&

              <button 
                  className='buttonStyling flexAlignCenter outline-none p-1 '
                  onClick={handlePause}
                  style={{ borderTop: '1px solid black', borderBottom: '1px solid black' ,
                          borderLeft: dataBase.DeckNames[index].paused? '1px solid black': null,
                          borderRight: dataBase.DeckNames[index].paused? '1px solid black': null,
                          borderRadius: dataBase.DeckNames[index].paused? '5px': null
                        }}
              >
                  <img 
                      src={ pauseIsActive? pauseimg: playimg}  
                      alt='pause' 
                      style={{ marginRight: '3px'}} 
                  />

                  {text}

              </button>
            }

            {
              trash && 
              
              <button 
                className='buttonStyling flexAlignCenter outline-none p-1 '
                onClick={() => {
                    trashEvent()
                    setShow(false)
                }}
              >
                <img 
                      style={{ marginRight: '3px' }} 
                      src={trashimg} 
                      alt='trash' 
                />

                {text}

              </button>
            }
            {
              reset &&
              
              <button 
                  className='buttonStyling flexAlignCenter outline-none p-1'
                  onClick={() => {}}
              >

                <img 
                    src={resetimg} 
                    alt='reset' 
                    style={{ marginRight: '3px', width: '23px', height: '23px'}}  
                />

                {text}

              </button>
            }
          </div>
        }
      </div>   
 
    }
    </>
  );
}

export default  withRouter(ThreeDotsBtn)