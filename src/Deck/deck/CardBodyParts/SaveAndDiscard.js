
export default function SaveAndDiscard({ editEvent }) {

  return (

    <div className='saveAndDiscardContainer d-flex justify-content-around align-items-center'>

      {
        ['Discard', 'Save'].map(el =>
          <div
            className='generalButtonStyling d-flex justify-content-around align-items-center'
            style={{
              fontSize: '14px',
              width: '63px',
              height: '24px',
              backgroundColor: el === 'Save' ? '#2d6a4f' : '#772e25'
            }}
            onClick={editEvent}
          >

            {el}
            
          </div>
        )
      }
    </div>
  )
}