import flashcards from '../../icons/flashcards.svg'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import '../styles.css'
import questionMark from '../../icons/questionMark.svg'

export default function DeleteCardQuestionBox({ card, deleteFrame, trashEvent, onHide
  //  setShowRepeat
  
  }) {


    // checkbox.onchange = function (e) {
    //   dataBase.showDeleteFrame = !e.target.checked;
    //   console.log('still alive and well')
    // }


  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false) 
    onHide()
    alert('Some beer?')
    // setShowRepeat(false) 
  }
  // const handleShow = () => setShow(true);

  // setShowRepeat(false)
                    
  //         setShowAnswer(true)

  return (
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









          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button> */}
        </Modal.Footer>

        {/* let checkBoxContainer = createElement('div', '', {
    width: '40px'
  }, 'checkBoxContainer');
  let checkbox = createElement('input', '', {
    width: '45px'
  });
  checkbox.setAttribute('type', 'checkbox');

  checkbox.onchange = function (e) {
    dataBase.showDeleteFrame = !e.target.checked;
    console.log('still alive and well')
  } */}


      <div style = {{width: '300px', position: 'absolute', top: '194px', border: '1px solid black'
      }} 
      className='d-flex justify-content-center'>

      <div style={{width: '40px'}}>
      <input style= {{width: '45px'}} type='checkbox' />
      </div>
        <div style={{ width: '200px',  zIndex: '2', 
        color: 'white' }}>Don't show message again</div>

      </div>




      </Modal>
    </>
  );
}






// function Example() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Launch static backdrop modal
//       </Button>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title><div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: 'rgba(200, 168, 115, 0.95', height: '35px', width: '100%', color: 'white', fontWeight: 'bold', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}><img src={flashcards} style={{ width: '20px', marginRight: '20px' }} 
//         className='d-flex justify-content-center align-items-center' alt='flashcards' />Delete {card}</div></Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         <div style={{ display: 'flex', justifyContent: 'space-around', width: '160px' }}>

// {['No', 'Yes'].map(el =>
//   <div className='deleteContainerNoAndYes d-flex justify-content-center align-items-center'
//     onClick={
//       () => {
//         deleteFrame()
//         if (el === 'Yes') {
//           trashEvent()
//         }
//       }
//     }
//   >{el}</div>
// )}

// </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary">Understood</Button>
//         </Modal.Footer>
//         <div style={{ width: '200px', position: 'absolute', zIndex: '2', top: '353px', color: 'white'}}>Don't show message again</div>
//       </Modal>
//     </>
//   );
// }





// return (
//   <div className='deleteContainerFr'>
//     <div className='deleteContainerInner d-flex justify-content-between align-items-center flex-column'>
//       <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: 'rgba(200, 168, 115, 0.95', height: '35px', width: '100%', color: 'white', fontWeight: 'bold', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}><img src={flashcards} style={{ width: '20px', marginRight: '20px' }} 
//       className='d-flex justify-content-center align-items-center' alt='flashcards' />Delete {card}</div>
//       <div>Do you want to delete this {card} ?</div>


//       <div className='d-flex justify-content-around align-items-center'>
//         <div style={{ display: 'flex', justifyContent: 'space-around', width: '160px' }}>

//           {['No', 'Yes'].map(el =>
//             <div className='deleteContainerNoAndYes d-flex justify-content-center align-items-center'
//               onClick={
//                 () => {
//                   deleteFrame()
//                   if (el === 'Yes') {
//                     trashEvent()
//                   }
//                 }
//               }
//             >{el}</div>
//           )}

//         </div>
//       </div>



//     </div>

//     <div style={{ width: '200px', position: 'absolute', zIndex: '2', top: '353px', color: 'white'}}>Don't show message again</div>

//   </div>

// )
