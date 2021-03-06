import { Modal } from "react-bootstrap";
import redCross from "../../icons/redCross.svg";
import React, { useContext } from "react";
import InputCheckbox from "./InputCheckbox";
import { Context } from "../../Context";

export default function BasicOrangeWindow({
  children,
  show,
  setShow,
  title,
  menu,
  mainBox,
  setShowAnswerBtn = () => {},
  setEdit = () => {},
  setShowRepeatBtn = () => {},
  setEditBtnClicked = () => {},
  generateRandom,
  index,
}) {
  const {dataBase, setDataBase} = useContext(Context);

  return (
    <Modal
      key={index}
      show={show}
      onHide={() => setShow(false)}
      contentClassName={"mod"}
      backdrop="static"
      style={{
        left: "-160px !important",
        right: "45px !important",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        style={{
          width: "98%",
          height: "95%",
          margin: "auto",
          overflow: "hidden auto",
        }}
      >
        <Modal.Header className="border-bottom-0">
          <Modal.Title
            style={{
              fontSize: "16px",
              marginLeft: "12px",
              height: "24px",
              width: "240px",
            }}
          >
            {title}
          </Modal.Title>

          <div
            className="onoffswitch"
            onMouseEnter={() => {
              if (
                dataBase.DeckNames[index].data.filter((x) => x.paused === true)
                  .length > 0 && !dataBase.DeckNames[index].editModeActive
              ) {
                document
                  .querySelector(".onoffswitch-label")
                  .classList.add("pointer");
              }
            }}
            onMouseLeave={() => {
              if (
                dataBase.DeckNames[index].data.filter((x) => x.paused === true)
                  .length > 0
              ) {
                document
                  .querySelector(".onoffswitch-label")
                  .classList.remove("pointer");
              }
            }}
          >
            {mainBox ? (
              <InputCheckbox
                // cardsPausedAndClicked={cardsPausedAndClicked}
                index={index}
                generateRandom={generateRandom}
                setShowAnswerBtn={setShowAnswerBtn}
                
              />
            ) 
            
            : null}
          </div>

          {menu}
          <button
            className="redCross"
            onClick={() => {
              setShow(false);
              setEdit(false);
              setShowRepeatBtn(false);
              setShowAnswerBtn(true);
              setEditBtnClicked(false);
              if (index) {
              let newDataBase = {...dataBase}


              newDataBase.DeckNames[index].pauseMode = false //needed to be set to false so that switch diagram closes in case its opened
              setDataBase(newDataBase)
              }
            }}
          >
            <img className="nonDraggableIcon" src={redCross} alt="redCross" />
          </button>
        </Modal.Header>

        <Modal.Body>{children}</Modal.Body>
      </div>
    </Modal>
  );
}
