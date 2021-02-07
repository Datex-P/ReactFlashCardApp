import React, {useState,useContext,useRef,useEffect} from 'react'
import { Card} from 'react-bootstrap'
import '../styles.css'
import ThreeDotsBtn from './ThreeDotsBtn'
import AddQuestionsToDeck from './AddQuestionsToDeck'
import QuestAnswerTrainOverv from './QuestAnswerTrainOverv'
import {Context} from '../../Context'
import DeckOrCardname from  './DeckOrCardname'
import DeleteCardQuestionBox from  './DeleteCardQuestionBox';
import playimg from '../../icons/play.svg'




export default function Deck({ deck: { data,paused, name }, checked, setChecked,
   active, setActive, title, bg, index, ...style }) {
  
  const [show, setShow] = useState(false);
  const [trash, setTrash] = useState(false);
  const [showDeleteFrame, setShowDeleteFrame] = useState(true);
  const [editName, setEditName] = useState(true); 
  const [nameOfTopDeck, setNameOfTopDeck] = useState(name)
  const [pauseIsActive, setPauseIsActive] = useState(true)
  
  
  const { dataBase, setDataBase} = useContext(Context)
  


  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];
  
  let input  = useRef(null)

  function handlePause () {
    let newDataBase = {...dataBase}
    let savePausedState = !pauseIsActive
    setPauseIsActive(savePausedState)
    dataBase.DeckNames[index].paused = !dataBase.DeckNames[index].paused
    setDataBase(newDataBase)    
  }

  
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

  
  return (

    <Card 
        style={style} 
        className='newDeckContainer flexColumn position-absolute '
    >
      <Card.Body 
          className='justify-content-center align-items-center flex-column d-flex'
      >

        <Card.Title className='d-flex align-items-center justify-content-between position-relative'
                    style={{width:'132px'}}>

        {
         editName?

         <DeckOrCardname bg={style.background} 
           index={index}
           style={{
                   width: '159px', height: '73px', position: 'relative important',
                   display: 'flex !important', justifyContent: 'center !important', left: '6px'
                  }}
           show={show} name= {name}
         />
       
         :
         <input ref = {input} 
                className= 'addToDeckInput'
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
            pauseIsActive={pauseIsActive}
            setPauseIsActive={setPauseIsActive}
            showFromParent={show}
            editName={editName}
            setEditName={setEditName}
            setShowFromParent={setShow}
            index={index}
            paused={paused}
            bg={style.background} 
            nameOfTopDeck={nameOfTopDeck}
            threeDotsContainer= {{position: 'fixed', right: '50px', top: '18px'}}
            className='threeDotsBtnIndex'
            style= {{border: dataBase.DeckNames[index].paused? 'none': '1px solid black',
                     backgroundColor: dataBase.DeckNames[index].paused? 'black': 'white'
                    }}
            edit={!paused} 
            pause 
            trash={!paused}
       
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
            }
            }
          />

          }
            {
                trash && showDeleteFrame && !dataBase.DeckNames[index].paused &&

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

        

          <div className='divStyling' style={{opacity: dataBase.DeckNames[index].paused? '0': '1'}} >
                
                To study:           
                <input type='number' className='inputStyling' style={{background: dataBase.DeckNames[index].paused? style.background: 'none'}}></input>
          </div>
          <div className='divStyling'  style={{opacity: dataBase.DeckNames[index].paused? '0': '1'}}>
          
              {'To review:'.padEnd(10, '⠀')}  {dataBase.userPreferences.toReview}
          
          </div>

          {
            dataBase.DeckNames[index].paused?

              <div style={{background: colors[index % 5]}}
                   className='deckPausedContainer'>
                  <div>Deck is paused. </div>
                  <div style={{display: 'flex', alignItems: 'center'}}> 
                        Press:
                    
                    <button 
                      onClick={handlePause}
                      className='playButton'
                    >

                      <img src={playimg} alt='play' style={{margin: '6px', cursor: 'pointer'}}                         
                      />

                    </button>
                    
                  </div>
                  <div>to unpause the Deck.</div>
              </div>

              : 

              null
          }

          {
            name && 
          
          <div className='divStyling'  style={{opacity: dataBase.DeckNames[index].paused? '0': '1'}}>
             
                  {'Decksize:'.padEnd(10, '⠀')}{data.length}
          
          </div>
          }
      
        </Card.Text>

        <QuestAnswerTrainOverv 
            bg={style.background}
            name={name} 
            index={index} 
            data={data} 
            paused={paused} 
            closePopup={() => setShow(false)} 
        />
        
        {
          active && 
          
          <AddQuestionsToDeck 
              bg={style.background} 
              name= {name} 
              index= {index} 
              closePopup={() => setShow(false)} 
          />        
        }
      </Card.Body>

    </Card>
  )
}


