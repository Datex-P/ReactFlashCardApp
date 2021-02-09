
export default function SaveAndDiscard({ editEvent, generateRandom }) {

  return (

    <div className='saveAndDiscardContainer d-flex justify-content-around align-items-center'>

      {
        ['Discard', 'Save'].map(el =>
          <div
            className='saveAndDiscardButtonStyling d-flex justify-content-around align-items-center'
            style={{
              backgroundColor: el === 'Save' ? '#2d6a4f' : '#772e25'}}
            onClick={
              el === 'Save'? 
              ()=>{generateRandom();editEvent()} : editEvent
            }
          
          >

            {el}

          </div>
        )
      }
    </div>
  )
}