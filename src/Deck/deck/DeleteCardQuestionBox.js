import flashcards from '../../icons/flashcards.svg'
import React, { useState, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import '../styles.css'
import questionMark from '../../icons/questionmark.svg'
import {Context} from '../../Context'

export default function DeleteCardQuestionBox({ card, deleteFrame, trashEvent, deleteCurrentCard=()=>{}}) 
  
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
        <img src={questionMark} 
               style={{ width: '40px', position: 'absolute', top: '-47px', right: '-10px'}}
            // className='d-flex justify-content-center align-items-center' 
            alt='questionMark' />
       <img src={questionMark} 
               style={{ width: '40px', position: 'absolute', top: '-65px', right: '-30px'}}
            // className='d-flex justify-content-center align-items-center' 
            alt='questionMark' />
      </div>
        <Modal.Header closeButton >
          <Modal.Title>
              <div className='d-flex justify-content-center align-items-center' style={{height:'100%', width: '100%'}}>

          <div>
             
          <img src={flashcards} 
               style={{ width: '26px', height: 'fit-content', marginRight: '20px' }}
            className='d-flex justify-content-center align-items-center' 
            alt='flashcards' />
            </div>
                 <div>  Delete {card} </div>
              </div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body 
        className='d-flex align-items-center' 
        style={{width:'100%', display: 'flex', justifyContent: 'center'}}  
        >
          Do you want to delete this {card} ?
        </Modal.Body>
        <Modal.Footer>


          <div className='d-flex justify-content-around align-items-center' 
          style={{width: '100%', border: '1px solid black'}}>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '75%' }}>

              {['No', 'Yes'].map(el =>
                <div className='deleteContainerNoAndYes d-flex justify-content-center align-items-center'
                  onClick={
                    () => {
                      deleteFrame()
                      if (el === 'Yes') {
                        trashEvent()
                        deleteCurrentCard()
                      }
                    }
                  }
                >{el}</div>
              )}

            </div>
          </div>

        </Modal.Footer>


      <div style = {{width: '300px', position: 'absolute', top: '194px', border: '1px solid black'
      }} 
      className='d-flex justify-content-center'>

      <div style={{width: '40px'}}>
      <input style= {{width: '45px'}} type='checkbox' 

      onChange={handleCheckbox}/>
    
      </div>
        <div style={{ width: '200px',  zIndex: '2', 
        color: 'white' }}>Don't show message again</div>

      </div>

      </Modal>
  );
}


