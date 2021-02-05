import React, {useState,useContext,useRef,useEffect} from 'react'
import { Card} from 'react-bootstrap'
import '../styles.css'
import ThreeDotsBtn from './ThreeDotsBtn'
import AddQuestionsToDeck from './AddQuestionsToDeck'
import QuestAnswerTrainOverv from './QuestAnswerTrainOverv'
import {Context} from '../../Context'
import DeckOrCardname from  './DeckOrCardname'
import DeleteCardQuestionBox from  './DeleteCardQuestionBox';


export default function Deck({ deck: { data,paused }, checked, setChecked,
  name, active, setActive, title, bg, index, ...style }) {
  
  const [show, setShow] = useState(false);
  const { dataBase, setDataBase} = useContext(Context)
  const [trash, setTrash] = useState(false);
  const [showDeleteFrame, setShowDeleteFrame] = useState(true);
  const [editName, setEditName] = useState(true);
  
  const [nameOfTopDeck, setNameOfTopDeck] = useState(name)
  

  useEffect(()=>{
    setNameOfTopDeck(name)
    console.log(name)
  },[name])

  function deleteDeck(){
    let newDataBase = {...dataBase}
    newDataBase.DeckNames.splice(index,1);
    setDataBase(newDataBase)
  }

 


  function handleActive(i){
    setActive(i)
    let newDataBase = {...dataBase}
    newDataBase.active = i
    setDataBase(newDataBase)
  }


  let input  = useRef(null)
  
  return (

    <Card style={style} className='newDeckContainer flexColumn position-absolute '>
      <Card.Body className='justify-content-center align-items-center flex-column d-flex'>

        <Card.Title className='d-flex align-items-center justify-content-between position-relative'
                    style={{width:'132px'}}>

        {
          editName?

         <DeckOrCardname bg={style.background} 
         style={{width: '132px', position: 'absolute', left:'-4px', border: '1px solid black'}}
         show={show} name= {name}
         />
       
         :
         <input ref = {input} style={{ 
           width: '132px', borderRadius: '5px', 
           paddingLeft: '5px', position: 'relative', 
           left: '-4px', outline: 'none'}} 
         value = {nameOfTopDeck}
          onChange={(e)=>{
            
            if (e.target.value.length>25) {
              alert('Deckname can not be longer than 25 characters')
            
            } else {
            
            setNameOfTopDeck(e.target.value)}
            }
          }
         />
         }
         {
         true &&
          <ThreeDotsBtn
            name={name}
            text={'deck'}
            showFromParent={show}
            editName={editName}
            setShowFromParent={setShow}
            index={index}
            nameOfTopDeck={nameOfTopDeck}
            threeDotsContainer= {{position: 'fixed', right: '50px', top: '18px'}}
            className='threeDotsBtnIndex'
            edit pause trash

            editEvent={() => {
              setShow(show)
              setEditName(!editName)

            }}
            input={input}

            trashEvent={
              dataBase.checkboxClicked
            ?
            () => {
              deleteDeck()
              handleActive(index-1)
            }
            :
            () => {
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
                  trashEvent={()=>{

                  deleteDeck()
                  handleActive(index-1)}
                  }
                />
            }
        </Card.Title>
        <Card.Text>

          <div className='divStyling' style={{background: dataBase.DeckNames[index].paused? style.background: 'white'}} >To study: 
          
          <input type='number' className='inputStyling' style={{background: dataBase.DeckNames[index].paused? style.background: 'none'}}></input></div>
          <div className='divStyling'  style={{background: dataBase.DeckNames[index].paused? style.background: 'white'}}>{'To review:'.padEnd(10, '⠀')}  {dataBase.userPreferences.toReview}</div>
          {name && 
          <div className='divStyling'  style={{background: dataBase.DeckNames[index].paused? style.background: 'white'}}
       
           >{'Decksize:'.padEnd(10, '⠀')}{data.length}</div>}
      
        </Card.Text>

        <QuestAnswerTrainOverv bg={style.background} name={name} index={index} data={data} closePopup={() => setShow(false)} paused={paused} />
        {active && <AddQuestionsToDeck bg={style.background} name= {name} index= {index} closePopup={() => setShow(false)} />}
      </Card.Body>

    </Card>
  )

}


