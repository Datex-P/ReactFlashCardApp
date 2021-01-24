import React, { useState, useContext, useEffect } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import ThreeDotsBtn from './ThreeDotsBtn';
import { Context } from '../../Context'
import StyledModal from './StyledModal'
import DeleteCardQuestionBox from './DeleteCardQuestionBox'


export default function CardBody({name, data, closePopup }) {
  
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [random, setRandom] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [trash, setTrash] = useState(false);
  const [showDeleteFrame, setShowDeleteFrame] = useState(true)
  const { dataBase, setDataBase } = useContext(Context);
  const [timer, setTimer] = useState(null)
  const [openDeck, setOpenDeck] = useState(true)
  const [checked, setChecked] = useState(false)


  function generateRandom() {
    let random = null
    if (dataBase.queue[0] && dataBase.queue[0].timeLeft === 0) {
      //need to have algorithm to filter cards in queue related onlz for this deck
      //also not tot forget add decremental time algorith for all crads no matter waht deck


      random = dataBase.queue.shift().index
    } else {
      random = Math.floor(Math.random() * data.length);
    }

    setRandom(random);
    setShow(true)
    closePopup()
    console.log(data)
 

    if (dataBase.DeckNames[name].data.length === 0) {

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
 
    newDataBase.DeckNames[name].data.splice(random, 1)
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
        className='openDeck'
        size='sm'
        onClick={generateRandom}
      
      >Open Deck</Button>


      {openDeck &&
        <StyledModal
          show={show}
          setShow={setShow}
          setShowAnswer = {setShowAnswer}
          setEdit={setEdit}
          title={`Deck: ${name}`}
          menu={<ThreeDotsBtn
            setShowAnswer
            text={'card'}
            editName={true}
            editEvent={() => {
              setShowAnswer(true)
              setEdit(true)       
            }}
           
            trashEvent={() => {

              setTrash(true)
           
              checked? deleteCurrentCard():    setShowDeleteFrame(true)

            }}
            style={{
              position: 'absolute', top: '-14px', left: '53px', height: '98px', zIndex: '2000', backgroundColor: 'white',
              border: '1px solid black', overflow: 'hidden'
            }}
          
            edit pause trash

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
                edit
                && <div className='d-flex justify-content-center'>
                  <SaveAndDiscard editEvent={() => {

                    setShowAnswer(false)
                    setEdit(false)
                  }} />
                </div>
              }
              {
                trash && 
                showDeleteFrame &&
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
        </StyledModal>
      }
    </>
  )
}


function RepeatBtn({ label, btn, onClick }) {
  return (
    <div className='text-center'>
      <div className='font-weight-bold'>{label}</div>
      <Button variant="secondary"
        onClick={onClick}
      >{btn}</Button>
    </div>
  )
}


function SaveAndDiscard({ editEvent }) {

  return (
    <div className='saveAndDiscardContainer d-flex justify-content-around align-items-center'>

      {
        ['Discard', 'Save'].map(el =>
          <div
            style={{
              fontSize: '14px',
              width: '63px',
              height: '24px',
              backgroundColor: el === 'Save' ? '#2d6a4f' : '#772e25'
            }}
            className='generalButtonStyling d-flex justify-content-around align-items-center'
            onClick={editEvent}
          >
            {el}
          </div>
        )
      }
    </div>
  )
}


