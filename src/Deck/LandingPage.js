import React, {useEffect, useState, useContext,useRef} from 'react';
import { Context } from '../Context'//step 4.1 import context instance
import { Container, Row, Spinner } from 'react-bootstrap'

import Deck from './deck/';
import CreateNewDeck from './deck/CreateNewDeck'
import NavBar from '../NavBar'


export default function DeckContainer() {
  //const { dataBase,styles } = useContext(Context);// step 4.2 destructure context value
  const { dataBase, setDataBase, styles } = useContext(Context)
  const [trigger, setTrigger] = useState(null)
  const scroller = useRef();

  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875']

  const [pauseIsActive, setPauseIsActive] = useState(true)
  const [active, setActive] = useState(null)
  const [decksAreVisible, setDecksAreVisible] = useState(true)
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(true)
  const [addNewDeckWindow, setAddNewDeckWindow] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)


  function scrollHandler (e) {
    let position = e.target.scrollTop
    
    if (position < scrollPosition) {
      console.log('you are scrolling up')

    } else {
      console.log('you are scrolling down')
    }

    setScrollPosition(position)
    setTrigger(Symbol())
  }

  

  function handleActive(i){
    setActive(i)
    let newDataBase = {...dataBase}
    newDataBase.active = i
    setDataBase(newDataBase)
  }
  

  useEffect(
    () => {
    //scroller.current.scroll(0,800)
      setTimeout(
        ()=>{setSpinnerIsVisible(false)},2000
        )
  }, []
  );
  

  return (

    !spinnerIsVisible && dataBase ?

      <>
        <NavBar />
        <Container 
            className='align-items-center containerStyling' 
            style={{ 
             backgroundColor: styles.backgroundColor[dataBase.userPreferences.backgroundColor]
                    }} 
          >

          <Row>
            {
              decksAreVisible &&

                  <div className='firstRowStyling'
                  
                  >
                      <div>
                          {
                            dataBase.DeckNames.filter((i,k)=>active!==k).map((deck, index) =>
                            <Deck
                                key={index}
                                index={index}
                                deck={deck}
                                name={deck.name}
                                active={false}
                                trigger={trigger}
                                transform={
                                          `rotate(${( dataBase.DeckNames.length-1  - index) * -2}deg)`
                                          }
                                setActive = {setActive}
                                zIndex={0}
                                background = {
                                  deck.paused ? 
                                  
                                `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAe0lEQVQoU03PURECMQxF0RMbrIzFBjbQUR3YwAYrA2xkJ2l3hn61fZl7XwI7jkAyghd+5jtjBXvwwKgAN3zReZ0K3sGx3omtSDVQ2FE/MXWf7OskFaJw7Sxtcr9I3Wl1aGcQf6TudKEy2HKRSlmderuY2B4sXfK8tqlOJ205I9rLApoiAAAAAElFTkSuQmCC) 
                                ${colors[index % colors.length]} repeat`
                                :
                                colors.map((i,k,ar)=>{
                                  if(active===k){
                                    return ar[ar.length%(k||1)]
                                  }else{
                                    return i
                                  }
                                })
                                [index % colors.length]
                                }
                          />     
                          )
                          }

                          {
                            dataBase.DeckNames.filter((i,k)=>k===active).map((deck, index) =>
                            <Deck
                                key={index}
                                index={index}
                                deck={deck}
                                name={deck.name}
                                active={true}
                                trigger={trigger}
                                pauseIsActive={pauseIsActive}
                                setPauseIsActive={setPauseIsActive}
                                setActive = {setActive}
                                transform={`rotate(0deg)`}
                                zIndex={2}
                                background = 

                                {
                                   deck.paused ? 

                                `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAe0lEQVQoU03PURECMQxF0RMbrIzFBjbQUR3YwAYrA2xkJ2l3hn61fZl7XwI7jkAyghd+5jtjBXvwwKgAN3zReZ0K3sGx3omtSDVQ2FE/MXWf7OskFaJw7Sxtcr9I3Wl1aGcQf6TudKEy2HKRSlmderuY2B4sXfK8tqlOJ205I9rLApoiAAAAAElFTkSuQmCC) 
                                ${colors[active % colors.length]} repeat`
                                :
                                colors[active % colors.length]
                                }
                          />     
                          )
                          }

                      </div>
                      <div
                          ref={scroller}
                          className='scrollerStyling'
                          onScroll={(event) => {

                            let step = (1000 - 220) / ((dataBase.DeckNames).length - 1);
                            let index = Math.floor(event.target.scrollTop / step);
                            handleActive(index);
                            console.log(index + 'actual handle active index');
                            scrollHandler(event);
                          }}
                      >
                          <div style={{height: '1000px', position: 'absolute', top: '0px', width: '100%'}}
                          >

                          </div>
                      </div>
                  </div>
            }
          </Row>

          <Row  className="justify-content-center"
          >
              <button
                  className='generalButtonStyling createDeckButtonStyling'
                  onClick={
                    () => {
                    setAddNewDeckWindow(true)
                    setDecksAreVisible(false)
                  }}
              >

                  Create Deck
              </button>
              
              <div style={{marginTop: '40px'}}>
                  <CreateNewDeck 
                      addNewDeckWindow={addNewDeckWindow}      
                      setDecksAreVisible={setDecksAreVisible}
                      setAddNewDeckWindow={setAddNewDeckWindow}
                      setActive={setActive}
                      style={{ position: 'absolute', zIndex: '40' }}
                      close={
                            ()=>{
                            setDecksAreVisible(true)
                            setAddNewDeckWindow(false)
                            }}
                  />
              </div>

          </Row>
      </Container>
  </>

    :
      // 'database empty'    
      <div 
          className='d-flex align-items-center justify-content-center' 
          style={{ height: '50vh' }}
      >
          <Spinner animation="grow" />
      </div>
   )
}


