import flashcards from '../../icons/flashcards.svg'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import '../styles.css'
import questionMark from '../../icons/questionmark.svg'

export default function DeleteCardQuestionBox({ card, deleteFrame, trashEvent, deleteCurrentCard, onHide, checked, setChecked}) 
  
{



  const [show, setShow] = useState(true);
 

  const handleClose = () => {
    setShow(false) 
    onHide()
    alert('Some beer?')
   
  }
 

  return (
 
    checked?
    
    ()=>{deleteCurrentCard() }
    :
    <>
    

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
       
        id='deleteWindow'
        className='d-flex justify-content-center align-items-center'
      >
        <div>
        <img src={questionMark} 
               style={{ width: '40px', position: 'absolute', top: '-45px', right: '1px'}}
            // className='d-flex justify-content-center align-items-center' 
            alt='questionMark' />
       <img src={questionMark} 
               style={{ width: '40px', position: 'absolute', top: '-55px', right: '6px'}}
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
        // contentClassName={'modalHeader'}
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
                        onHide()
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
      // checked={checked} 
      onChange={()=> setChecked(!checked)}/>
    
      </div>
        <div style={{ width: '200px',  zIndex: '2', 
        color: 'white' }}>Don't show message again</div>

      </div>

      </Modal>
    </>
  );
}


