import React, {useState,useContext} from 'react'
import { Card} from 'react-bootstrap'
import '../styles.css'
import ThreeDotsBtn from './ThreeDotsBtn'
import AddNewDeck from './AddNewDeck'
import CardBody from './CardBody'
import {Context} from '../../Context'
import CardHeader from  './CardHeader'


export default function Deck({ deck: { data }, name, active, ...style }) {
  const [show, setShow] = useState(false);
  const {dataBase, setDataBase} = useContext(Context);
  

  function deleteDeck(){
    let newDataBase = {...dataBase}
    delete newDataBase.DeckNames[name]
    setDataBase(newDataBase)
  }

 
  
  return (



    <Card style={style} className='newDeckContainer flexColumn position-absolute'>
      <Card.Body className='justify-content-center align-items-center flex-column d-flex'>

        <Card.Title className='d-flex align-items-center justify-content-between position-relative'
                    style={{width:'140px'}}>
   
         <CardHeader bg={style.backgroundColor}>{name}</CardHeader>
         
          <ThreeDotsBtn
            text={'deck'}
            showFromParent={show}
            setShowFromParent={setShow}
            trashEvent={deleteDeck}
        
            style= {{position:'absolute', top:'-14px', left:'6px', zIndex: '2000', backgroundColor: 'white', 
        border:'1px solid black', overflow:'hidden'}}
            edit pause trash
          />
        </Card.Title>
        <Card.Text>

          <div className='divStyling'>To study: <input type='number' className='inputStyling'></input></div>
          <div className='divStyling'>To review:</div>
          <div className='divStyling'>Decksize:<div>
      
          {/* `${dataBase.DeckNames[name].data.length}` */}
          </div></div>

        </Card.Text>
        <CardBody name={name} data={data} closePopup={() => setShow(false)} />
        {active && <AddNewDeck name= {name} closePopup={() => setShow(false)} />}
      </Card.Body>

    </Card>

  

  )

}


