import React, { useState, useContext, useEffect } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import ThreeDotsBtn from './ThreeDotsBtn';
import { Context } from '../../Context'
import BasicOrangeWindow from './BasicOrangeWindow'
import DeleteCardQuestionBox from './DeleteCardQuestionBox'
import SaveAndDiscard from './CardBodyParts/SaveAndDiscard'
import RepeatBtn from './CardBodyParts/RepeatBtn'


export default function QuestAnswerTrainOverv({name, data, closePopup,index,paused }) {
  
  
  const [checked, setChecked] = useState(false)
  const [edit, setEdit] = useState(false);
  const [random, setRandom] = useState(null);
  
  const [show, setShow] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  
  const [showDeleteFrame, setShowDeleteFrame] = useState(true)
  const [pauseIsActive, setPauseIsActive] = useState(true)
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
    let random = null
    if (dataBase.queue[0] && dataBase.queue[0].timeLeft === 0) {
      //need to have algorithm to filter s in queue related onlz for this deck
      //also not tot forget add decremental time algorith for all crads no matter waht deck


      random = dataBase.queue.shift().index
    } else {
      random = Math.floor(Math.random() * data.length);
    }

    setRandom(random);
    setShow(true)
    closePopup()
    console.log(data)
 

     if (data.length === 0) {


      alert('add questions to deck')
      setOpenDeck(false)
    }
  }

  function addToQueue(time) {
    let newDataBase = { ...dataBase }
    newDataBase.queue.push({
      ...data[random],
      index: random,
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
    newDataBase.DeckNames[index].data.splice(random, 1)
    setDataBase(newDataBase)
    generateRandom()  
  }

  function changeHandler(e) {
    let { name: input, value } = e.target;
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[name].data[random][input] = value;
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
        onClick={
          paused
          ?
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
          showRepeat={showRepeat}
          setShowRepeat={setShowRepeat}
          setShow={setShow}
          setShowAnswer = {setShowAnswer}
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
                      setShowAnswer(true)
                      setEdit(true)       
                    }}

                    pauseEvent={() => {
                            // handlePause()
                    }}   

                    trashEvent={() => {

                      setTrash(true)

                    dataBase.checkboxClicked?
                      deleteCurrentCard() : setShowDeleteFrame(true)

                    }}
                 />}
          >
          {
            data[random]
            &&
            <>
              <div className='mb-4'>
                <p className='questionAnswerStyling'>Question</p>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  value={data[random].question} className='w-100'
                  disabled={!edit}
                  name='question'
                  onChange={changeHandler}
                />
              </div>
              {
                !showAnswer
                &&
                <Button
                  style={{ width: '40%' }}
                  class='p-1'
                  variant='secondary'
                  onClick={() => {
                    setShowAnswer(true)
                    setShowRepeat(true)
                  }}
                  className='showAnswer my-5'
                >
                  Show answer
                </Button>
              }
              {
                showRepeat
                &&
                <div className="d-flex justify-content-between px-3">

                  {dataBase.userTimePreferences.map((col, k) =>
                    <RepeatBtn
                      btn={col.name}
                      onClick={() => {
                        setShowAnswer(!showAnswer)
                        setShowRepeat(false)
                      }}
                      label={'<' + col.amount + col.unit}
                    />
                  )}
                </div>
              }
              {
                showAnswer
                &&
                <div className='mt-4'>
                  <p className='questionAnswerStyling'>Answer</p>
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    value={data[random].answer}
                    className='w-100'
                    disabled={!edit}
                    name='answer'
                    onChange={changeHandler}
                  />
                </div>
              }
              {
                edit && 

                <div className='d-flex justify-content-center'>
                    <SaveAndDiscard 
                        editEvent={() => {
                            setShowAnswer(false)
                            setEdit(false)
                        }}                       
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
                    setShowAnswer(false)
                    setShowRepeat(false)
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




