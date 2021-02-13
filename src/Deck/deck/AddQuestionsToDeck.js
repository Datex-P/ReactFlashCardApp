
import React, { useState, useContext, useEffect} from 'react';
import {Modal, FormControl, Alert } from 'react-bootstrap'
import {Context} from '../../Context';
import '../styles.css'

import redCross from '../../icons/redCross.svg'

export default function AddQuestionsToDeck({  index, name, background }) {
  
  const [show, setShow] = useState(false);
  const [card, setCard] = useState({question:'', answer:''})
  const [newCardAdded, setNewCardAdded] = useState(false);

  const {dataBase, setDataBase}= useContext(Context);

  function addToDeck(){
    let newDataBase = {...dataBase}
      newDataBase.DeckNames[index].data.push(card)
    //  newDataBase.DeckNames[index].push(card)
    setDataBase(newDataBase)
    setCard({question:'', answer:''})
    setNewCardAdded(true)
 
  }
  
  function changeHandler (e) {
    console.log(card)
    let newCard =  {...card}
    let {name, value} = e.target;
    newCard[name]=value
    setCard(newCard)
    //setCard({...card,[name]:value}) would be another way of writing it
  }
  
//make method when adding was not successful

  useEffect(() => {
    
      setTimeout(()=>{setNewCardAdded(false)},500) 
  }, [newCardAdded]);
  

  return (
    
    <div>
        <button 
            className={'addNewCardsButton outline-none'}
            style= {{
              background: dataBase.DeckNames[index].paused? background: null,
              cursor: dataBase.DeckNames[index].paused? 'default': 'pointer'
              }}
        
            onClick={
                dataBase.DeckNames[index].paused?
                
                null
                :            
                () => { 
                  setShow(true)
                }
            } 
        >
        +
      </button>
      
      <Modal
        show={show}
        contentClassName={'mod'}
        backdrop='static'
        onHide={() => setShow(false)
        }
        
      >
          <Modal.Header className='border-bottom-0'
          >
              <Modal.Title style={{fontSize: '16px'}}
              >

                  Deck: {name}
              
              </Modal.Title>

              <button 
                  className='redCross' 
                  onClick={() => setShow(false)
                  }
                >

                    <img 
                        src={redCross} 
                        alt='redCross'                           
                    />
              </button>

            </Modal.Header>
            <Modal.Body >

                <div className='mb-2'
                >
                    <p 
                        className='questionAnswerStyling'
                    >
                        Question
                    </p>

                    <FormControl
                        as="textarea"
                        aria-label="With textarea"
                        value={card.question} 
                        className='w-100'
                        name='question'
                        onChange={changeHandler}
                    />

                    { 
                      newCardAdded?

                          <div 
                              className='d-flex justify-content-center align-items-center'
                              style={{height: '52px'}}
                          >

                              <Alert 
                                  variant="success"
                                  style={{width: '145px', height: '35px'}}
                              >

                                  Card added to deck.
                              </Alert>

                          </div>

                          : 
                          null
                    }

                </div>
                <div style={{marginTop: newCardAdded? '0px': '60px'}}
                >

                    <p className='questionAnswerStyling'
                    >
                      Answer
                    </p>

                    <FormControl
                      as="textarea"
                      aria-label="With textarea"
                      value={card.answer}
                      className='w-100'
                      name='answer'
                      onChange={changeHandler}
                    />

                </div>

                <button 
                    onClick={addToDeck}
                    className='generalButtonStyling addToDeckButton'
                >

                    Add to Deck
                </button>

            </Modal.Body>

      </Modal>
      
    </div>
  )
}

