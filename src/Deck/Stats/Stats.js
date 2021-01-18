import React, { useState, useContext } from 'react';
import StyledModal from '../deck/StyledModal'
import ThreeDotsBtn from '../deck/ThreeDotsBtn'
import { withRouter } from 'react-router-dom'
import ChartComp from './ChartComp';
import { Context } from '../../Context'
import TimeAndProgess from './TimeAndProgress.js'




function Stats({ history,
  // setShowDeleteFrame
}) {

  const [showDeleteFrame, setShowDeleteFrame] = useState(false)



  function setShow() {
    history.push('/')
  }

  return (
    <div style={{
    
    width: '70%', height: '50%'}}>
      <StyledModal 
        show={true}
        setShow={setShow}
        title={'Stats'}
        menu={
          <ThreeDotsBtn
            text={'stats'}
            trashEvent={() => {
              setShowDeleteFrame(showDeleteFrame)


            }}

            style={{
              position: 'absolute',
              top: '-14px', left: '27px',
              // right: '-65px',
              zIndex: '2000', backgroundColor: 'white',
              border: '1px solid black', overflow: 'hidden'
            }}
            reset
          />
        }
      >

        <div>

          <div style={{ width: '216px', textAlign: 'center', margin: 'auto', fontWeight: 'bold', fontSize: '17px' }}>Today's study breakdown</div>

          <div style={{ marginBottom: '10px', border: '1px solid black' }} className='d-flex flex-direction column align-items-center'>


            <ChartComp />



          </div>
          <div className='theWordCalendar' style={{ marginTop: '20px', marginBottom: '3px', textAlign: 'center' }}>Calendar</div>

          <div className='d-flex align-items-center justify-content-center'>

            <ButtonLeftAndRight />

          </div>

          <HourlyBreakdown />

        </div>

        <div style={{
          width: '200px'
          // , 
          // height: '500px',
          //   display: 'flex', justifyContent: 'center' 
          // display: 'flex', justifyContent: 'center'
        }}>


        </div>

        <TimeAndProgess 
        // time={time}

        />

      </StyledModal>


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
    <>
      {
        ['<', year, '>'].map(el =>

          <div style={{ cursor: el === year ? 'default' : 'pointer', margin: el === year ? '5px' : '', width: '40px' }}

            className={el !== year ? 'd-flex justify-content-center align-items-center calendarButtons' : ' align-items-center flex justify-content-center'}

            onClick={el === '<' && el !== year ?
              handleDecrement : handleIncrement
            }
          >
            {el}
          </div>
        )
      }
    </>
  )
}













function HourlyBreakdown() {

  const { dataBase, setDataBase } = useContext(Context)


  function handleMonths(e) {
    let newDataBase = { ...dataBase }
    newDataBase[e.target] = e.target.value
    setDataBase(newDataBase)
  }


  return (
    <div className='d-flex align-items-center flex-column'>
      <div style={{ marginTop: '20px', fontSize: 'bold', fontWeight: 'bold' }}>Hourly Breakdown</div>

      <div style={{ width: '270px', borderRadius: '5px',  border: '1px solid black', padding: '1px 5px', marginTop: '10px', marginBottom: '20px' }}>
        {
          ['1 month', '3 month', '12 month'].map(comp =>
            <>
              <input style={{ cursor: 'pointer', marginTop: '10px', marginBottom: '20px' }}
                name='breakdownIntervals'
                type='radio'
                // title = `Change background color of main menu to ${comp}.`
                value={comp}
                onChange={handleMonths}
              />
              <label style={{ margin: '5px' }}>{comp}</label>
            </>
          )
        }
      </div>
    </div>
  )
}

// function YearBoxContainer () {

//   let cardsStudiedCounter = 0;
//   let thisYear = new Date(`January 1, ${+year}`);


//   function days(year) {
//     yearBoxContainer.innerHTML = "";

//     while (
//       thisYear.getMonth() != 0 ||
//       thisYear.getDate() != 1 ||
//       thisYear.getFullYear() == +year
//     ) {
//       // let day = document.createElement("div");
//       <div className='d'> </div>
//       day.classList.add("day");
//       let date = thisYear.toDateString();
//     }
//   }

// }






//   return(

//       <div className='yearBoxContainer'>

//       {days()}


//       </div>






//   )

 




  // function renderDays(year) {
  //   yearBoxContainer.innerHTML = "";
  //   let thisYear = new Date(`January 1, ${+year}`);

  //   while (
  //     thisYear.getMonth() != 0 ||
  //     thisYear.getDate() != 1 ||
  //     thisYear.getFullYear() == +year
  //   ) {
  //     let day = document.createElement("div");
  //     day.classList.add("day");
  //     let date = thisYear.toDateString();

  //     for (let deck in dataBase.DeckNames) {


  //       //if  (dataBase.DeckNames.calendarReset !== false) {

  //       //let date = dataBase.DeckNames.calendarReset.value()
  //       //don t use dates before this date
  //       //}



  //       dataBase.DeckNames[deck].data.forEach((card) => {
  //         card.openHistory &&
  //           card.openHistory.forEach((openTime) => {
  //             if (date === openTime.toDateString()) {
  //               cardsStudiedCounter++;
  //             }
  //           });
  //       });
  //     }

  //     for (let deck in dataBase.DeckNames) {
  //       if (
  //         dataBase.DeckNames[deck].data.find(
  //           (item) => new Date(item.openHistory).toDateString() == date
  //         )
  //       ) {
  //         day.style.backgroundColor = "red";
  //         day.style.cursor = "pointer";
  //         day.title = 'Click to see the study stats of this date'

  //         day.onclick = function (event) {
  //           event.stopPropagation();
  //           yearBoxContainer
  //             .querySelectorAll(".day")
  //             .forEach((day) => (day.innerHTML = ""));
  //           let dayInner = createElement('div', '', {lineHeight: '22px', width: '120px'})
  //           // let time = Math.round(
  //           //   Object.values(dataBase.studyTime).reduce(
  //           //     (acc, cur) => acc + cur, 0
  //           //   ) / 60
  //           // );


  //           let time = Math.floor(dataBase.studyTime/60)
  //           console.log(cardsStudiedCounter)
            
       
  //           dayInner.innerText = `${date} Time: ${time
  //             .toString()
  //             .padStart(3, "⠀")} min \n  Review${cardsStudiedCounter !== 1 ? 's' : ''}: ${cardsStudiedCounter} card${cardsStudiedCounter !== 1 ? 's' : ''}`; 
  //           console.log(cardsStudiedCounter);
  //           day.append(dayInner);
  //         };
  //       }
  //     }

   

  //     thisYear.setDate(thisYear.getDate() + 1);

  //     yearBoxContainer.appendChild(day);
  //     yearBoxContainer.onclick = function () {
  //       alert("you do not have training in this day");
  //     };
  //   }
  // }





























  // function handleMonths(e){
  //   let newDataBase = {...dataBase}
  //   newDataBase.userPreferences[e.target.name] = e.target.value
  //   setDataBase(newDataBase)
  // }
