import React, { useState, useContext, useEffect} from 'react';
import StyledModal from '../deck/StyledModal'
import { withRouter } from 'react-router-dom'
import style from './style.module.css'
import '../styles.css'
import edit from '../../icons/edit.svg'
import save from '../../icons/save.svg'
import hexagonWhite from '../../icons/hexagon.svg'
import hexagonGreen from '../../icons/hexagonGreen.svg'
import { Context } from '../../Context'



function Settings({ history }) {
  const [editable, setEditable] = useState(false)
  const [saveOrEdit, setSaveOrEdit] = useState(false)
  const [saveOrEditGoal, setSaveOrEditGoal] = useState(false)
  const { dataBase, setDataBase } = useContext(Context)
  const [editHex, setEditHex] = useState(true)

  const [userTimePreferences, setUserTimePreferences] = useState({})

  useEffect(() => {
    setUserTimePreferences(dataBase?.userTimePreferences || {})
  }, [dataBase?.userTimePreferences])


  function setShow() {
    history.push('/')
  }

  function handleColor(e) {
    let newDataBase = { ...dataBase }
    newDataBase.userPreferences[e.target.name] = e.target.value
    setDataBase(newDataBase)
  }


  function saveT() {
    let newDataBase = { ...dataBase }
    newDataBase.userTimePreferences = userTimePreferences
    setDataBase(newDataBase)
  }

  return (
    dataBase &&
    <StyledModal
      show={true}
      setShow={setShow}
      title={
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '22px'
          }}
          contentClassName={'pos'}
        >
          Settings
          </div>
      }
    >

      <div style={{ fontWeight: 'bold', fontSize: '17px', textAlign: 'center', marginBottom: '10px' }}>Change Repetition Interval</div>

      <div className='d-flex border border-dark justify-content-around align-items-center'
        style={{ padding: '1px', borderRadius: '5px', position: 'relative' }}>
        <div className='d-flex justify-content-around align-items-center' style={{ width: '325px' }}>
          {dataBase &&


            dataBase.userTimePreferences.map((col, k) =>
              <Col key={col.name} index={k} data={col} editable={editable} userTimePreferences={userTimePreferences} setUserTimePreferences={setUserTimePreferences} />
            )

          }
        </div>
        <div title='Click and change name buttons and repetition intervals for all decks.'
          style={{ position: 'absolute', right: '5px', top: '29px', cursor: 'pointer' }}>
          <img
            onClick={() => {
              setEditable(!editable)
              setSaveOrEdit(!saveOrEdit)
              saveT()
            }}
            src={saveOrEdit ? save : edit}
            alt={saveOrEdit ? 'save' : 'edit'}
            style={{ outline: 'none' }}
          />

        </div>
      </div>

      <div style={{ fontWeight: 'bold', fontSize: '17px', marginTop: '25px', textAlign: 'center', marginBottom: '10px' }}>Goal Settings</div>
      <div style={{ fontWeight: 'bold', fontSize: '13px', textAlign: 'center' }}>Current Weekly Target</div>

      <div className='d-flex border border-dark justify-content-between align-items-center'
        style={{
          borderRadius: '5px', position: 'relative', paddingLeft: '6px', margin: 'auto',
          paddingRight: '14px', paddingBottom: '3px', width: '211px', height: '59px'
        }}>
        {



          Array(7).fill('').map((el, idx) =>

            <Hexagons idx={idx} editHex={editHex} setEditHex={setEditHex} saveOrEditGoal={saveOrEditGoal} />

          )
        }

      </div>
      <div style={{ position: 'absolute', top: '230px', right: '66px', cursor: 'pointer' }}>
        <img
          onClick={() => {
            setSaveOrEditGoal(!saveOrEditGoal)


            setEditHex(!editHex)

          }}

          src={editHex ? edit : save}
          alt={saveOrEditGoal ? 'edit' : 'save'}
          style={{ outline: 'none' }}
        />
      </div>
      <div className='weeklyTarget'>

        Target met: {dataBase.userPreferences.weeksInRow} weeks in a row

          </div>
      <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>Colorscheme</div>

      <div className='d-flex border border-dark justify-content-between align-items-center'
        style={{
          borderRadius: '5px',
          padding: '5px',
          width: '215px', marginTop: '10px', margin: 'auto'
        }}>


        {
          ['light', 'dark', 'default'].map(comp =>
            <>
              <input style={{ cursor: 'pointer' }}
                name='backgroundColor'
                type='radio'
                // title = `Change background color of main menu to ${comp}.`
                value={comp}
                onChange={handleColor}
              />
              <label className='mb-0'>{comp}</label>
            </>
          )
        }
      </div>

    </StyledModal>
  )
}

export default withRouter(Settings)


function Col({ data: { name, amount, unit }, editable, index, userTimePreferences, setUserTimePreferences }) {

  const [inputNumb, setInputNumb] = useState(amount)
  const [inputText, setInputText] = useState(name)

  function handleTime(e) {
    setInputNumb(e.target.value)
    let newUserTimePreferences = { ...userTimePreferences }
    newUserTimePreferences[index].amount = e.target.value
    setUserTimePreferences(newUserTimePreferences)
  }

  function handleNames(e) {
    setInputText(e.target.value)
    let newUserTimePreferences = { ...userTimePreferences }
    newUserTimePreferences[index].name = e.target.value
    setUserTimePreferences(newUserTimePreferences)
  }

  return (
    <div className=' p-2' style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p className=' border border-dark d-flex justify-content-center' style={{
        borderRadius: '5px', width: '85px',
        // paddingLeft: '5px'
      }}>
        <div style={{ marginRight: '4px' }}>{'<'}</div>
        <input className={style.input}
          style={{
            backgroundColor: 'transparent',
            outline: 'none',
            // width: editable ? '40px' : '23px', 
            width: '40px',
            height: '24px'
          }}
          // type={editable ? 'number' : 'text'}
          disabled={!editable}
          value={inputNumb}
          onChange={handleTime}
        />{unit}</p>


      <input
        style={{
          width: '86px', height: '27px',
          textAlign: editable ? '' : 'center',
          paddingLeft: '7px', backgroundColor: 'grey',
          color: 'white',
          cursor: editable ? 'pointer' : 'default',
          borderRadius: '5px',
          outline: 'none',
          border: 'none'
        }}
        value={inputText}
        type='text'
        key={name}
        disabled={!editable}
        onChange={handleNames}
      />
    </div>
  )

}


function Hexagons({ idx, editHex, setEditHex }) {

  const { dataBase, setDataBase } = useContext(Context)
  const [showDay, setShowDay] = useState(false)


  function setIndex() {


    let newDataBase = { ...dataBase }
    newDataBase.userPreferences.days = idx
    setDataBase(newDataBase)
    setShowDay(true)

  }



  return (
    <div className='d-flex flex-column justify-content-center align-items-center'
      style={{
        width: '16px', height: '21px', position: 'relative',
        margin: '3px', padding: '3px', transform: 'rotate(90deg)'
      }}>

      {
        <img
          onMouseEnter={editHex ? () => { } : setIndex}
          style={{ cursor: editHex ? 'default' : 'pointer' }}
          src={idx <= dataBase.userPreferences.days ? hexagonGreen : hexagonWhite}
          alt='hexagon'
          onMouseLeave={editHex ? () => { } : () => { setShowDay(false) }}
          onClick={() => { setEditHex(true) }}

        />
      }
      {
        ((editHex && (showDay || idx === dataBase.userPreferences.days)) || idx === dataBase.userPreferences.days) 
        &&
            
          <div style={{
            transform: 'rotate(-90deg)', width: '54px',
            fontSize: '14px', paddingLeft: '14px', position: 'absolute', right: '-40px'
          }}>
            <div className='blackArrow'></div>
            <span style={{ fontWeight: 'bold' }}>{idx <= dataBase.userPreferences.days ? `${idx + 1}` : `${idx - 1}`}</span> {idx === 0? 'day': 'days'}
          </div>
      }
    </div>
  )
}










