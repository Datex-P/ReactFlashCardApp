import React, { useState, useContext } from 'react'
import {Context} from '../../Context'
import { Modal } from 'react-bootstrap'
import '../styles.css'

import questionMark from '../../icons/questionmark.svg'
import flashcards from '../../icons/flashcards.svg'

export default function DeleteCardQuestionBox({ card, deleteWindow, trashEvent, 
                                                setShowAnswerBtn,
                                                setShowRepeatBtn,
                                                setEditBtnClicked,
                                                deleteCurrentCard=()=>{}
                                              }) 
  
{

  const [show, setShow] = useState(true);
  const { dataBase, setDataBase} = useContext(Context)
 

  const handleClose = () => {
    console.log('hello')
    setShow(false) 
    
  }

  function handleCheckbox () {
  
    setDataBase({...dataBase,checkboxClicked: true})
  }
 

  return (
 
    
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        id='deleteWindow'
        dialogClassName='backgroundModal'
        contentClassName='widthFitContent'
        className='d-flex justify-content-center align-items-center'
      >
        <div>

            <img 
                src={questionMark} 
                 style={{ width: '40px', position: 'absolute', top: '-47px', right: '-10px'}}
                 alt='questionMark' 
            />
            <img 
              src={questionMark} 
               style={{ width: '40px', position: 'absolute', top: '-65px', right: '-30px'}}
               alt='questionMark'              
            />

        </div>
        <Modal.Header 
            closeButton 
        >
            <Modal.Title>
                <div 
                  className='d-flex justify-content-center align-items-center'           
                  style={{height:'100%', width: '100%'}}
                >
                  <div>
             
                      <img 
                          src={flashcards} 
                          className='d-flex justify-content-center align-items-center flashCardsStyling' 
                          alt='flashcards'                         
                      />
                  </div>

                  <div>  Delete {card} </div>
              </div>
            </Modal.Title>
        </Modal.Header>

        <Modal.Body 
            className='d-flex align-items-center justify-content-center' 
        >

            Do you want to delete this {card} ?

        </Modal.Body>

        <Modal.Footer>

            <div 
                className='d-flex justify-content-around align-items-center' 
                style={{width: '100%', height: '14px'}}
            >

                <div 
                    style={{ display: 'flex', justifyContent: 'space-around', width: '75%' }}
                >

                    {
                      ['No', 'Yes'].map(el =>
                          <div 
                              className='deleteContainerNoAndYes d-flex justify-content-center align-items-center'
                              onClick={() => {
                                if (el === 'Yes') {
                                  trashEvent()
                                  deleteCurrentCard()
                                  setShowRepeatBtn(false)
                                  setShowAnswerBtn(true)
                                  setEditBtnClicked(false)
                                }

                                deleteWindow()
                              }}
                          >

                            {el}
                          </div>
                          )
                    }
                </div>
            </div>

        </Modal.Footer>


      <div 
          className='d-flex justify-content-center'
          style = {{width: '300px', position: 'absolute', top: '175px'
                  }} 
      >

          <div style={{width: '40px'}}
          >

              <input 
                  style= {{width: '45px'}} 
                  type='checkbox' 
                  onChange={handleCheckbox}
              />
    
          </div>

          <div style={{ width: '200px', zIndex: '2', color: 'white'}}
          >

            Don't show message again
          </div>
      </div>

      </Modal>
  );
}


