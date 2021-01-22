import React, {
  useEffect,
  useState,
  useContext
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
  const [show, setShow] = useState(false);



  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

  const [active, setActive] = useState(null)
  const [showDeck, setShowDeck] = useState(true)
  const [loadSpinner, setLoadSpinner] = useState(true)
  const [createNewDeckDisplay, setCreateNewDeckDisplay] = useState(false)

  useEffect(() => {
    setActive(dataBase && (Object.keys(dataBase.DeckNames).length - 1))

  }, [dataBase])

  useEffect(() => {

      setTimeout(()=>{setLoadSpinner(false)},3000)
    
  }, []);

  return (
    // false
    //   ?
    !loadSpinner && dataBase ?
      <>
        <NavBar />
        <Container className='align-items-center' style={{ backgroundColor: styles.backgroundColor[dataBase.userPreferences.backgroundColor], 
        borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', height: '650px', width: '504px' }} >


          <Row
          >
            {showDeck &&
              <div style={{ position: 'relative', padding: '50px', width: '400px', marginLeft: '30px', marginTop: '60px' }}>

                <div >
                  {
                    Object.keys(dataBase.DeckNames).map((deck, index, array) =>
                      <Deck
                        deck={dataBase.DeckNames[deck]}
                        name={active === index ? deck : ''}
                        backgroundColor={colors[index % 5]}
                        transform={active === index ? `rotate(0deg)` : `rotate(${(array.length - 1 - index) * -2}deg)`}
                        zIndex={active === index ? 2 : 0}
                        active={active === index}
                      />
                    )
                  }
                </div>
                <div
                  style={{ height: '220px', width: '375px', overflow: 'scroll', overflowX: 'hidden', position: 'absolute', top: '65px' }}
                  onScroll={(event) => {

                    let step = (1000 - 220) / (Object.keys(dataBase.DeckNames).length - 1)
                    let index = Math.floor(event.target.scrollTop / step)
                    setActive(index)
                    console.log(index)
                  }}
                >

                  <div
                    style={{ height: '1000px', position: 'absolute', top: '0px', width: '100%' }}
                  ></div>

                </div>
              </div>
            }
          </Row>

          <Row className="justify-content-center"
          >
            <button
              onClick={() => {

                setCreateNewDeckDisplay(true)
                setShowDeck(false)
              }}
              style={{ zIndex: '4', padding: '2px', marginTop: '400px', width: '210px' }} className='generalButtonStyling'
            >
              Create Deck
          </button>

            <CreateNewDeck close={() => { setCreateNewDeckDisplay(false); setShowDeck(true) }} createNewDeckDisplay={createNewDeckDisplay} style={{ position: 'absolute', zIndex: '40' }} />

          </Row>

        </Container>
      </>
      :
      // 'database empty'
        
      <div className='d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
        <Spinner animation="grow" />
      </div>
   )
      }

