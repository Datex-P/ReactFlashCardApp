
export default function SaveAndDiscard({ editEvent }) {

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