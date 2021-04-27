import { Modal } from 'react-bootstrap'
import redCross from '../../icons/redCross.svg'
import React from 'react'
import InputCheckbox from './InputCheckbox'



export default function BasicOrangeWindow({
                                          children, show, 
                                          setShow, title,
                                          cardsPausedAndClicked,
                                          setCardsPausedAndClicked,
                                          menu, showFromParent,
                                          mainBox,
                                          setShowAnswerBtn = () => {},
                                          setEdit = () => {} , 
                                          setShowRepeatBtn = () => {},
                                          setEditBtnClicked = () => {},
                                          index
            }) {

  return(

    <Modal
        show={show}
        onHide={() => setShow(false)}
        contentClassName={'mod'}
        backdrop="static"
        style= {{left: '-160px !important', right: '45px !important', backgroundColor: 'rgba(0, 0, 0, 0.6)'
    
                }}
      >

          <div  style={{width: '98%', height: '95%', margin: 'auto', overflow: 'hidden auto',
                      }}
          >

              <Modal.Header className='border-bottom-0'
              >

                  <Modal.Title style={{fontSize: '16px', marginLeft: '12px', height: '24px', width: '240px'
                              }}
                  >

                      {title}
                  </Modal.Title>

                  <div className="onoffswitch"
                       onClick = {() => {  
                        setCardsPausedAndClicked(true)
                       }}
                  >
                  {mainBox?
                    <InputCheckbox
                      cardsPausedAndClicked={cardsPausedAndClicked}
                      index={index}
                    />
                     :
                     null
                  }
                  </div>
                  
                  {menu}
                <button 
                    className='redCross'
                    onClick={() => {
                  
                      setShow(false)
                      setEdit(false)
                      setShowRepeatBtn(false)
                      setShowAnswerBtn(true)
                      setEditBtnClicked(false)
                    }} 
                >
                    <img 
                        className='nonDraggableIcon'
                        src={redCross} 
                        alt='redCross'     
                    />

                </button>

              </Modal.Header>
              
              <Modal.Body >

                {children}

              </Modal.Body>

        </div>
    </Modal>
   
  )
}