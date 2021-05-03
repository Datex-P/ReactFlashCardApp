import React, { useState, useContext } from 'react';
import { Context } from '../../Context'

export default function InputCheckbox({ index, setShowAnswerBtn, generateRandom }) {
  // let [clicked, setClicked] = useState(false)
  const { dataBase, setDataBase } = useContext(Context)
  let newDataBase = {...dataBase}


  function cardsPaused() {
    console.log('function cardsPaused was fired')

    return dataBase.DeckNames[index].data.filter(x => x.paused === true).length || 0
  }

  function handleChecked (e) {
    if(dataBase.DeckNames[index].editModeActive) {
    document.getElementById('myonoffswitch').checked = false
    }
  }


  return (


    <div
    >
      <input type="checkbox" name="onoffswitch"
        className="onoffswitch-checkbox myonoffswitch"
        id="myonoffswitch"
        tabIndex="0"
        // {cardsPausedAndClicked? defaultChecked={true} : defaultChecked={false} }
        // defaultChecked: cardsPausedAndClicked? {true}: {false}
        //  checked={false}
        onChange={handleChecked}
        value='10'
      />


      <label className="onoffswitch-label" htmlFor="myonoffswitch"
       onClick={() => {

          if(!dataBase.DeckNames[index].editModeActive) {

          if (dataBase.DeckNames[index].data.filter(x => x.paused === true).length === 0) {
            console.log('no cards paused')
          } else {
          
              if(dataBase.DeckNames[index].pauseMode) {
              dataBase.DeckNames[index].pauseMode=false
              setDataBase(newDataBase)
              setShowAnswerBtn(true)
        
            }  else {
              dataBase.DeckNames[index].pauseMode=true
              setDataBase(newDataBase)
              setShowAnswerBtn(false)
              generateRandom()
          }
         
        }
           // console.log(dataBase.DeckNames[index].pauseMode, 'pasuemode')
      }
       }
       }
      
      >
        <span className="onoffswitch-inner"></span>
        <span className="onoffswitch-switch d-flex justify-content-center align-items-center">
          {`${cardsPaused()}`}
        </span>
      </label>

    </div>

  )
}