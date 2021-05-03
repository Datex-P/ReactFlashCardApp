
import React from 'react';

export default function SaveAndDiscard({ saveEvent, generateRandom, setCardModified,discardEvent }) {

  // const [isEnterMouse, setIsEnterMouse] = useState(false);

  // const handleBackground = state => {
  //   setIsEnterMouse(state);
  // };
  return (

    <div className='saveAndDiscardContainer d-flex justify-content-around align-items-center flex-column'>

      <div>Save changes?</div>
      <div 
          className='d-flex justify-content-between'
          style={{width: '140px'}}
          >
      {
        ['Discard', 'Save'].map(el =>
          <div
            className={`saveAndDiscardButtonStyling d-flex justify-content-around align-items-center 
            isEnterMouse ? 'backgroundColor' : ''`}
            
            style={{
                  
                    backgroundColor: el === 'Save' ? '#d4edda' : '#f8d7da',
                    color: el === 'Save'?   '#155724' : '#721c24'
                    }}
            onClick={
                    el === 'Save'? 
                    ()=>{
                        generateRandom();
                        saveEvent();
                        setCardModified(true)
                      } 
                        : 
                      discardEvent
                  }
            
                
      // onMouseEnter={() => handleBackground(true)}
      // onMouseLeave={() => handleBackground(false)}
          >

            {el}
          </div>
        )
      }
            </div>
    </div>
  )
}