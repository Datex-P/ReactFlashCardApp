import React, {
  useEffect,
  useState,
  useContext,useRef
} from 'react';
import Deck from './deck/';
import { Container, Row, Spinner } from 'react-bootstrap'
// import EffectTest from '../EffectTest.js';
import { Context } from '../Context'//step 4.1 import context instance
import CreateNewDeck from './deck/CreateNewDeck'
import NavBar from '../NavBar'


export default function DeckContainer() {
  //const { dataBase,styles } = useContext(Context);// step 4.2 destructure context value
  const { dataBase, setDataBase, styles } = useContext(Context)
 
  const scroller = useRef();

  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

  const [active, setActive] = useState(null)
  const [showDeck, setShowDeck] = useState(true)
  const [loadSpinner, setLoadSpinner] = useState(true)
  const [createNewDeckDisplay, setCreateNewDeckDisplay] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)


  function scrollHandler (e) {
    let position = e.target.scrollTop
    
    if (position < scrollPosition) {
      console.log('you are scrolling up')
    } else {
      console.log('you are scrolling down')
    }

    setScrollPosition(position)
  }

  useEffect(() => {
    setActive(dataBase && (dataBase.DeckNames.length-1))

  }, [dataBase?.active==null])

  function handleActive(i){
    setActive(i)
    let newDataBase = {...dataBase}
    newDataBase.active = i
    setDataBase(newDataBase)
  }
  

  useEffect(() => {
    //scroller.current.scroll(0,800)
      setTimeout(()=>{setLoadSpinner(false)},2000)
    
  }, []);
  

  return (

    !loadSpinner && dataBase ?
      <>
        <NavBar />
        <Container 
            className='align-items-center' 
            style={{ 
                    backgroundColor: styles.backgroundColor[dataBase.userPreferences.backgroundColor], 
                    borderBottomLeftRadius: '5px', 
                    borderBottomRightRadius: '5px', 
                    height: '650px', 
                    width: '504px' 
                    }} 
          >
          <Row>
            {
              showDeck &&

              <div 
                  style={{ 
                          position: 'relative', padding: '50px', width: '400px', 
                          marginLeft: '30px', marginTop: '60px' 
                        }}
              >
                  <div>
                      {
                        dataBase.DeckNames.map((deck, index) =>
                        <Deck
                            key={index}
                            index={index}
                            deck={deck}
                            name={deck.name}
                            active={active === index}
                            setActive = {setActive}
                            transform={active === index ? `rotate(0deg)` : 
                            `rotate(${
                              ( dataBase.DeckNames.length  - index) * -2}deg)`}

                            zIndex={active === index ? 2 : 0}
                            background = 
                            {
                              active === index && deck.paused ? 
                            `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAe0lEQVQoU03PURECMQxF0RMbrIzFBjbQUR3YwAYrA2xkJ2l3hn61fZl7XwI7jkAyghd+5jtjBXvwwKgAN3zReZ0K3sGx3omtSDVQ2FE/MXWf7OskFaJw7Sxtcr9I3Wl1aGcQf6TudKEy2HKRSlmderuY2B4sXfK8tqlOJ205I9rLApoiAAAAAElFTkSuQmCC) 
                            ${colors[index % 5]} repeat`
                            :
                            colors[index % 5]
                            }
                      />     
                      )
                      }
                  </div>
                  <div
                      ref={scroller}
                      style={{ 
                              height: '220px', width: '375px', overflow: 'scroll', 
                              overflowX: 'hidden', position: 'absolute', top: '65px' 
                            }}
                      onScroll={(event) => {

                        let step = (1000 - 220) / ((dataBase.DeckNames).length - 1);
                        let index = Math.floor(event.target.scrollTop / step);
                        handleActive(index);
                        console.log(index);
                        scrollHandler(event);
                      }}
                  >
                      <div style={{ 
                                  height: '1000px', position: 'absolute', top: '0px', width: '100%' 
                                }}
                      >                        
                      </div>
                  </div>
              </div>
            }
          </Row>

          <Row  className="justify-content-center"
          >
              <button
                  style={{ 
                      zIndex: '4', 
                      padding: '2px', 
                      position: 'fixed', 
                      top: '630px', 
                      width: '210px', 
                      outline: 'none !important' 
                      }} 
                  className='generalButtonStyling'
                  onClick={
                  () => {
                    setCreateNewDeckDisplay(true)
                    setShowDeck(false)
                  }
                  }
              >
                  Create Deck
              </button>

              <CreateNewDeck 
                  createNewDeckDisplay={createNewDeckDisplay}      
                  setShowDeck={setShowDeck}
                  setActive={setActive}
                  setCreateNewDeckDisplay={setCreateNewDeckDisplay}
                  style={{ position: 'absolute', zIndex: '40' }}
                  close={
                    ()=>{
                    setShowDeck(true)
                    setCreateNewDeckDisplay(false)
                    }
                    }
              />
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


