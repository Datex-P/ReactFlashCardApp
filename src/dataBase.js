export let dataBase = {
  DeckNames: { /*deckname:[]*/   },
    queue: [],
    userStylePreferences: [],
    showDeleteFrame: true,
    toStudyGoal: 20,
    toReviewGoal: 0,
    timeValues: { left: 2, middle: 5, right: 10 },
    nameValues: {leftName: 'again', middleName: 'good', rightName: 'easy'},
    studyTime : 0,
    calendarReset: false,
    weeklyTarget: 1,
    daysOfStudy : {day : 4},
    studied: [new Date()]
  
  };
  
  
  
  
  
  for (let i = 1; i < 7; i++) {
    let arr = [];
    for (let i = 1; i < 10; i++) {
      arr.push({
        question: `question${i}`,
        answer: `answer${i}`
      })
    };
    dataBase.DeckNames[`Literature${i}`] = {data: arr, toStudyGoal:20, cardsToday:0}
    //dataBase.DeckNames[`Literature${i}`].cardsToday = 0;
    //dataBase.DeckNames[`Literature${i}`].toStudyGoal = 20;
  };
  