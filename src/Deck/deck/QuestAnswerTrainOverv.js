import React, { useState, useContext, useEffect, useRef} from 'react'
import { Button, FormControl, Alert } from 'react-bootstrap'
import { Context } from '../../Context'
import editimg from '../../icons/edit.svg'

import ThreeDotsBtn from './ThreeDotsBtn';
import BasicOrangeWindow from './BasicOrangeWindow'
import DeleteCardQuestionBox from './DeleteCardQuestionBox'
import SaveAndDiscard from './CardBodyParts/SaveAndDiscard'
import RepeatBtn from './CardBodyParts/RepeatBtn'


export default function QuestAnswerTrainOverv({ name, data, 
                                                index, paused, 
                                                editButtonClicked //activated when change deckname field is open
}) {

  // const [threeDotsOpen, setThreeDotsOpen] = useState(showFromParent);

  

  const [checked, setChecked] = useState(false)
  const [editBtnClicked, setEditBtnClicked] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [cardModified, setCardModified] = useState(false)

  const [show, setShow] = useState(false);
  const [showAnswerBtn, setShowAnswerBtn] = useState(true);
  const [showRepeatBtn, setShowRepeatBtn] = useState(false);

  const [showDeleteWindow, setShowDeleteWindow] = useState(true)
  const [timer, setTimer] = useState(null)
  const [trash, setTrash] = useState(false);
  const [deckLengthNotZero, setDeckLengthNotZero] = useState(true)

  const { dataBase, setDataBase } = useContext(Context);
  const [card, setCard] = useState({answer:'', question:''})
  const [threeDotsMenuOpen, setThreeDotsMenuOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (editBtnClicked) {
      inputRef.current.focus();
    }
  }, [editBtnClicked]);


  // function handlePause () {
  //   let newDataBase = {...dataBase}
  //   let savePausedState = !pauseIsActive
  //   setPauseIsActive(savePausedState)
  //   dataBase.DeckNames[index].paused = !dataBase.DeckNames[index].paused
  //   setDataBase(newDataBase)

  // }

  useEffect(() => {
      setTimeout( 
      ()=>
          {setCardModified(false)},500
      ) 
    }, [cardModified]
  );



  function generateRandom() {
    let randomQuestion = null;

    if (data.length === 0) {


      alert('add questions to deck')
      setDeckLengthNotZero(false)
    } else {
      setDeckLengthNotZero(true)
      if (dataBase.queue[0] && dataBase.queue[0].timeLeft === 0) {
        //need to have algorithm to filter s in queue related onlz for this deck
        //also not tot forget add decremental time algorith for all crads no matter waht deck
        randomQuestion = dataBase.queue.shift().index

      } else {

        randomQuestion = Math.floor(Math.random() * data.length);
      }

      setRandomQuestion(randomQuestion);
      setCard(data[randomQuestion])
      setShow(true);
    }

  }

  function discardHandler(){
    setCard(data[randomQuestion])
  }

  // function addToQueue(time) {
  //   let newDataBase = { ...dataBase }

  //   newDataBase.queue.push({
  //     ...data[randomQuestion],
  //     index: randomQuestion,
  //     timeLeft: time * 1000,
  //     item: name
  //   })

  //   setDataBase(newDataBase)
  // }


  useEffect(() => {

    if (show) {
      let timeLeft = setInterval(() => {

        // dataBase.queue.forEach((item, index) => {
        //   if (dataBase.queue[index].timeLeft >= 1000) {
        //     dataBase.queue[index].timeLeft -= 1000
        //   } else {
        //     dataBase.queue[index].timeLeft = 0
        //   }
        //     // })
      }, 1000)
      // })
      //everything  here will be returned when components unmounts
      setTimer(timeLeft)
    } else {

      
      clearInterval(timer)
      console.log('oh you delete me')
    }
    //return function () {clearInterval(timeLeft)}
    // eslint-disable-next-line
  }, [show]
  )


  function deleteCurrentCard() {
    
    let newDataBase = { ...dataBase }
    newDataBase.DeckNames[index].data.splice(randomQuestion, 1)
    setDataBase(newDataBase)
    generateRandom()
  }

  function saveHandler() {
    
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].data[randomQuestion]=card
    setDataBase(newDataBase)

  }

  function changeHandler(e){
    let {name,value} = e.target;
    setCard({...card, [name]:value})
  }




  return (
    <>

      <Button
        variant='secondary'
        className='openDeck'
        size='sm'
        style={{
          opacity: paused || data.length === 0 ? '0' : '1',   //open deck button is not visible when length is zero
          cursor: paused || data.length === 0 || !editButtonClicked? 'default' : 'pointer',
          //backgroundColor: !editButtonClicked? "rgb(108, 117, 125) !important" : 'blue'
          //warum funktioniert die obige Zeile nicht, besser mit refs machen??
        }}
        onClick={
          paused  || !editButtonClicked? //when edit button is clicked or deck is paused, the question/answer view does not open, by default this button is true
            null
            :
            generateRandom
        }
      >
        Open Deck

      </Button>

      {
        deckLengthNotZero && !paused &&

        <BasicOrangeWindow
          show={show}
          setShow={setShow}
          showRepeatBtn={showRepeatBtn}
          setShowRepeatBtn={setShowRepeatBtn}
          setShowAnswerBtn={setShowAnswerBtn}
          setEditBtnClicked={setEditBtnClicked}
          title={`Deck: ${name}`}
          showFromParent={threeDotsMenuOpen}
          menu={
            <ThreeDotsBtn

              text={'card'}
              editButtonClicked={true}
              editBtnClicked={editBtnClicked}
              className='threeDotsInQuestionAnswerStyling'
              threeDotsContainer={{ position: 'default' }}
              paused={paused}
              
              setShowFromParent={setThreeDotsMenuOpen}
              index={index}
              edit pause trash
              type='card'
              editEvent={() => {
                setShowAnswerBtn(false)
                setEditBtnClicked(true)
                setShowRepeatBtn(false)
              }}

              pauseEvent={() => {
                // handlePause()
                setShowDeleteWindow(true)
              }}

              trashEvent={() => {
                setTrash(true)

                dataBase.checkboxClicked ?

                  deleteCurrentCard()

                  // ()=>{
                  // deleteCurrentCard() 
                  // setShowRepeatBtn(false)
                  // setShowAnswerBtn(true)
                  // }
                  :
                   setShowRepeatBtn(false)
                  setShowDeleteWindow(true)
                   setShowAnswerBtn(true)
              }}
            />
          }
        >

          {
            editBtnClicked?
          
            <div style={{top: '-18px', position: 'relative', marginLeft: '14px', display: 'flex', alignItems: 'center'}}
            >

              <img 
                      alt='edit' 
                      src={editimg} 
              /> 
              <span style={{marginLeft: '3px'}}>mode</span>

            </div>
              :
            null
          }

          {
            data[randomQuestion] &&

            <>
              <div className='mb-4'
              >
                <p className='questionAnswerStyling'
                >
                  Question
                </p>

                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  value={card.question}
                  className='w-100'
                  disabled={!editBtnClicked}
                  name='question'
                  onChange={changeHandler}
                  ref={inputRef}
                />

              </div>

              {
                showAnswerBtn &&

                <Button
                  variant='secondary'
                  className='p-1 showAnswer my-5 d-flex justify-content-center align-items-center'
                  onClick={
                    () => {
                      setShowAnswerBtn(false)
                      setShowRepeatBtn(true)
                    }}
                >

                  Show answer
                </Button>
              }

              {
                showRepeatBtn &&

                <div className='d-flex justify-content-between px-3'
                >
                  {
                    dataBase.userTimePreferences.map((col) =>

                      <RepeatBtn
                        btn={col.name}
                        label={'< ' + col.amount + col.unit}
                        onClick={() => {
                          setShowAnswerBtn(!showAnswerBtn)
                          setShowRepeatBtn(false)
                          generateRandom()
                        }}
                      />
                    )
                  }
                </div>
              }

              { 
                  cardModified?

                      <div 
                          className='d-flex justify-content-center align-items-center'
                          style={{height: '52px'}}
                      >

                          <Alert 
                              variant="success"
                              style={{width: '145px', height: '35px'}}
                          >

                              Card was modified.
                          </Alert>

                    </div>

                      : 
                      null
              }

              {
                !showAnswerBtn &&

                <div className='mt-4'
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
                    disabled={!editBtnClicked}
                    name='answer'
                    onChange={changeHandler}
                  />
                </div>
              }

              {
                editBtnClicked &&

                <div className='d-flex justify-content-center'
                >

                  <SaveAndDiscard
                    generateRandom={generateRandom}
                    setCardModified={setCardModified}
                    cardModified={cardModified}
                    saveEvent={() => {
                      setShowAnswerBtn(true)
                      setEditBtnClicked(false)
                      saveHandler()
                      }}
                    discardEvent={()=>{
                      setShowAnswerBtn(true)
                      setEditBtnClicked(false)
                      discardHandler()
                      }}
                  />
                </div>
              }

              {
                trash && showDeleteWindow &&

                <DeleteCardQuestionBox
                  card='card'
                  checked={checked}
                  setChecked={setChecked}
                  show={show}
                  editBtnClicked={editBtnClicked}
                  setEditBtnClicked={setEditBtnClicked}
                  setShowAnswerBtn={setShowAnswerBtn}
                  setShowRepeatBtn={setShowRepeatBtn}
                  trashEvent={deleteCurrentCard}
                  showDeleteWindow={showDeleteWindow}
                  deleteWindow={() =>
                    setShowDeleteWindow(false)
                  }
                 
                />
              }
            </>
          }

        </BasicOrangeWindow>
      }
    </>
  )
}




