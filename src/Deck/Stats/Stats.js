import React, { useState, useEffect, useContext} from 'react';
import { Context } from '../../Context'
import BasicOrangeWindow from '../deck/BasicOrangeWindow'
import ThreeDotsBtn from '../deck/ThreeDotsBtn'
import { withRouter } from 'react-router-dom'
import PieDiagramm from './PieDiagramm';
import TimeAndProgress from './TimeAndProgress.js'
import HourlyBreakdown from './HourlyBreakdown.js'
import DeleteCardQuestionBox from '../deck/DeleteCardQuestionBox'



function Stats({ history}) {

  const [showDeleteFrame, setShowDeleteFrame] = useState(false)
  const [checked, setChecked] = useState(false)
  const [show,setShow] = useState(false);
 const {setShowProgressDiagram } = useContext(Context)
  
 
  function setShowFunc() {
    history.push('/')
    setShowProgressDiagram(true)
  }

  useEffect(()=>{
    setShowProgressDiagram(false)
  },[])




  return (

    <div style={{width: '70%', height: '50%'}}
    >

      <BasicOrangeWindow
    
        show={true}
        setShow={setShowFunc}
        title={
          
          <div style={{fontSize: '22px', fontWeight: 'bold'}}
          >
              Stats
          </div>}
        menu={
          <ThreeDotsBtn
       
           
            text={'stats'}
            className='resetButtonStyling'
            editButtonClicked
            resetEvent={() => {
              //!editButtonClicked
              setShow(!show)
              console.log('erjngjkerngkjrne')
              setShowDeleteFrame(true);
              
            //  reset=false
            }}

            reset
          />
        }
      >

        <div>

          <div className='studyBreakdownHeader'
          >
              Today's study breakdown
          </div>

          <div 
              style={{ marginBottom: '10px', border: '1px solid black'}} 
              className='d-flex flex-direction column align-items-center'
          >

            {
              showDeleteFrame &&
              
                <DeleteCardQuestionBox
                  resetQuestionText
                  showMessageAgain
                  card='card'
                  checked = {checked}
                  setChecked = {setChecked}
                  showDeleteWindow={showDeleteFrame}
                  deleteWindow={() => 
                    setShowDeleteFrame(false)
                  }
                  // trashEvent={deleteCurrentCard}
                  onHide={ ()=>{ }}
                  />
            }

            <PieDiagramm />

          </div>

          <div 
              className='theWordCalendar' 
          >
              Calendar

          </div>

          <div className='d-flex align-items-center justify-content-center'
          >

            <ButtonLeftAndRight />
          </div>

          <HourlyBreakdown
            key='1'
           />

        </div>

        <div style={{width: '200px'}}
        >

        </div>

        <TimeAndProgress/>

      </BasicOrangeWindow>


    </div>
  )
}

export default withRouter(Stats)




function ButtonLeftAndRight() {
  const [year, setYear] = useState(new Date().getFullYear())


  const handleIncrement = () => {
    setYear(year + 1);
  };

  const handleDecrement = () => {
    setYear(year - 1);
  };

  return (

    <div style={{display: 'flex', flexDirection: 'column'}}
    >

      <div 
          className='d-flex justify-content-center align-items-center' 
          style={{marginTop: '-10px'}}
      >

          {
        
            ['<', year, '>'].map(el =>

              <div style={{ 
                            width: '33px',
                            cursor: el === year ? 'default' : 'pointer', 
                            margin: el === year ? '5px' : ''
                            }}

                className={
                          el !== year ? 
                          'd-flex justify-content-center align-items-center calendarButtons' 
                              : 
                          ' align-items-center flex justify-content-center'}

                onClick={el === '<' && el !== year ?
                          handleDecrement 
                          : 
                          handleIncrement
                }
              >

                {el}
              </div>
              )
          }

      </div>

        <RenderDays />
    </div>
  )
}

function RenderDays () {

 const [year] = useState(new Date().getFullYear())
 const [days, setDays] = useState([])

  useEffect(()=> {

    let date = [];
    let thisYear = new Date(`January 1, ${+year}`);
    
    while (
        thisYear.getMonth() !== 0 ||
        thisYear.getDate() !== 1 ||
        thisYear.getFullYear() === +year
        ) 
        {
        date.push(thisYear.toDateString())
        thisYear.setDate(thisYear.getDate() + 1);
        }
        setDays(date)
  
}, [year])


return (

    <div className= 'yearBoxContainer'
    >

        {
          days.map(day=>
          <div className='day'
          >
          </div>)
        }

  </div>
  )

}




























