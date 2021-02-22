import React, {useState,useContext,useRef,useEffect} from 'react'
import { Card} from 'react-bootstrap'
import {Context} from '../../Context'
import '../styles.css'

import ThreeDotsBtn from './ThreeDotsBtn'
import AddQuestionsToDeck from './AddQuestionsToDeck'
import QuestAnswerTrainOverv from './QuestAnswerTrainOverv'
import DeckOrCardName from  './DeckOrCardName'
import DeleteCardQuestionBox from  './DeleteCardQuestionBox';

import playimg from '../../icons/play.svg'




export default function Deck({ deck, checked, setChecked,
                               active, setActive, title, bg, 
                              pauseIsActive, setPauseIsActive, trigger, ...style }) {
     
    
  let { data, paused, name }  = deck
  
  const [editButtonClicked, setEditButtonClicked] = useState(true); 
  const [nameOfTopDeck, setNameOfTopDeck] = useState(name);
  const [threeDotsMenuOpen, setThreeDotsMenuOpen] = useState(false);
  
  const [showDeleteWindow, setShowDeleteWindow] = useState(true);
  const [trash, setTrash] = useState(false);
  const { dataBase, setDataBase} = useContext(Context)
  const [index, setIndex] = useState(0);

  useEffect(()=>{
    let cIndex = dataBase.DeckNames.findIndex(item=>item.name === name)
    setIndex(cIndex)
    //console.log(cIndex)
    // eslint-disable-next-line 
  },[trigger])
  
  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];
  
  let input  = useRef(null)

  function handlePause () {
    console.log(index)
    let newDataBase = {...dataBase}
  
    newDataBase.DeckNames[index].paused = !paused;
    console.log(newDataBase.DeckNames)
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

            <DeckOrCardName 
                bg={style.background}
                index={index}
                paused={paused}
                name= {name}
                active={active}
                setActive={setActive}
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

                          // if (!dataBase.DeckNames[index].paused) {
                        
                            setNameOfTopDeck(e.target.value)}
                            // }

                        }
                    }
            />

         }

        

          <ThreeDotsBtn
              name={name}
              text={'deck'}
              showFromParent={threeDotsMenuOpen}
              editButtonClicked={editButtonClicked}
              setEditButtonClicked={setEditButtonClicked}
              setShowFromParent={setThreeDotsMenuOpen}
              index={index}
              paused={paused}
              bg={style.background} 
              nameOfTopDeck={nameOfTopDeck}
              setNameOfTopDeck={setNameOfTopDeck}
              edit={!paused} 
              pause 
              trash={!paused}
              input={input}
              threeDotsContainer= {{position: 'fixed', right: '50px', top: '18px'}}
              className='threeDotsBtnIndex'
              style= {{border: paused? 'none': '1px solid black',
                      backgroundColor: paused? 'black': 'white'
                      }}
       
              editEvent={() => {
                setThreeDotsMenuOpen(false)
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
          

            {
              trash && showDeleteWindow && !paused &&

                <DeleteCardQuestionBox
                  card='deck'
                  threeDotsMenuOpen={threeDotsMenuOpen}
                  deleteWindow={() => setShowDeleteWindow(false)}
                  trashEvent={()=>{

                  deleteDeck()
                  handleActive(index-1)}
                  }
                  showDeleteWindow={showDeleteWindow}
                />
            }

        </Card.Title>

        <div className='mb-3'>

           {
            data.length === 0?
              null
              :
              <>
          <div
              className='divStyling' 
              style={{opacity: paused? '0': '1'}}
              >
                To study:   

                <input 
                    type='number' 
                    className='inputStyling' 
                    style={{background: paused? style.background: 'none'}}
                >   

                </input>

          </div>
          
          <div 
              className='divStyling'  
              style={{opacity: paused? '0': '1'}}
          >    

              {'To review:'.padEnd(10, '⠀')}  {dataBase.userPreferences.toReview}
          </div>
           </>
          } 

          {
            paused?

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
            name && data.length !== 0?
          
            <div 
                className='divStyling'  
                style={{opacity: paused? '0': '1'}}
            >

                {'Decksize:'.padEnd(10, '⠀')}   {data.length}        
            </div>
            :
            null

          }
      
        </div>

        <QuestAnswerTrainOverv 
            name={name} 
            index={index} 
            data={data} 
            paused={paused} 
        />
        
        {
          active  && 
          
            <AddQuestionsToDeck 
                background={style.background} 
                name= {name} 
                index= {index} 
            />        
        }

      </Card.Body>
    </Card>
  )
}


//adding a facebook login at the very beginning

//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '699586404315736',
//       cookie     : true,
//       xfbml      : true,
//       version    : 'v9.0'
//     });
      
//     FB.getLoginStatus(function(response) {
//       statusChangeCallback(response);
//   });
      
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));

//    function statusChangeCallback(response) {
//      if (response.status === 'connnected') {
//        console.log('Logged in and authenticated')
//      } else {
//        console.log('Not authenticated');
//      }
//    }

//    function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }


