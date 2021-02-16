import React, { useEffect, useState } from 'react'

export const Context = React.createContext(null)//step 1 createing context instance

export default function ContextProvider({ children }) {

  const [dataBase, setDataBase] = useState(null);
  const [styles, setStyles] = useState({
    backgroundColor: {
      light: 'red',
      dark: 'blue',
      default: 'rgb(90, 170, 149)'
    }
  });


  useEffect(() => {
    let dB = {

      DeckNames: [],
      active:-1,
      queue: [],
      checkboxClicked: false,
      showDeleteFrame: true,
      toStudyGoal: 20,
      toReviewGoal: 0,
      timeValues: {
        left: 2,
        middle: 5,
        right: 10
      },
      breakdownIntervals: [
        {month: 1},
        {month: 3},
        {month: 12}
      ],
      userTimePreferences: [
        {
          name: 'again',
          amount: 3,
          unit: 'm'
        },
        {
          name: 'good',
          amount: 5,
          unit: 'h'
        },
        {
          name: 'easy',
          amount: 10,
          unit: 'd'
        }
      ],
      userPreferences: {
        days: 0,
        backgroundColor: 'default',
        weeksInRow: 0,
        toReview: 0
      },
      studyTime: 0,
      calendarReset: false,
      weeklyTarget: 1,
      daysOfStudy: {
        day: 4
      },
      studied: [new Date()]

    };

    for (let i = 100; i < 105; i++) {
      let arr = [];

      for (let i = 1; i < 10; i++) {
        arr.push({
          question: `question${i}`,
          answer: `answer${i}`,
          paused: false
        })
      };

      let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

      dB.DeckNames.push(
        {
          name:`Literature${i}`,
          backgroundColor: colors[-100+i],
          data: arr,
          toStudyGoal: 20,
          cardsToday: 0,
          paused:false,

        }

      );
      dB.active++
    }
    console.log(dB.active)
    setDataBase(dB)
  }, []);
  
  return (

    <Context.Provider value={{ dataBase, setDataBase, styles, setStyles }} >{/*step 2 declearing some value and creating provider*/}

      {children}

    </Context.Provider>

  )
}


// let age = 23
// let name = 'Fabian'
// let city = 'Honolulu'

// let user = {
//   age: age,
//   name: name,
//   city:city
// }

// let user = {age, name, city}