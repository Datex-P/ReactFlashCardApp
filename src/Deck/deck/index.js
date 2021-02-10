import React, {useState,useContext,useRef,useEffect} from 'react'
import { Card} from 'react-bootstrap'
import {Context} from '../../Context'
import '../styles.css'

import ThreeDotsBtn from './ThreeDotsBtn'
import AddQuestionsToDeck from './AddQuestionsToDeck'
import QuestAnswerTrainOverv from './QuestAnswerTrainOverv'
import DeckOrCardname from  './DeckOrCardname'
import DeleteCardQuestionBox from  './DeleteCardQuestionBox';

import playimg from '../../icons/play.svg'




export default function Deck({ deck: { data,paused, name }, checked, setChecked,
   active, setActive, title, bg, index, ...style }) {
  
  const [editButtonClicked, setEditButtonClicked] = useState(true); 
  const [nameOfTopDeck, setNameOfTopDeck] = useState(name);
  const [threeDotsMenuOpen, setThreeDotsMenuOpen] = useState(false);
  
  const [showDeleteWindow, setShowDeleteWindow] = useState(true);
  const [trash, setTrash] = useState(false);
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
    // setShow(false) why does  three button window not close with this?
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

        <Card.Title 
            className='d-flex align-items-center justify-content-between position-relative'
            style={{width:'151px', left: '3px'}}
        >

        {
         editButtonClicked?

         <DeckOrCardname 
            index={index}
            name= {name}
            className='deckOrCardNameStyling'
         />

         :

         <input 
              ref = {input} 
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
              showFromParent={threeDotsMenuOpen}
              editButtonClicked={editButtonClicked}
              setEditButtonClicked={setEditButtonClicked}
              setShowFromParent={setThreeDotsMenuOpen}
              index={index}
              paused={paused}
              bg={style.background} 
              nameOfTopDeck={nameOfTopDeck}
              edit={!paused} 
              pause 
              trash={!paused}
              input={input}
              threeDotsContainer= {{position: 'fixed', right: '50px', top: '18px'}}
              className='threeDotsBtnIndex'
              style= {{border: dataBase.DeckNames[index].paused? 'none': '1px solid black',
                      backgroundColor: dataBase.DeckNames[index].paused? 'black': 'white'
                      }}
       
              editEvent={() => {
                setThreeDotsMenuOpen(threeDotsMenuOpen)
                setEditButtonClicked(!editButtonClicked)
              }}


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
                setShowDeleteWindow(true)
              }
              }
            />
          }

            {
              trash && showDeleteWindow && !dataBase.DeckNames[index].paused &&

                <DeleteCardQuestionBox
                  card='deck'
                  threeDotsMenuOpen={threeDotsMenuOpen}
                  deleteFrame={() => setShowDeleteWindow(false)}
                  trashEvent={()=>{

                  deleteDeck()
                  handleActive(index-1)}
                  }
                />
            }

        </Card.Title>

        <Card.Text>

          <div 
              className='divStyling' 
              style={{opacity: dataBase.DeckNames[index].paused? '0': '1'}}
          >
                To study:   

                <input 
                    type='number' 
                    className='inputStyling' 
                    style={{background: dataBase.DeckNames[index].paused? style.background: 'none'}}
                >   

                </input>

          </div>
          
          <div 
              className='divStyling'  
              style={{opacity: dataBase.DeckNames[index].paused? '0': '1'}}
          >    

              {'To review:'.padEnd(10, '⠀')}  {dataBase.userPreferences.toReview}     
          </div>

          {
            dataBase.DeckNames[index].paused?

              <div 
                  className='deckPausedContainer'
                  style={{background: colors[index % 5]}}
              >

                  <div>
                      Deck is paused. 
                  </div>

                  <div style={{display: 'flex', alignItems: 'center'}}
                  > 
                        Press:
                    
                    <button 
                        className='playButton'
                        onClick={()=>{
                                    handlePause()
                                
                        }}
                    >

                        <img 
                            src={playimg}
                            alt='play' 
                            style={{margin: '6px', cursor: 'pointer'}}                         
                      />

                    </button>
                    
                  </div>
                  <div>
                        to unpause the Deck.
                  </div>
              </div>

              : 

              null
          }

          {
            name && 
          
            <div 
                className='divStyling'  
                style={{opacity: dataBase.DeckNames[index].paused? '0': '1'}}
            >

                {'Decksize:'.padEnd(10, '⠀')}{data.length}        
            </div>

          }
      
        </Card.Text>

        <QuestAnswerTrainOverv 
            name={name} 
            index={index} 
            data={data} 
            paused={paused} 
        />
        
        {
          active && 
          
          <AddQuestionsToDeck 
              bg={style.background} 
              name= {name} 
              index= {index} 
          />        
        }

      </Card.Body>
    </Card>
  )
}


