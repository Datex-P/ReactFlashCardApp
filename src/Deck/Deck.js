import React, { useState} from 'react'
import { Card, Button, Modal, FormControl,OverlayTrigger,Popover, ButtonGroup} from 'react-bootstrap'
import './styles.css'
import trash from '../icons/trash.svg'
import pause from '../icons/pause.svg'
import edit from '../icons/edit.svg'




export default function Deck({ deck: { data }, name, active, ...style }) {

  return (

    <Card style={style} className='newDeckContainer flexColumn position-absolute'>
      <Card.Body className='justify-content-center align-items-center flex-column d-flex'>
        <Card.Title>{name}</Card.Title>
        <Card.Text>

          <div style={{ marginBottom: 10 }} className='divStyling'>To study: <input type='number' style={{width: '49px', border: 'none', outline: 'none', textAlign: 'center'}}></input></div>
          <div style={{ marginBottom: 10 }} className='divStyling'>To review:</div>
          <div style={{ marginBottom: 10 }} className='divStyling'>Decksize:</div>

        </Card.Text>
        <CardBody name={name} data={data} />
        {active && <AddNewDeck />}
      </Card.Body>

    </Card>

  )

}

function AddNewDeck() {

  return (
    
    <button className={'addNewCardsButton'}>+</button>

  )

}

function CardBody({ name, data }) {
  const [show, setShow] = useState(false);
  const [card, setCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  function generateRandom() {
    let random = Math.floor(Math.random() * data.length);
    console.log(random)
    setCard(data[random]);
    setShow(true)
  }

  return (
    <>
      <Button
        variant='secondary'
        style={{ marginTop: -20 }}
        size='sm'
        onClick={generateRandom}
      >Open Deck</Button>


      <Modal 
        show={show} 
        onHide={() => setShow(false)} 
        contentClassName={'mod'}
        backdrop="static"
      >
        <Modal.Header className='border-bottom-0'>
          <Modal.Title style={{fontSize: '16px'}}>{`Deck: ${name}`}</Modal.Title>
          <ThreeDotsBtn />
          <button className='redCross' onClick={() => setShow(false)} >X</button>
        </Modal.Header>
        <Modal.Body >
          {
            card
            &&
            <>
              <div className = 'mb-2'>
                <p className= 'questionAnswerStyling'>Question</p>
                <FormControl as="textarea" aria-label="With textarea" value={card.question} className='form' />
              </div>
              <Button onClick={() => setShowAnswer(!showAnswer)} className='showAnswer my-5'>Show answer</Button>
              {
                showAnswer
                &&
                <div className = 'mt-2'>
                  <p className= 'questionAnswerStyling'>Answer</p>
                  <FormControl as="textarea" aria-label="With textarea" value={card.answer} className='form' />
                </div>
              }
            </>
          }



        </Modal.Body>
      </Modal>
    </>
  );
}

function ThreeDotsBtn(){
  return (

      <OverlayTrigger trigger="hover"  placement="right" overlay={
        <Popover id='popover-basic' >
          <Popover.Content  className='p-1'>
            <ButtonGroup vertical  >
              <Button style={{marginTop:'20px', backgroundColor: 'white', border: '1px solid black', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src={edit} alt='edit' style={{marginRight: '3px'}}/>Card</Button>
              <Button className='buttonStyling flexAlignCenter'><img src={pause} alt='pause' style={{marginRight: '3px'}}/>Card</Button>
              <Button className='buttonStyling flexAlignCenter'><img src={trash} alt='trash' style={{marginRight: '3px'}} />Card</Button>
            </ButtonGroup>
          </Popover.Content>
        </Popover>
      }>
        <Button className = 'rotateLittleModal' variant="none">...</Button>
      </OverlayTrigger>
    
  )
}