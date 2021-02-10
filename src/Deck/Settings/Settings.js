import React, { useState, useContext, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import style from './style.module.css'
import '../styles.css'
import { Context } from '../../Context'
import Hexagons from  './Hexagons'

import BasicOrangeWindow from '../deck/BasicOrangeWindow'

import edit from '../../icons/edit.svg'
import save from '../../icons/save.svg'



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

    <BasicOrangeWindow
      show={true}
      setShow={setShow}
      title={

        <div
          style={{fontWeight: 'bold', fontSize: '22px'}}
          contentClassName={'pos'}
        >

          Settings
       </div>
      }
    >
      <div style={{ fontWeight: 'bold', fontSize: '17px', textAlign: 'center', marginBottom: '10px' }}
      >

          Change Repetition Interval
      </div>

      <div 
          className='d-flex border border-dark justify-content-around align-items-center'
          style={{ padding: '1px', borderRadius: '5px', position: 'relative' }}
      >
          <div 
              className='d-flex justify-content-around align-items-center' 
              style={{ width: '325px' }}
          >
              {dataBase &&
                  
                  dataBase.userTimePreferences.map((col, k) =>

                  <Col key={col.name} 
                      index={k} 
                      data={col} 
                      editable={editable} 
                      userTimePreferences={userTimePreferences} 
                      setUserTimePreferences={setUserTimePreferences} 
                  />
                  )
              }
            </div>
            <div 
                title='Click and change name buttons and repetition intervals for all decks.'
                style={{ position: 'absolute', right: '5px', top: '29px', cursor: 'pointer' }}
            >
                <img
                    src={saveOrEdit ? save : edit}
                    alt={saveOrEdit ? 'save' : 'edit'}
                    style={{ outline: 'none' }}
                    onClick={() => {
                    setEditable(!editable)
                    setSaveOrEdit(!saveOrEdit)
                    saveT()
                    }}
                />
            </div>
      </div>

      <div 
          style={{ fontWeight: 'bold', fontSize: '17px', marginTop: '25px', 
                   textAlign: 'center', marginBottom: '10px' }}
      >
          Goal Settings
      </div>

      <div style={{ fontWeight: 'bold', fontSize: '13px', textAlign: 'center' }}
      >
          Current Weekly Target
      </div>

      <div 
        className='d-flex border border-dark justify-content-between align-items-center'
        style={{
          borderRadius: '5px', position: 'relative', paddingLeft: '6px', margin: 'auto',
          paddingRight: '14px', paddingBottom: '3px', width: '211px', height: '59px'
          }}
      >
        {

          Array(7).fill('').map((el, idx) =>

            <Hexagons idx={idx} editHex={editHex} setEditHex={setEditHex} saveOrEditGoal={saveOrEditGoal} />

          )
        }
      </div>
      <div style={{ position: 'absolute', top: '230px', right: '66px', cursor: 'pointer' }}
      >
        <img
          src={editHex ? edit : save}
          alt={saveOrEditGoal ? 'edit' : 'save'}
          style={{ outline: 'none' }}
          
          onClick={() => {
            setSaveOrEditGoal(!saveOrEditGoal)
            setEditHex(!editHex)
          }}

        />
      </div>
      <div className='weeklyTarget'
      >

        Target met: {dataBase.userPreferences.weeksInRow} weeks in a row

      </div>
      <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}
      >
          Colorscheme
      </div>

      <div 
          className='d-flex border border-dark justify-content-between align-items-center'
          style={{borderRadius: '5px', padding: '5px', width: '215px', marginTop: '10px', margin: 'auto'}}
      >

        {
          ['light', 'dark', 'default'].map(comp =>
            <>
              <input 
                style={{ cursor: 'pointer' }}
                name='backgroundColor'
                type='radio'
                // title = `Change background color of main menu to ${comp}.`
                value={comp}
                onChange={handleColor}
              />
              <label className='mb-0'>
                  {comp}
              </label>
            </>
          )
        }
      </div>

    </BasicOrangeWindow>
  )
}

export default withRouter(Settings)


function Col({ data: { name, amount, unit }, editable, index, userTimePreferences, setUserTimePreferences }) {

  const [inputNumb, setInputNumb] = useState(amount)
  const [inputText, setInputText] = useState(name)

  function handleInputNumbers(e) {

    setInputNumb(e.target.value)
    let newUserTimePreferences = [ ...userTimePreferences ]
    newUserTimePreferences[index].amount = e.target.value
    setUserTimePreferences(newUserTimePreferences)
  }


  function handleInputText(e) {

    setInputText(e.target.value)
    let newUserTimePreferences = [ ...userTimePreferences ]
    newUserTimePreferences[index].name = e.target.value
    setUserTimePreferences(newUserTimePreferences)
  }


  return (
    <div 
        className=' p-2' 
        style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <p 
          className=' border border-dark d-flex justify-content-center' 
          style={{borderRadius: '5px', width: '85px'}}
      >
          <div style={{ marginRight: '4px' }}
          >
              {'<'}
          </div>
          <input 
              className={style.input}
              type='number'
              style={{
                 backgroundColor: 'transparent', outline: 'none', width: '40px', height: '24px'
              }} 
              disabled={!editable}
              value={inputNumb}
              onChange={handleInputNumbers}
        />
            {unit}
      </p>

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
        onChange={handleInputText}
      />

    </div>
  )

}













