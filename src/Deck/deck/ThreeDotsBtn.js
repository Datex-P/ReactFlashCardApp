import React, { useState, useRef, useContext,useEffect } from 'react'
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
                        text, name,showFromParent, style, className, editButtonClicked, nameOfTopDeck, 
                        index, input, threeDotsContainer, setEditButtonClicked, 
                        setShowFromParent = () => { },
                        editEvent = () => { }, 
                        trashEvent = () => { },
                        edit=false,trash=false,pause=false,reset=false,paused
                      }) 

{

  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false)
  const [pauseIsActive, setPauseIsActive] = useState(true)
  const [threeDotsOpen, setThreeDotsOpen] = useState(showFromParent);
  const {dataBase, setDataBase} = useContext(Context);


  const handleClick = () => {
    setThreeDotsOpen(!threeDotsOpen);
    // setShowFromParent(!show)

  };

  const ref = useRef(null)

  useEffect(()=>{
    setThreeDotsOpen(showFromParent)
  },[showFromParent])


  function handleDeckname() {
    let newDataBase = {...dataBase}
    newDataBase.DeckNames[index].name = nameOfTopDeck
    //delete newDataBase.DeckNames[name]
    console.log(newDataBase)
    setDataBase(newDataBase)
  }


  useOutsideAlerter([ref,input], 
                    editButtonClicked, 
                    ()=>{
                      setThreeDotsOpen(false)
                    },
                    ()=>{
                    setBlinkingSaveIcon(true)
                    setTimeout(()=>{
                      setBlinkingSaveIcon(false)},
                      2000)
                    }                  
  )
    
    
  function handleEdit() {
    editEvent() 
    
    // !editName && setShow(false) 
    // other way of writing it
    if (!editButtonClicked) {
      // setThreeDotsOpen(false)
      handleDeckname()
    }
  }
  

  function handlePause () {
    let newDataBase = {...dataBase}
    let savePausedState = !pauseIsActive
    setPauseIsActive(savePausedState)
    let key = newDataBase.DeckNames.findIndex(deck=>deck.name === name)
    newDataBase.DeckNames[key].paused = true
    setDataBase(newDataBase)
    setEditButtonClicked(true)
    setThreeDotsOpen(false)
    
  }


  return (
    <>
    {
      paused?
    
      null
         :
      <div style={threeDotsContainer}
      >
        <div 
            className='rotateLittleModal' 
            style={{height: '24px'}}
            onClick={
                editButtonClicked? 

                handleClick                
                  : 
                ()=>{} 
            } 
          >
                  ...
       
        </div>

        {
          threeDotsOpen && 
          
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
                      alt='edit' 
                      style={{ marginRight: '3px' }}              
                      className={ blinkingSaveIcon ? 'blinkingIcon':'' } 
                      src={ editButtonClicked? editimg: saveimg } 
                  /> 

                {text}

              </button>
            }

            {
              pause&&

              <button 
                  className='buttonStyling flexAlignCenter outline-none p-1 '
                  onClick={handlePause}
                  style={{
                          borderTop: '1px solid black', borderBottom: '1px solid black' ,
                          borderLeft: dataBase.DeckNames[index].paused? '1px solid black': null,
                          borderRight: dataBase.DeckNames[index].paused? '1px solid black': null,
                          borderRadius: dataBase.DeckNames[index].paused? '5px': null
                        }}
              >

                  <img 
                      alt='pause' 
                      style={{ marginRight: '3px' }} 
                      src={ pauseIsActive? pauseimg: playimg }  
                  />

                  {text}

              </button>
            }

            {
              trash && 
              
              <button 
                className='buttonStyling flexAlignCenter outline-none p-1'
                onClick={() => {
                    trashEvent()
                    setThreeDotsOpen(false)
                }}
              >
                <img 
                      style={{ marginRight: '3px' }} 
                      src={ trashimg } 
                      alt='trash' 
                />

                {text}

              </button>
            }
            {
              reset &&
              
              <button 
                  className='buttonStyling flexAlignCenter outline-none p-1'
                  onClick={() => {}
                  }
              >

                <img 
                    src={resetimg} 
                    alt='reset' 
                    style={{ marginRight: '3px', width: '23px', height: '23px' }}  
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