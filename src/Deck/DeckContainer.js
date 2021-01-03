import React, {
  useEffect,
  useState
} from 'react';
import Deck from './Deck.js';
import { Container, Row } from 'react-bootstrap'
// import EffectTest from '../EffectTest.js';

export default function DeckContainer() {

  const [dataBase, setDataBase] = useState(null);

  useEffect(() => {
    let dB = {
      DeckNames: {
        /*deckname:[]*/
      },
      queue: [],
      userStylePreferences: [],
      showDeleteFrame: true,
      toStudyGoal: 20,
      toReviewGoal: 0,
      timeValues: {
        left: 2,
        middle: 5,
        right: 10
      },
      nameValues: {
        leftName: 'again',
        middleName: 'good',
        rightName: 'easy'
      },
      studyTime: 0,
      calendarReset: false,
      weeklyTarget: 1,
      daysOfStudy: {
        day: 4
      },
      studied: [new Date()]

    };

    for (let i = 1; i < 7; i++) {
      let arr = [];
      for (let i = 1; i < 10; i++) {
        arr.push({
          question: `question${i}`,
          answer: `answer${i}`
        })
      };
      dB.DeckNames[`Literature${i}`] = {
        data: arr,
        toStudyGoal: 20,
        cardsToday: 0
      }

    };


    setDataBase(dB)
  }, []);
  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

  const [active, setActive] = useState(null)
  
  useEffect(() => {
    setActive( dataBase && (Object.keys(dataBase.DeckNames).length - 1))

  },[dataBase])

  return (
    dataBase
      ?

      <Container>
        <Row>
          <div style={{ position: 'relative', padding: '50px' }}>
            <div >

              {
                Object.keys(dataBase.DeckNames).map((deck, index, array) =>
                  <Deck
                    deck={dataBase.DeckNames[deck]}
                    name={active === index ? deck : ''}
                    backgroundColor={colors[index % 5]}
                    transform={active === index ? `rotate(0deg)` : `rotate(${(array.length - 1 - index) * -2}deg)`}
                    zIndex={active === index ? 2 : 0}
                    active = {active === index}
                  />
                )
              }
            </div>
            <div
              style={{ height: '220px', width: '400px',overflow: 'scroll', overflowX: 'hidden', position: 'absolute', top: '50px' }}
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
          {/* <EffectTest /> */}
        </Row>
      </Container>
      :
      'dataBase is empty'
  )
}

  // document.querySelector("#scrollable").onscroll = function (event) {
  //   let all = listOfDecks.querySelectorAll('.newDeckContainer')
  //   let step = (1000 - 140) / (all.length - 1)
  //   let index = Math.floor(event.target.scrollTop / step)
  //   // index = (index > arr.length-1) ? arr.length-1 : index


  //   Array.from(all).reverse().forEach((item, index) => {
  //     item.style.zIndex = 0

  //     item.querySelector('.orangeCircle').style.display = 'none'
  //     item.style.transform = `rotate(${(index * -2) || -2}deg)`;
  //   })
  //   all[index].style.zIndex = 2;
  //   all[index].style.transform = 'rotate(0deg)';
  //   all[index].querySelector('.orangeCircle').style.display = 'flex'

  // }





  // const popover = (
  //   <Popover id="popover-basic">
  //     <Popover.Title as="h3">Popover right</Popover.Title>
  //     <Popover.Content>
  //       And here's some <strong>amazing</strong> content. It's very engaging.
  //       right?
  //     </Popover.Content>
  //   </Popover>
  // );
  
  // const Example = () => (
  //   <OverlayTrigger trigger="click" placement="right" overlay={popover}>
  //     <Button  variant='none' className='p-1' style={{transform: 'rotate(90deg)', height:'30px'}}>...</Button>
  //   </OverlayTrigger>
  // );
  
  // render(<Example />);