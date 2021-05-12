import React, { useContext, useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Context } from "../../Context"; //step 4.1 import context instance

import redCross from "../../icons/redCross.svg";

export default function CreateNewDeck({
  addNewDeckWindow,
  setDecksAreVisible,
  close,
  setActive,
  setArrowDown,
}) {
  const {
    dataBase,
    setDataBase,
    setShowProgressDiagram,
    setScrollbarVisible,
    colors
  } = useContext(Context);
  const [inputField, setInputField] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (addNewDeckWindow) {
      inputRef.current.focus();
      setShowProgressDiagram(false);
    } else {
    //  setShowProgressDiagram(true);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewDeckWindow]);



  function addNewDeckName() {
    // if(dataBase.DeckNames.length ===0) {
    //   setScrollbarVisible(false)
    // }

    let newDataBase = { ...dataBase };

    if (newDataBase.DeckNames.find((deck) => deck.name === inputField)) {
      alert("Name of Deck already exists");
      setInputField("");
    } else if (!inputField) {
      alert("Input needed");
    } else if (document.getElementById("inputField").value.length > 25) {
      alert("Deckname is too lo");
      setInputField("");
      document.getElementById("inputField").focus();
    } else if (document.getElementById("inputField").value.length < 3) {
      alert("Deckname is too short");
      setInputField("");
      document.getElementById("inputField").focus();
    } else {
      console.log("it works");
      let index = newDataBase.DeckNames.push({
        name: inputField,
        data: [],
        cardsToday: 0,
        color: colors[Object.keys(dataBase.DeckNames).length % colors.length],
        paused: false,
        thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
        skipPausedCards: 0,
        pauseMode: false, //when active the pause switch can be clicked in question answers when cards are paused
        editModeActive: false, //when editModeActive is true, pause switch can t be clicked
        // color: colors[(dataBase.DeckNames.length) % colors.length]
      });

      // console.log(dataBase.DeckNames.length, "here databse length");
      if (dataBase.DeckNames.length === 1 || dataBase.DeckNames.length === 0) {
        // setTimeout(()=>setScrollbarVisible(false),10);
        setScrollbarVisible(false)
      } else {
        setScrollbarVisible(true)
      }
      setActive(index - 1);
      setInputField("");
      setDataBase(newDataBase);
      close();
    }
  }

  return (
    <Modal
      show={addNewDeckWindow}
      backdrop="static"
      keyboard={false}
      id="createDeck"
      centered
    >
      <Modal.Header>
        <Modal.Title>Name for new deck</Modal.Title>

        <button
          className="redCross"
          onClick={() => {
            if (dataBase.DeckNames.length === 0) {
              //when no deck in list, show arrow Down again
              setArrowDown(true);
              setDecksAreVisible(false);
              setScrollbarVisible(false);
            } else {

              addNewDeckWindow(false);
              setDecksAreVisible(true);
            }
            close();
          }}
        >
          <img
            className="nonDraggableIcon"
            src={redCross}
            alt="redCross"
            style={{
              position: "relative",
              top: "0px",
              right: "-9px",
              width: "15px",
            }}
          />
        </button>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column align-items-center">
        <input
          id="inputField"
          className="createNewDeckInputField"
          minLength="3"
          maxLength="25"
          ref={inputRef}
          value={inputField}
          onChange={(event) => setInputField(event.target.value)}
        />

        <select className="selectStyling">
          <option>option 1</option>
          <option>option 2</option>
          <option>option 3</option>
          <option>option 4</option>
          <option>option 5</option>
        </select>
      </Modal.Body>

      <div className="d-flex justify-content-between cancelOkContainer">
        {["Cancel", "Ok"].map((el) => (
          <button
            className="generalButtonStyling okCancelButtonStyling"
            key={el}
            onClick={() => {
              el === "Cancel"
                ? (() => {
                    close();
                    setInputField("");

                    if (dataBase.DeckNames.length === 0) {
                      //when no deck in list, show arrow Down again
                      setArrowDown(true);
                      setDecksAreVisible(false);
                      console.log("yippi yeah yeah yeah");
                    }
                  })()
                : addNewDeckName();
            }}
          >
            {el}
          </button>
        ))}
      </div>
    </Modal>
  );
}
