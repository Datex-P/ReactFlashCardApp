import React, { useState, useContext, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Context } from "../../Context";
import "../styles.css";

import ThreeDotsBtn from "./ThreeDotsBtn";
import AddQuestionsToDeck from "./AddQuestionsToDeck";
import QuestAnswerTrainOverv from "./QuestAnswerTrainOverv";
import DeckOrCardName from "./DeckOrCardName";
import DeleteCardQuestionBox from "./DeleteCardQuestionBox";

import playimg from "../../icons/play.svg";

import plusimg from "../../icons/plus.svg";

export default function Deck({
  deck,
  checked,
  setChecked,
  decksAreVisible, //needed to hide all the decks in deckhandler
  setDecksAreVisible,
  active,
  setActive,
  title,
  bg,
  pauseIsActive,
  setPauseIsActive,
  trigger,
  changeDeckName,
  setChangeDeckNameOpen,
  editButtonClicked,
  setEditButtonClicked,
  showProgressDiagram,
  setShowProgressDiagram,
  arrowDown,
  setArrowDown = () => {},
  ...style
}) {
  if (deck) {
    var { data, paused, name } = deck;
  }

  const [show, setShow] = useState(false);
  const [nameOfTopDeck, setNameOfTopDeck] = useState(name);
  const [threeDotsMenuOpen, setThreeDotsMenuOpen] = useState(false);

  const [showDeleteWindow, setShowDeleteWindow] = useState(true); //if true and triggered the delete window with yes and no button is shown
  const [trash, setTrash] = useState(false);
  const { dataBase, setDataBase } = useContext(Context);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cIndex = dataBase.DeckNames.findIndex((item) => item.name === name);
    setIndex(cIndex);
    //console.log(cIndex)
    // eslint-disable-next-line
  }, [trigger]);

  useEffect(() => {
    setChangeDeckNameOpen(!editButtonClicked); //when input field of deck name is open it is set to false
     // eslint-disable-next-line
  }, [editButtonClicked]);

  let colors = ["#ffcdb2", "#ffb4a2", "#e5989b", "#b5838d", "#6d6875"];

  let input = useRef(null);

  function handlePause() {
    console.log(index);
    let newDataBase = { ...dataBase };

    newDataBase.DeckNames[index].paused = !paused;
    console.log(newDataBase.DeckNames);
    setDataBase(newDataBase);
    // setShow(false) why does  three button window not close with this?
  }

  function handleToStudy(e) {
    // if(e.target.length ===2) {
    //   console.log('yeah that works')
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].toStudyValue = e.target.value;
    setDataBase(newDataBase);

    console.log(dataBase, "database");
    // dataBase.DeckNames[item].toStudyValue = inputToStudy.value
  }

  useEffect(() => {
    setNameOfTopDeck(name);
    console.log(name);
  }, [name]);

  function deleteDeck() {
    let newDataBase = { ...dataBase };
    //newDataBase.DeckNames[index].deleted = true; //index where delete starts second para is delete count

    
     newDataBase.DeckNames.splice(index,1)
    
    if (newDataBase.DeckNames.filter(item=>!item.deleted).length === 0) {
      setDecksAreVisible(false);
      setArrowDown(true);
    } else {
      console.log(index, "that is the index");
      setDataBase(newDataBase);
      console.log(newDataBase);
      if (index === 0) {
        setActive(1);
      } else {
        setActive(index-1);
      }
    }
  }

  function handleActive(i) {
    setActive(i);
    let newDataBase = { ...dataBase };
    newDataBase.active = i;
    setDataBase(newDataBase);
  }

  return (
    deck && (
      <Card
        style={style}
        className="newDeckContainer flexColumn position-absolute "
      >
        <Card.Body className="justify-content-center align-items-center flex-column d-flex">
          <Card.Title
            className="d-flex align-items-center justify-content-between position-relative"
            style={{ width: "151px", left: "3px", height: "0px" }}
          >
            {editButtonClicked ? (
              <DeckOrCardName
                bg={bg}
                index={index}
                paused={paused}
                data={data}
                name={name}
                active={active}
                setActive={setActive}
                className="deckOrCardNameStyling"
              />
            ) : (
              <input
                ref={input}
                // changeDeckNameOpen={true}
                className="addToDeckInput"
                //style={{top: data && data.length === 0? '-69px': 'default'}}
                //defaultValue=''
                value={nameOfTopDeck}
                onChange={(e) => {
                  if (e.target.value.length > 25) {
                    alert("Deckname can not be longer than 25 characters");
                  } else {
                    // if (!dataBase.DeckNames[index].paused) {

                    setNameOfTopDeck(e.target.value);
                  }
                }}
              />
            )}
            {console.log(dataBase.DeckNames[index].data.length, "value length")}
            {console.log(dataBase.DeckNames[index], "inid")}

            <ThreeDotsBtn
              name={name}
              text={"deck"}
              data={data}
              showFromParent={threeDotsMenuOpen}
              editButtonClicked={editButtonClicked}
              setEditButtonClicked={setEditButtonClicked}
              setShowFromParent={setThreeDotsMenuOpen}
              index={index}
              paused={paused}
              bg={style.background}
              nameOfTopDeck={nameOfTopDeck}
              setNameOfTopDeck={setNameOfTopDeck}
              edit={!paused}
              pause
              trash={!paused}
              input={input}
              threeDotsContainer={{
                position: "fixed",
                right: "50px",
                top: "18px",
              }}
              className="threeDotsBtnIndex"
              style={{
                border: paused ? "none" : "1px solid black",
                backgroundColor: paused ? "black" : "white",
              }}
              editEvent={() => {
                setThreeDotsMenuOpen(false);
                setEditButtonClicked(!editButtonClicked);
              }}
              trashEvent={
                dataBase.checkboxClicked
                  ? () => {
                      deleteDeck();
                      handleActive(index - 1);
                    }
                  : () => {
                      setTrash(true);
                      setShowDeleteWindow(true);
                    }
              }
            />

            {trash && showDeleteWindow && !paused && (
              <DeleteCardQuestionBox
                pauseOrDelete="Delete"
                card="deck"
                threeDotsMenuOpen={threeDotsMenuOpen}
                index={index}
                setIndex={setIndex}
                deleteWindow={() => setShowDeleteWindow(false)}
                trashEvent={() => {
                  deleteDeck();
                  handleActive(index - 1);
                }}
                showDeleteWindow={showDeleteWindow}
              />
            )}
          </Card.Title>

          <div
            className="d-flex flex-column justify-content-between"
            style={{ height: "82px" }}
          >
            {data.length === 0 ? (
              <div
                className="deckEmptyContainer"
                style={{ left: "84px", textAlign: "center" }}
              >
                <div
                  className="d-flex flex-column justify-content-around"
                  style={{ height: "90px", width: "122px" }}
                >
                  <div>Deck is empty.</div>
                  <div>
                    Press:
                    <span
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => setShow(true)}
                    >
                      <img src={plusimg} alt="plus" />
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    position: "absolute",
                    top: " 110px",
                  }}
                >
                  to add cards to the deck.
                </div>
              </div>
            ) : (
              <>
                <div
                  className="divStyling"
                  style={{ opacity: paused ? "0" : "1" }}
                >
                  To Study:
                  <input
                    type="number"
                    className="inputStyling"
                    style={{ background: paused ? style.background : "none" }}
                    value={dataBase.DeckNames[index].toStudyValue || 0}
                    max={
                      dataBase.DeckNames[index].data.length -
                        dataBase.DeckNames[index].data.filter(
                          (x) => x.paused === true
                        ).length || 0
                    }
                    min="1"
                    onChange={handleToStudy}
                  />
                </div>
              </>
            )}

            {paused ? (
              <div
                className="deckPausedContainer"
                style={{ background: colors[index % 5] }}
              >
                <div>This deck is paused.</div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  Press:
                  <button
                    className="playButton"
                    onClick={() => {
                      handlePause();
                    }}
                  >
                    <img
                      src={playimg}
                      alt="play"
                      style={{ margin: "6px", cursor: "pointer" }}
                    />
                  </button>
                </div>
                <div className="countToStudyGoal">
                  It doesn't count to the study goal.
                </div>
              </div>
            ) : null}

            {name && data.length !== 0 ? (
              <div
                className="divStyling"
                style={{ opacity: paused ? "0" : "1" }}
              >
                {"Decksize:".padEnd(10, "⠀")} {data.length}
              </div>
            ) : null}
          </div>

          <QuestAnswerTrainOverv
            editButtonClicked={editButtonClicked}
            name={name}
            index={index}
            data={data}
            paused={paused}
            pauseIsActive={pauseIsActive}
            setPauseIsActive={setPauseIsActive}
          />

          {Number(active) === 1 && (
            // active || active ??

            <AddQuestionsToDeck
              editButtonClicked={editButtonClicked}
              background={style.background}
              name={name}
              index={index}
              show={show}
              setShow={setShow}
            />
          )}
        </Card.Body>
      </Card>
    )
  );
}
