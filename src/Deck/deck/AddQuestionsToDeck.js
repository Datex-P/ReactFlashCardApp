import React, { useState, useContext } from 'react';
import {Modal, FormControl } from 'react-bootstrap'
import {Context} from '../../Context';
import redCross from '../../icons/redCross.svg'
import '../styles.css'

export default function AddQuestionsToDeck({ closePopup, index, name, bg }) {


  const [show, setShow] = useState(false);
  const [card, setCard] = useState({question:'', answer:''})

  const {dataBase, setDataBase}= useContext(Context);

  function addToDeck(){
    let newDataBase = {...dataBase}
      newDataBase.DeckNames[index].data.push(card)
    //  newDataBase.DeckNames[index].push(card)
    setDataBase(newDataBase)
    setCard({question:'', answer:''})
    alert('card is added successfully')
  }

  function changeHandler (e) {
    console.log(card)
    let newCard =  {...card}
    let {name, value} = e.target;
    newCard[name]=value
    setCard(newCard)
    //setCard({...card,[name]:value}) would be another way of writing it
  }

  return (
    
    <div>
      <button 
        
      onClick={dataBase.DeckNames[index].paused?
      null:
      () => { closePopup(); setShow(true) }} 
      
      className={'addNewCardsButton outline-none'}
      style= {{background: dataBase.DeckNames[index].paused? bg: null,
              cursor: dataBase.DeckNames[index].paused? 'default': 'pointer'}}
      >
        +
      </button>
      
      
        
      <Modal
        show={show}
        onHide={() => setShow(false)}
        contentClassName={'mod'}
        backdrop="static"
        
      >
        <Modal.Header className='border-bottom-0'>
          <Modal.Title style={{ fontSize: '16px' }}>

          Deck: {name}
          
          </Modal.Title>

          <button className='redCross' onClick={() => setShow(false)} ><img src={redCross} alt='redCross' /></button>
        </Modal.Header>
        <Modal.Body >

          <div className='mb-2'>
            <p className='questionAnswerStyling'>Question</p>
            <FormControl
              as="textarea"
              aria-label="With textarea"
              value={card.question} className='w-100'
              name='question'
              onChange={changeHandler}
            />
          </div>


          <div className='mt-5'>
            <p className='questionAnswerStyling'>Answer</p>
            <FormControl
              as="textarea"
              aria-label="With textarea"
              value={card.answer}
              className='w-100'
              name='answer'
              onChange={changeHandler}
            />
          </div>

          <button onClick={addToDeck}
                  className='generalButtonStyling'
                  style={{width: '110px', marginTop: '20px', padding: '5px', boxSizing: 'border-box', marginLeft: '8px'}}>
            Add to Deck
          </button>


        </Modal.Body>
      </Modal>
      
    </div>
  )
}

