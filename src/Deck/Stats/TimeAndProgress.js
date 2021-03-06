import React, { useContext,useEffect,useState } from "react";
import '../styles.css';

import { Context } from "../../Context";

export default function TimeAndProgress() {
  let studyGoal = 80;

  const { dataBase } = useContext(Context);
  const [currentProgress, setCurrentProgress] = useState(0)
  const [widthAdjusted, setWidthAdjusted] = useState(0)
  const [timeObj, setTimeObj] = useState({})
  useEffect(()=>{
      let currentProgress = parseInt(
        (dataBase.deckCompleted * 100) / Object.keys(dataBase.DeckNames).length || 0
      );
      setCurrentProgress(currentProgress)

    console.log(dataBase, "database in tim progress");
    let firstVal = []
    for (let deckItem of dataBase.DeckNames) {
      //newDataBase.DeckNames[index].data[newRandomQuestion].openHistory

      // if (deckItem.data.find((item) => new Date(item?.openHistory?.[0]).toDateString() == new Date().toDateString())) {
      //   todayCardsStudiedCounter++
      console.log(deckItem)

      //var fourthVal = deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 6 ).length)
      firstVal.push(deckItem.data.filter(
        (item) =>
          item.openHistory &&
          item.openHistory.filter(
            (item) =>
              new Date(item).getHours() < 12 && new Date(item).getHours() > 6
          ).length
      ));
      var secVal = deckItem.data.filter(
        (item) =>
          item.openHistory &&
          item.openHistory.filter(
            (item) =>
              new Date(item).getHours() < 18 && new Date(item).getHours() > 12
          ).length
      );
      var thirdVal = deckItem.data.filter(
        (item) =>
          item.openHistory &&
          item.openHistory.filter(
            (item) =>
              new Date(item).getHours() < 24 && new Date(item).getHours() > 18
          ).length
      );
      var fourthVal = deckItem.data.filter(
        (item) =>
          item.openHistory &&
          item.openHistory.filter((item) => new Date(item).getHours() < 6).length
      );

      // dataBase.DeckNames[deck].data.filter((item) =>
      //   item?.openHistory?.some(
      //     (item) => new Date(item).toDateString()
    }

    // console.log(firstVal, "firstVal");
    // console.log(secVal, "secVal");
    // console.log(thirdVal, "thirdval");
    // console.log(fourthVal, "fourthval");

    setTimeObj({
      6: firstVal,
      12: secVal,
      18: thirdVal,
      24: fourthVal,
    });

    //Object.values(timeObj).reduce((sum, i) => sum += i, 0) / studyGoal * 100;
    let widthAdjusted = Math.round(currentProgress) + 120;
    setWidthAdjusted(widthAdjusted)
  },[dataBase])
 

  function renderLines() {
    let arr = [];
    let previousWidthVar = 0;
    for (let i = 6; i <= 24; i += 6) {
      if (i in timeObj) {
        let widthVar = ((timeObj[i] || 0) / studyGoal) * 100;
        previousWidthVar += widthVar;

        if (i === 18) {
          arr.push(
            <Row
              key="1"
              previousWidthVar={previousWidthVar}
              widthVar={widthVar}
              time={
                <div className='timesStyling' 
                >
                  {"18 - 24"}
                </div>
              }
            />
          );
        } else if (i === 24) {
          arr.push(
            <Row
              key="2"
              previousWidthVar={previousWidthVar}
              widthVar={widthVar}
              time={
                <div className='timesStyling' 
                >
                  {"24 - 06"}
                </div>
              }
            />
          );
        } else if (i <= 12) {
          if (i < 12) {
            arr.push(
              <Row
                key="3"
                previousWidthVar={previousWidthVar}
                widthVar={widthVar}
                time={
                  <div className='timeAndProgStyling'
                  // style={{ paddingLeft: "3px", height: "21px" }}
                  >
                    {"0" + i} - {i + 6}
                  </div>
                }
              />
            );
          } else {
            arr.push(
              <Row
                key="4"
                previousWidthVar={previousWidthVar}
                widthVar={widthVar}
                time={
                  <div
                      className='timesStyling' 
                      >
                    {"12"} - {"18"}
                  </div>
                }
              />
            );
          }
        } else {
          // arr.push(
          //   <Row
          //     previousWidthVar={previousWidthVar}
          //     widthVar={widthVar}
          //     time={
          //       <div  className='timesStyling' 
          //             style={{backgroundColor:'blue'}}
          //       // style={{ paddingLeft: "3px", height:'21px', fontSize:'14px' }}
          //       >
          //         {i} - {i + 4}
          //       </div>
          //     }
          //   />
          // );
        }
      }
    }
    return arr;
  }

  return (
    <div className="diagramHourlyBreakdownContainer d-flex flex-column justify-content-around">
      <div className="d-flex">
        <div className="studyGoalStyling d-flex justify-content-center align-items-center" style={{ height: '27px', fontSize:'13px' }}>
          Monthly Goal
        </div>

        <div className="progressBar" style={{ marginLeft: "21px" }}>
          <div
            style={{
              backgroundColor: "orange",
              color: "black",
              height: "10px",
              width: `${currentProgress}%`,
              // width: `${Object.values(timeObj).reduce((sum, i) => sum += i, 0) / studyGoal * 100}%`
            }}
          ></div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "2px",
            left: `${widthAdjusted}px`,
            fontSize: "13px",
          }}
        >
          {currentProgress.toFixed(0)}%
        </div>
      </div>

      {renderLines()}
    </div>
  );
}

function Row({ time, previousWidthVar, widthVar }) {
  return (
    <div className="d-flex">
      <div className="time d-flex justify-content-center">{time}</div>

      <div className="progressBar">
        <div
          style={{
            marginLeft: `${previousWidthVar}%`,
            backgroundColor: "orange",
            width: `${widthVar}%`,
            height: "10px",
          }}
        ></div>
      </div>
    </div>
  );
}
