import React, {useState,useContext,useRef,useEffect} from 'react'
import { Card} from 'react-bootstrap'
import '../styles.css'
import ThreeDotsBtn from './ThreeDotsBtn'
import AddNewDeck from './AddNewDeck'
import CardBody from './CardBody'
import {Context} from '../../Context'
import CardHeader from  './CardHeader'
import DeleteCardQuestionBox from  './DeleteCardQuestionBox';


export default function Deck({ deck: { data }, name, active, title, index, ...style }) {
  const [show, setShow] = useState(false);
  const {dataBase, setDataBase} = useContext(Context);
  const [trash, setTrash] = useState(false);
  const [showDeleteFrame, setShowDeleteFrame] = useState(true)
  const [editName, setEditName] = useState(true)
  const [pauseName, setPauseName] = useState(true)
  const [nameOfTopDeck, setNameOfTopDeck] = useState(name)
  

  useEffect(()=>{
    setNameOfTopDeck(name)
    console.log(name)
  },[name])

  function deleteDeck(){
    let newDataBase = {...dataBase}
    delete newDataBase.DeckNames[name]
    setDataBase(newDataBase)
  }

  let input  = useRef(null)
  
  return (

    <Card style={style} className='newDeckContainer flexColumn position-absolute'>
      <Card.Body className='justify-content-center align-items-center flex-column d-flex'>

        <Card.Title className='d-flex align-items-center justify-content-between position-relative'
                    style={{width:'132px'}}>

        {
          editName?

         <CardHeader bg={style.backgroundColor} 
         style={{width: '132px', position: 'absolute', left:'-4px', border: '1px solid black'}}
         show={show} name= {name}
         />
       
         :
         <input ref = {input} style={{ 
           width: '132px', borderRadius: '5px', paddingLeft: '5px', position: 'relative', left: '-4px', outline: 'none'}} 
         value = {nameOfTopDeck}
          onChange={(e)=>{setNameOfTopDeck(e.target.value)}}
         />
         }
         {
         true &&
          <ThreeDotsBtn
            name={name}
            text={'deck'}
            showFromParent={show}
            editName={editName}
            pauseName={pauseName}
            setPauseName={setPauseName}       
            setShowFromParent={setShow}
            index={index}
            nameOfTopDeck={nameOfTopDeck}
            className='threeDotsBtnIndex'
            edit pause trash

            editEvent={() => {
              setShow(show)
              setEditName(!editName)

            }}
            input={input}

            pauseEvent={()=>{
              setPauseName(!pauseName)
            }}

            trashEvent={() => {
            setTrash(true)
            setShowDeleteFrame(true)
            }}
          />

          }
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
          {name && <div className='divStyling'>{'Decksize:'.padEnd(10, '⠀')}{data.length}</div>}
      

        </Card.Text>
        <CardBody name={name} index={index} data={data} closePopup={() => setShow(false)} />
        {active && <AddNewDeck name= {name} closePopup={() => setShow(false)} />}
      </Card.Body>

    </Card>
  )

}


