import React, {useContext, useState, useRef, useEffect} from 'react'
import { Modal } from 'react-bootstrap'
import { Context } from '../../Context'//step 4.1 import context instance

import redCross from '../../icons/redCross.svg'

export default function CreateNewDeck({ addNewDeckWindow, setDecksAreVisible, close, setActive}) 

{
  const { dataBase, setDataBase } = useContext(Context)
  const [inputField, setInputField] = useState('')

  const inputRef = useRef(null);

  useEffect(() => {
    if (addNewDeckWindow) {
      inputRef.current.focus();
    }
  }, [addNewDeckWindow]);



  function addNewDeckName() {

    let newDataBase = { ...dataBase }

    if (newDataBase.DeckNames.find(deck=>deck.name ===inputField)) {

      alert('Name of Deck already exists')
      setInputField('')
      
    } else if (!inputField) {
    
      alert('Input needed')
    } else if (document.getElementById('inputField').value.length > 25) {
    
      alert('Deckname is too long')
      document.getElementById('inputField').value= '';
      document.getElementById('inputField').focus();
    
    } else if (document.getElementById('inputField').value.length < 3) {
    
      alert('Deckname is too short')
      document.getElementById('inputField').value= '';
      document.getElementById('inputField').focus();
    
    } else {
    
      console.log('it works')
      let index = newDataBase.DeckNames.push({        
        name: inputField,
        data: [],
        toStudyGoal: 20,
        cardsToday: 0
      })
      setActive(index-1)
      setDataBase(newDataBase)
      close()
    }
  }

  return (

         <Modal
            show={addNewDeckWindow}       
            backdrop="static"
            keyboard={false}
            id = 'createDeck'
            centered
          >
          
              <Modal.Header >

                  <Modal.Title>
                      Name for new deck
                  </Modal.Title>

                  <button 
                      className='redCross'
                      onClick={() => {
                                addNewDeckWindow(false)
                                setDecksAreVisible(true)
                      }} 
                  >
                    <img 
                        className='nonDraggableIcon'
                        src={redCross} 
                        alt='redCross' 
                        style={{
                            position: 'relative', top: '0px', right: '-9px', width: '15px'
                        }}   
                    />
                  </button>
              </Modal.Header>

              <Modal.Body className='d-flex flex-column align-items-center'
              >
     
                <input 
                    id='inputField'
                    className='createNewDeckInputField'
                    minLength='3'
                    maxLength='25'    
                    ref={inputRef}
                    onChange={ event => setInputField(event.target.value)
                    }  
                >           
                </input>

                <select style={{
                                 width: '96%', height: '26px', borderRadius: '5px', 
                                paddingLeft: '3px', outline: 'none', cursor: 'pointer' 
                                }}
                >
                  <option>option 1</option>
                  <option>option 2</option>
                  <option>option 3</option>
                  <option>option 4</option>
                  <option>option 5</option>
                </select>
              
              </Modal.Body>
      
              <div 
                  className='d-flex justify-content-between' 
                  style={{ width: '57%', top: '-8px', position: 'relative' }}
              >
                  {
                      ['Cancel', 'Ok'].map((el) =>
                      
                        <button
                            className='generalButtonStyling okCancelButtonStyling'
                            onClick={() => {

                              el === 'Cancel' ?

                              close()
                              :
                              addNewDeckName()
                              }}
                        >
                        
                          {el}
                        </button>
                        )
                  }
              </div>
      </Modal> 
  )
}



