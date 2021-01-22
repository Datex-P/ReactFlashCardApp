import React, {useContext, useState} from 'react'
import { Modal } from 'react-bootstrap'
import { Context } from '../../Context'//step 4.1 import context instance

export default function CreateNewDeck({ createNewDeckDisplay, close, style }) {
  const { dataBase, setDataBase } = useContext(Context)
  const [inputField, setInputField] = useState('')

  function addNewDeckName() {

    let newDataBase = { ...dataBase }


    if (inputField in newDataBase.DeckNames) {

      alert('Name of Deck already exists')
      setInputField('')


    } else if (!inputField) {
      alert('Input needed')
    } else {
      newDataBase.DeckNames[inputField] = {
        data: [],
        toStudyGoal: 20,
        cardsToday: 0
      }
      setDataBase(newDataBase)
      close()
    }
  }



  return (

         <Modal

        show={createNewDeckDisplay}
        onHide={close}
        backdrop="static"
        keyboard={false}
        id = 'createDeck'
        // dialogClassName = 'stylesNewDeck'
        // contentClassName = 'stylesNewDeck'
        // centered
      >
        <Modal.Header closeButton>
        <Modal.Title>Name for new deck</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column align-items-center'>
     
        <input style={{
            width: '90%', marginTop: '10px', borderRadius: '5px', border: '1px solid black',
            marginBottom: '10px', height: '30px', outline: 'none'
          }}
            onChange={event => setInputField(event.target.value)}

          ></input>

          <select style={{ width: '90%', outline: 'none' }}>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
          </select>
        </Modal.Body>
      
        <div className='d-flex justify-content-between' style={{ width: '62%', border: '1px solid black' }}>
            {['Cancel', 'Ok'].map((el) =>
              <button
                className='generalButtonStyling'
                style={{ cursor: 'pointer', marginTop: '10px', width: '63px', height: '26px', borderRadius: '5px' }}
                onClick={() => {
                  el === 'Cancel' ?
                    close()
                    :
                    addNewDeckName()
                }
                }
              >
                {el}
              </button>
            )
            }
          </div>
      </Modal> 
  )
}


{/* 
        <div className='createNewDeck d-flex flex-column justify-content-center align-items-center ' style={style}>

          <div style={{ fontWeight: 'bold' }}>Name for new deck</div>

          <input style={{
            width: '70%', marginTop: '10px', borderRadius: '5px', border: '1px solid black',
            marginBottom: '10px', height: '30px', outline: 'none'
          }}
            onChange={event => setInputField(event.target.value)}

          ></input>

          <select style={{ width: '70%', outline: 'none' }}>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
          </select>

          <div className='d-flex justify-content-between' style={{ width: '47%' }}>
            {['Cancel', 'Ok'].map((el) =>
              <button
                className='generalButtonStyling'
                style={{ cursor: 'pointer', marginTop: '10px', width: '63px', height: '26px', borderRadius: '5px' }}
                onClick={() => {
                  el === 'Cancel' ?
                    close()
                    :
                    addNewDeckName()

                }
                }
              >
                {el}
              </button>
            )
            }
          </div>
        </div> */}
