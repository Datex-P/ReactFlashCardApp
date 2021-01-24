import React, {useState,useContext} from 'react'
import { Card} from 'react-bootstrap'
import '../styles.css'
import ThreeDotsBtn from './ThreeDotsBtn'
import AddNewDeck from './AddNewDeck'
import CardBody from './CardBody'
import {Context} from '../../Context'
import CardHeader from  './CardHeader'
import DeleteCardQuestionBox from  './DeleteCardQuestionBox';


export default function Deck({ deck: { data }, name, active, title, ...style }) {
  const [show, setShow] = useState(false);
  const {dataBase, setDataBase} = useContext(Context);
  const [trash, setTrash] = useState(false);
  const [showDeleteFrame, setShowDeleteFrame] = useState(true)
  const [editName, setEditName] = useState(true)
  const [pauseName, setPauseName] = useState(true)
  const [nameOfTopDeck, setNameOfTopDeck] = useState(name)
  

  function deleteDeck(){
    let newDataBase = {...dataBase}
    delete newDataBase.DeckNames[name]
    setDataBase(newDataBase)
  }


  function handleDeckname(e) {
    setNameOfTopDeck(e.target.value)
    let newDataBase = {...dataBase}
    newDataBase.DeckNames[e.target.value]  = {...newDataBase.DeckNames[nameOfTopDeck]}
    delete newDataBase.DeckNames[nameOfTopDeck]
    setDataBase(newDataBase)
  
  }
  
  return (

    <Card style={style} className='newDeckContainer flexColumn position-absolute'>
      <Card.Body className='justify-content-center align-items-center flex-column d-flex'>

        <Card.Title className='d-flex align-items-center justify-content-between position-relative'
                    style={{width:'140px'}}>

        {editName?
         <CardHeader bg={style.backgroundColor} style={{width: '40px', border: '1px solid black'}}>
         {name}
         
         </CardHeader>
         
         :
         <input style={{width: '92%', borderRadius: '5px', paddingLeft: '5px', outline: 'none'}} 
         value = {nameOfTopDeck}
         onChange={handleDeckname}
         />
         }
         
          <ThreeDotsBtn
            text={'deck'}
            showFromParent={show}
            editName={editName}
            pauseName={pauseName}
            setPauseName={setPauseName}

            setShowFromParent={setShow}

            editEvent={() => {
              setShow(show)
              setEditName(!editName)       
            }}

            pauseEvent = {()=>{
              setPauseName(!pauseName)
            }}

            trashEvent={() => {
            setTrash(true)
            setShowDeleteFrame(true)
            }}
        
            className='threeDotsBtnIndex'
           
            edit pause trash

          />
            {
                trash && showDeleteFrame &&
                <DeleteCardQuestionBox
                  card='deck'
                   show={show}
                  deleteFrame={() => setShowDeleteFrame(false)}
                  trashEvent={deleteDeck}

                />
            }
        </Card.Title>
        <Card.Text>

          <div className='divStyling'>To study: <input type='number' className='inputStyling'></input></div>
          <div className='divStyling'>{'To review:'.padEnd(10, '⠀')}  {dataBase.userPreferences.toReview}</div>
          {name && <div className='divStyling'>{'Decksize:'.padEnd(10, '⠀')}{dataBase.DeckNames[name].data.length}</div>}
      

        </Card.Text>
        <CardBody name={name} data={data} closePopup={() => setShow(false)} />
        {active && <AddNewDeck name= {name} closePopup={() => setShow(false)} />}
      </Card.Body>

    </Card>

  
  )

}


