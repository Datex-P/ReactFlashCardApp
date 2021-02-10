

export default function TimeAndProgress() {
  let studyGoal = 80
  let timeObj = {
    5: 15,
    9: 20,
    17: 14
  }
  let currentProgress = Object.values(timeObj).reduce((sum, i) => sum += i, 0) / studyGoal * 100;
  let widthAdjusted = Math.round(currentProgress) + 120;

  function renderLines() {

    let arr = []
    let previousWidthVar = 0
    for (let i = 5; i <= 25; i += 4) {

      if (i in timeObj) {
        let widthVar = (timeObj[i] || 0) / studyGoal * 100
        previousWidthVar += widthVar

        if (i === 21) {
          
          arr.push(
          <Row 
              previousWidthVar={previousWidthVar} 
              widthVar={widthVar} 
              time={
              
              <div style={{paddingLeft: '3px', height: '21px'}}
              >
                  {'21 - 24'}
              </div>
              }
          />
          )

        } else if (i === 25) {

          arr.push(
            <Row 
                previousWidthVar={previousWidthVar} 
                widthVar={widthVar} 
                time={
                      <div style={{paddingLeft: '3px', height: '21px'}}
                      >
                          {'24 - 5'}
                      </div>
                    } 
            />
            )
        } else if (i <= 9) {

          if (i <= 9 && i + 4 > 9) {
            
            arr.push(
            <Row 
                previousWidthVar={previousWidthVar} 
                widthVar={widthVar} 
                time={
                    <div style={{paddingLeft: '3px', height: '21px'}}
                    >
                        {'0' + i} - {(i + 4)}
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
                      {'0' + i} - {'0' + (i + 4)}
                  </div>
                  } 
            />)
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


    <div className='diagramHourlyBreakdownContainer d-flex flex-column justify-content-around
    '>
       <div
        className='d-flex'
      > 
        <div style={{ marginLeft: '10px', border: '1px solid black', width: '81px', paddingLeft: '3px', height: '24px'}}
        >

            Study Goal
        </div>

        <div 
            className='progressBar' 
            style={{ marginLeft: '21px' }}
        >
            <div
                style={{
                      backgroundColor: 'orange',
                      color: 'black',
                      width: `${Object.values(timeObj).reduce((sum, i) => sum += i, 0) / studyGoal * 100}%`,
                      height: '10px'
                }}
            >
          </div>

        </div>

        <div style={{position: 'absolute', top: '1px', left: `${widthAdjusted}px`, fontSize: '13px'}}
        >

            {currentProgress.toFixed(0)}%
       </div>

    </div> 

  {renderLines()}      
</div>

  )
}

function Row({ time,previousWidthVar, widthVar }) {
  
  return (

    <div className='d-flex'
    >

        <div className='time'
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

