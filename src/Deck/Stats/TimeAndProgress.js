

export default function TimeAndProgress() {
  let studyGoal = 80
  let timeObj = {
    6: 15,
    12: 20,
    18: 14,
    24: 4
  }
  let currentProgress = Object.values(timeObj).reduce((sum, i) => sum += i, 0) / studyGoal * 100;
  let widthAdjusted = Math.round(currentProgress) + 120;

  function renderLines() {

    let arr = []
    let previousWidthVar = 0
    for (let i = 6; i <= 24; i += 6) {

      if (i in timeObj) {
        let widthVar = (timeObj[i] || 0) / studyGoal * 100
        previousWidthVar += widthVar

        if (i === 18) {
          
          arr.push(
          <Row 
              previousWidthVar={previousWidthVar} 
              widthVar={widthVar} 
              time={
              
              <div style={{paddingLeft: '3px', height: '21px'}}
              >
                  {'18 - 24'}
              </div>
              }
          />
          )

        } else if (i === 24) {

          arr.push(
            <Row 
                previousWidthVar={previousWidthVar} 
                widthVar={widthVar} 
                time={
                      <div style={{paddingLeft: '3px', height: '21px'}}
                      >
                          {'24 - 6'}
                      </div>
                    } 
            />
            )

        } else if (i <= 12) {

          if (i <12) {
            
            arr.push(
            <Row 
                previousWidthVar={previousWidthVar} 
                widthVar={widthVar} 
                time={
                    <div style={{paddingLeft: '3px', height: '21px'}}
                    >
                        {'0' + i} - {(i + 6)}
                    </div>
                    } 
            />
            )
          } else {
            arr.push(
            <Row 
                previousWidthVar={previousWidthVar} 
                widthVar={widthVar} 
                time={
                      <div style={{paddingLeft: '3px', height: '21px'}}
                      >
                          {'12'} - {'18'}
                      </div>
                      } 
            />
            )
          }
        } else {
          arr.push(
          <Row 
              previousWidthVar={previousWidthVar} 
              widthVar={widthVar} 
              time={
                    <div style={{paddingLeft: '3px'}}
                    >
                        {i} - {i + 4}
                    </div>
                    }
           />
           )
        }
      }
    }
    return arr
  }

  return (


    <div className='diagramHourlyBreakdownContainer d-flex flex-column justify-content-around'
    >
       <div
        className='d-flex'
      > 
        <div className='studyGoalStyling'
              style={{height: '27px'}}        
        >

            Study Goal
        </div>

        <div 
            className='progressBar' 
            style={{ marginLeft: '21px' }}
        >
            <div
                style={{
                      backgroundColor: 'orange',color: 'black',height: '10px',
                      width: `${Object.values(timeObj).reduce((sum, i) => sum += i, 0) / studyGoal * 100}%`
                }}
            >
          </div>

        </div>

        <div style={{position: 'absolute', top: '2px', left: `${widthAdjusted}px`, fontSize: '13px'}}
        >
            {currentProgress.toFixed(0)}%
       </div>

    </div> 

    {
      renderLines()
      }      
</div>

  )
}

function Row({ time,previousWidthVar, widthVar }) {
  
  return (

    <div className='d-flex'
    >
        <div className='time d-flex justify-content-center'
        >
            {time}
        </div>

      <div className='progressBar'
      >

          <div style={{ marginLeft: `${previousWidthVar}%`, backgroundColor: 'orange', width: `${widthVar}%`, height: '10px' }}
          >

          </div>

      </div>

    </div>
  )
}

