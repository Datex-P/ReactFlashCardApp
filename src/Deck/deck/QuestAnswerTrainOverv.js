import React, { useState, useContext, useEffect } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import { Context } from '../../Context'

import ThreeDotsBtn from './ThreeDotsBtn';
import BasicOrangeWindow from './BasicOrangeWindow'
import DeleteCardQuestionBox from './DeleteCardQuestionBox'
import SaveAndDiscard from './CardBodyParts/SaveAndDiscard'
import RepeatBtn from './CardBodyParts/RepeatBtn'


export default function QuestAnswerTrainOverv({name, data, closePopup,index,paused, 
  // setEditName, editName
 }) {
  
  
  const [checked, setChecked] = useState(false)
  const [edit, setEdit] = useState(false);
  const [pauseIsActive, setPauseIsActive] = useState(true);
  const [randomQuestion, setRandomQuestion] = useState(null);
  
  const [show, setShow] = useState(false);
  const [showAnswerBtn, setShowAnswerBtn] = useState(true);
  const [showRepeatBtn, setShowRepeatBtn] = useState(false);
  
  const [showDeleteFrame, setShowDeleteFrame] = useState(true)
  const [timer, setTimer] = useState(null)
  const [trash, setTrash] = useState(false);
  const [openDeck, setOpenDeck] = useState(true)
  
  
  const { dataBase, setDataBase } = useContext(Context);



  function handlePause () {
    let newDataBase = {...dataBase}
    let savePausedState = !pauseIsActive
    setPauseIsActive(savePausedState)
    dataBase.DeckNames[index].paused = !dataBase.DeckNames[index].paused
    setDataBase(newDataBase)
    
  }



  function generateRandom() {                                                                                                                                                                                                                                                                                                                                                                         
    let randomQuestion = null
    if (dataBase.queue[0] && dataBase.queue[0].timeLeft === 0) {
      //need to have algorithm to filter s in queue related onlz for this deck
      //also not tot forget add decremental time algorith for all crads no matter waht deck
      randomQuestion = dataBase.queue.shift().index

    } else {
      randomQuestion = Math.floor(Math.random() * data.length);
    }

    setRandomQuestion(randomQuestion);
    setShow(true)
    closePopup()
    // console.log(data)
 

     if (data.length === 0) {


      alert('add questions to deck')
      setOpenDeck(false)
    }
  }

  function addToQueue(time) {
    let newDataBase = { ...dataBase }
    newDataBase.queue.push({
      ...data[randomQuestion],
      index: randomQuestion,
      timeLeft: time * 1000,
      item: name
    })
    setDataBase(newDataBase)
  }


  useEffect(() => {

    if (show) {
      let timeLeft = setInterval(() => {

        // dataBase.queue.forEach((item, index) => {
        //   if (dataBase.queue[index].timeLeft >= 1000) {
        //     dataBase.queue[index].timeLeft -= 1000
        //   } else {
        //     dataBase.queue[index].timeLeft = 0
        //   }
        console.log(name, timeLeft)
        //     // })
      }, 1000)
      // })
      //everything  here will be returned when components unmounts
      setTimer(timeLeft)
    } else {
      console.log(timer)
      clearInterval(timer)

      console.log('oh you delete me')
    }
    //return function () {clearInterval(timeLeft)}
  }, [show])


  function deleteCurrentCard() {
    let newDataBase = { ...dataBase }
    newDataBase.DeckNames[index].data.splice(randomQuestion, 1)
    setDataBase(newDataBase)
    generateRandom()  
  }

  function changeHandler(e) {
    let { name: input, value } = e.target;
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[name].data[randomQuestion][input] = value;
    setDataBase(newDataBase)
  }


  return (
    <>
    
      <Button 
          variant='secondary'
          className= {'openDeck'}
          size='sm'
          style= {{
                    opacity: dataBase.DeckNames[index].paused? '0': '1',
                    cursor:  dataBase.DeckNames[index].paused? 'default': 'pointer'
                  }}
          onClick={paused?
                    null
                    :
                    generateRandom
                    }     
      >

          Open Deck

      </Button>
    
      {
        openDeck && !dataBase.DeckNames[index].paused &&

        <BasicOrangeWindow 
          show={show}
          showRepeatBtn={showRepeatBtn}
          setShowRepeatBtn={setShowRepeatBtn}
          setShow={setShow}
          setShowAnswerBtn = {setShowAnswerBtn}
          setEdit={setEdit}
          title={`Deck: ${name}`}
          menu={<ThreeDotsBtn
           
                   text={'card'}
                   editName={true}
                   className='threeDotsInQuestionAnswerStyling'
                   threeDotsContainer = {{position: 'default'}}
                   index={index}
                   edit pause trash
          
                   editEvent={() => {
                      setShowAnswerBtn(false)
                      setEdit(true)  
                      setShowRepeatBtn(false)  
                      // setShow(false)
                      // setEditName(false)   
                    }}

                    pauseEvent={() => {
                            // handlePause()
                    }}   

                    trashEvent={() => {
                        setTrash(true)

                        dataBase.checkboxClicked?

                              deleteCurrentCard() 
                                  : 
                              setShowDeleteFrame(true)
                          }}
                 />
                }
          >

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
                  value={data[randomQuestion].question} 
                  className='w-100'
                  disabled={!edit}
                  name='question'
                  onChange={changeHandler}
                />

              </div>

              {
                showAnswerBtn &&
                
                <Button
                  // style={{ width: '32%', height: '32px', padding: '0 !important', position: 'relative', left: '10px'}}
                  class='p-1'
                  variant='secondary'
                  className='showAnswer my-5 d-flex justify-content-center align-items-center'
                  onClick={() => {
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
                      dataBase.userTimePreferences.map((col, k) =>

                          <RepeatBtn
                              btn={col.name}
                              label={'< ' + col.amount + col.unit}
                              onClick={() => {
                                  setShowAnswerBtn(!showAnswerBtn)
                                  setShowRepeatBtn(false)
                                  generateRandom()
                              }}
                          />
                      )}
                </div>
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
                        value={data[randomQuestion].answer}
                        className='w-100'
                        disabled={!edit}
                        name='answer'
                        onChange={changeHandler}
                    />
                </div>
              }

              {
                edit && 

                <div className='d-flex justify-content-center'                
                >

                    <SaveAndDiscard 
                        editEvent={() => {
                            setShowAnswerBtn(true)
                            setEdit(false)
                        }}
                        generateRandom={generateRandom}                       
                    />
                </div>
              }
              
              {
                trash && showDeleteFrame &&

                <DeleteCardQuestionBox
                  card='card'
                  checked = {checked}
                  setChecked = {setChecked}
                  show={show}
                  deleteFrame={() => setShowDeleteFrame(false)}
                  trashEvent={deleteCurrentCard}
                  onHide={()=>{
                    setShowAnswerBtn(true)
                    setShowRepeatBtn(false)
                  }}      
                />
              }

            </>
          }

        </BasicOrangeWindow>
      }
    </>
  )
}




