import questAnswerTrainOverv from './questAnswerTrainOverv.js';
import addQuestionsToDeck from './addQuestionsToDeck.js';
import { dataBase } from './dataBase.js';
import { createElement, deleteCardQuestionBox, threeDots } from './exportFunctions.js'


export default function createDom(obj) {
  console.log('I do render')
  listOfDecks.innerHTML = '';
  let arr = Object.keys(obj);

  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

  arr.forEach((item, index) => {

    let newDeckContainer = createElement('div', '', {
      backgroundColor: colors[index % 5],
      transform: `rotate(${index * -2}deg)`
    }, 'newDeckContainer');

    dataBase.DeckNames[item].colorPlay = colors[index % 5];
    dataBase.DeckNames[item].deckPauseActive = false;
    



    let nameOfNewDeck = createElement("div", item, {
      position: 'absolute', left: '77px'
    })
    
    if (dataBase.DeckNames[item].deckPauseActive === true) {

      nameOfNewDeck.classList.add('pointer')
    }
    
    

    nameOfNewDeck.title = 'Click to open this deck'


    nameOfNewDeck.onmouseover = function () {
      nameOfNewDeck.style.color = "rgb(200, 168, 115)";
  
    };

    nameOfNewDeck.addEventListener("mouseleave", () => {
      nameOfNewDeck.style.color = "black";
    });

    if (!dataBase.DeckNames[item].data.length) {
      nameOfNewDeck.onclick = function () {
        plusIcon.classList.remove('blinkingIcon');
        alert('Click on the blinking add icon');
        plusIcon.classList.add('blinkingIcon');


      };
    } else {
      nameOfNewDeck.onclick = function () {

        if (dataBase.DeckNames[item].deckPauseActive !== true)
        {
        questAnswerTrainOverv(item);
        }
      };
    }

    let addEditDeleteContainer = createElement(
      'div', '', {}, 'flexColumnSpaceAround addEditDeleteContainer', '', newDeckContainer
    )

    let hi  = (dB) => dB[item].toStudyGoal - dB[item].cardsToday
    let toStud = 'To Study:'

    let input = createElement('input', '', {
      width: '49px', 
      border: 'none'
    })
      input.type = 'number';
      input.value = hi(obj);


    let [toStudy, toReview] = [`${toStud.padEnd(9, '⠀')}`, `To Review: ${dataBase.queue.filter((obj) => obj.item === item).length}`].map(el => {
      return createElement('div', el, {}, 'decksizeStudyRev')
    });


    toStudy.append(input)
    input.oninput = function() {
      dataBase.DeckNames[item].toStudyGoal = this.value;
    }

   



    let [toStudyContainer, toReviewContainer, decksizeContainer] = ['', '', ''].map(el => {
      return createElement('div', el, {}, 'studyReviewDecksize')
    });


    let Decksize = 'Decksize:';

    let decksize = createElement('div', `${Decksize.padEnd(10, '⠀')} ${dataBase.DeckNames[item].data.length}`, {}, 'decksizeStudyRev');

 

    for (let i = 0; i < 8; i++) {

      let whiteLines = createElement('div', '', {}, 'whiteLines');

      newDeckContainer.append(whiteLines)
    }


    // trashIconContainer.onclick = () => {


    //   deleteCardQuestionBox(()=>{delete dataBase.DeckNames[item]},()=>{createDom(dataBase.DeckNames)})



    //   // delete dataBase.DeckNames[item];
    //   // createDom(dataBase.DeckNames)
    //   // if (!Object.keys(dataBase.DeckNames).length) {
    //   //   let arrowDown = document.querySelector(".arrowDown");
    //   //   arrowDown.style.display = "block";
    //   //   document.getElementById('createYourFirstDeckPrompt').style.display = 'block';


    // };

    let changeNameofDeckInput = createElement('input', '', {
      width: '30%',
      position: 'absolute',
      left: '76px',
      // borderLeft: 'none',
      // borderRight: 'none',
      // borderTop: 'none',
      // borderBottom: '2px solid black'
    });


    changeNameofDeckInput.onclick = function (event) {
      event.stopPropagation()
    }

    function clickOutsideHandle(el) {
      //alert("Clicked out Box")
      el.classList.add('blinkingIcon')
      setTimeout(() => {
        el.classList.remove('blinkingIcon')
      }, 3000)
    }




    let edited = false;

    let mainThreeDots = threeDots()

    let threeDotsContainer = mainThreeDots(
      {
        edit: (event, editIconContainer, editIcon, saveIcon,
      outsideClickClosehandler, littleModalWindow) => {
      event.stopPropagation()



      if (!edited) {

        window.addEventListener('click', () => clickOutsideHandle(saveIcon))


        editIconContainer.replaceChild(saveIcon, editIcon)
        newDeckContainer.replaceChild(changeNameofDeckInput, nameOfNewDeck);
        changeNameofDeckInput.value = nameOfNewDeck.innerText;
        edited = true;
        window.onclick = ''
        littleModalWindow.style.display = 'block'
        console.log('click like a edit')
        
      } else {

        editIconContainer.replaceChild(editIcon, saveIcon)
        newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);
       

        edited = false;
        nameOfNewDeck.innerText = changeNameofDeckInput.value;
        setTimeout(function () {
          window.onclick = outsideClickClosehandler
        }, 10);

      }
    },pause: (container,playIcon,pauseIcon,edited) => {
      if (!edited) {
        container.replaceChild(playIcon, pauseIcon)
        window.onclick = ''
        edited = true;

        newDeckContainer.style.backgroundColor = 'grey'
        dataBase.DeckNames[item].deckPauseActive = true;

        nameOfNewDeck.classList.remove('pointer')
        input.disabled = true; 

      } else {
        container.replaceChild(pauseIcon, playIcon)
        edited = false;
        newDeckContainer.style.border = 'none';
        
        nameOfNewDeck.classList.add('pointer')
        input.disabled = false;


        newDeckContainer.style.backgroundColor =  dataBase.DeckNames[item].colorPlay;
        dataBase.DeckNames[item].deckPauseActive = false;
      }
      return edited
    },
      delete: () => {
        deleteCardQuestionBox(() => { delete dataBase.DeckNames[item] }, createDom, 'Delete deck', 'delete this deck')

      }},{ top: '3px',left:'13px'}, 'deck'
      )
  



    threeDotsContainer.style.position = 'absolute'
    threeDotsContainer.style.top = '6px'
    threeDotsContainer.style.right = '95px'


    let plusIcon = createElement('div', '+', {
      color: 'white', cursor: 'pointer', fontSize: '18px'
    });


    let addToDeckIcon = createElement('div', '', {
      cursor: 'pointer'
    }, 'orangeCircle');

    if (index === arr.length - 1) {
      addToDeckIcon.style.display = 'flex';
      newDeckContainer.style.zIndex = 2
      newDeckContainer.style.transform = 'rotate(0deg)'
    }
    addToDeckIcon.title = 'Add Questions to this deck';

    addToDeckIcon.onclick = function () {
      addQuestionsToDeck(item)
    }

    nameOfNewDeck.classList.add('pointer')


    newDeckContainer.append(nameOfNewDeck, threeDotsContainer, addToDeckIcon)

    addEditDeleteContainer.append(toStudyContainer, toStudy, toReviewContainer, decksizeContainer)

    toStudyContainer.append(toStudy);
    toReviewContainer.append(toReview);
    decksizeContainer.append(decksize);

    addToDeckIcon.append(plusIcon);

    listOfDecks.prepend(newDeckContainer);

  });




  // let arr = Array(7).fill('M').map((item,k)=>{

  //   let div = createElement('div', hexagon, {width: '16px', height: '16px'}, 'item');

  //   return div
  // });













  document.querySelector("#scrollable").onscroll = function (event) {
    let all = listOfDecks.querySelectorAll('.newDeckContainer')
    let step = (1000 - 140) / (all.length - 1)
    let index = Math.floor(event.target.scrollTop / step)
    // index = (index > arr.length-1) ? arr.length-1 : index


    Array.from(all).reverse().forEach((item, index) => {
      item.style.zIndex = 0

      item.querySelector('.orangeCircle').style.display = 'none'
      item.style.transform = `rotate(${(index * -2) || -2}deg)`;
    })
    all[index].style.zIndex = 2;
    all[index].style.transform = 'rotate(0deg)';
    all[index].querySelector('.orangeCircle').style.display = 'flex'

  }
}