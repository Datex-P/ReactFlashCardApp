import React, { useContext } from 'react'
import { Context } from '../../Context'


export default function HourlyBreakdown() {

  const { dataBase, setDataBase } = useContext(Context)


  function handleMonths(e) {
    let newDataBase = { ...dataBase }
    newDataBase[e.target] = e.target.value
    setDataBase(newDataBase)
  }

  return (
    
    <div className='d-flex align-items-center flex-column'
    >

      <div style={{ marginTop: '20px', fontSize: 'bold', fontWeight: 'bold' }}
      >
          Hourly Breakdown
      </div>

      <div  style={{display: 'flex', justifyContent: 'space-evenly', width: '270px', height: '38px', borderRadius: '5px',  border: '1px solid black', padding: '1px 5px', marginTop: '10px', marginBottom: '20px' }}>
        
        {
          ['1 month', '3 month', '12 month'].map(comp =>
            <>
              <input 
                  style={{ cursor: 'pointer', marginTop: '10px', marginBottom: '20px' }}
                  name='breakdownIntervals'
                  type='radio'
                // title = `Change background color of main menu to ${comp}.`
                  value={comp}
                  onChange={handleMonths}
              />

              <label style={{ margin: '5px' }}>
              
                  {comp}
              
              </label>
            </>
          )
        }
      </div>

    </div>
  )
}