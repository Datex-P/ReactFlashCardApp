import React, { useState, useContext } from 'react';
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
  const [editHex, setEditHex] = useState(false)

  // const [radio, setRadio] = useState('')

  function setShow() {
    history.push('/')
  }

  function handleColor(e) {
    let newDataBase = { ...dataBase }
    newDataBase.userPreferences[e.target.name] = e.target.value
    setDataBase(newDataBase)
  }

  return (

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

      <div className='d-flex border border-dark justify-content-around align-items-center' style={{ padding: '1px', borderRadius: '5px', position: 'relative' }}>
        <div className='d-flex justify-content-around align-items-center' style={{ width: '340px' }}>
          {dataBase &&

            dataBase.userTimePreferences.map((col, k) =>
              <Col key={col.name} index={k} data={col} editable={editable} />
            )

          }
        </div>
        <div title='Click and change name buttons and repetition intervals for all decks.' style={{ position: 'absolute', right: '8px', top: '24px', cursor: 'pointer' }}>
          <img
            onClick={() => {
              setEditable(!editable)
              setSaveOrEdit(!saveOrEdit)
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
        style={{ borderRadius: '5px', position: 'relative', paddingLeft: '6px', margin: 'auto', paddingRight: '16px', padding: '3px', width: '198px', height: '50px' }}>
        {



          Array(7).fill('').map((el, idx) =>

            <Hexagons idx={idx} editHex={editHex}/>


          )
        }

      </div>
      <div style={{ position: 'absolute', top: '226px', right: '70px' }}>
        <img
          onClick={() => {
            setSaveOrEditGoal(!saveOrEditGoal)

            setEditHex(!true)

          }}
          src={saveOrEditGoal ? edit : save}
          alt={saveOrEditGoal ? 'edit' : 'save'}
          style={{ outline: 'none' }}
        />
      </div>
      <div className='weeklyTarget'>
        {/* `Target met: ${0} weeks in a row` */}
          Target met: 0 weeks in a row
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


function Col({ data: { name, amount, unit }, editable, index }) {

  const [inputNumb, setInputNumb] = useState(amount)
  const { dataBase, setDataBase } = useContext(Context)

  function handleTime(e) {
    setInputNumb(e.target.value)
    let newDataBase = { ...dataBase }
    newDataBase.userTimePreferences[index].amount = e.target.value
    setDataBase(newDataBase)
  }

  return (
    <div className=' p-2' style={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
      <p className=' border border-dark d-flex justify-content-center' style={{ borderRadius: '5px', width: '85px', paddingLeft: '5px' }}>
        <div style={{ marginRight: '4px' }}>{'<'}</div>
        <input className={style.input}
          style={{ backgroundColor: 'transparent', width: editable ? '40px' : '23px' }}
          type={editable ? 'number' : 'text'}
          disabled={!editable}
          value={inputNumb}
          onChange={handleTime}

        />{unit}</p>
      <button className=' generalButtonStyling' style={{ width: '86px', height: '27px' }}>{name}</button>
    </div>
  )

}


function Hexagons({idx}) {

  // const [filledHex, setFilledHex] = useState(0);
  const { dataBase, setDataBase } = useContext(Context)



  
  function setIndex () {
    let newDataBase = {...dataBase}
    newDataBase.userPreferences.days = idx
    setDataBase(newDataBase)
  }



  return (
    <div className='d-flex flex-column justify-content-center align-items-center'
      style={{
        width: '16px', height: '21px', position: 'relative',
        margin: '3px', padding: '3px', transform: 'rotate(90deg)'
      }}>

      <img
        onMouseEnter = {setIndex}
        src={idx>= dataBase.userPreferences.days? hexagonGreen : hexagonWhite}
        alt='hexagon'
     
         />
     
    </div>
  )
}










