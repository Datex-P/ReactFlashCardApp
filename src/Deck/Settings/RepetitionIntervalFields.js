import React, { useState} from 'react';
import style from './style.module.css'
import '../styles.css'



export default function RepetitionIntervalFields(
                                      { data: { name, amount, unit }, 
                                      editIsPossible, index, 
                                      userTimePreferences, setUserTimePreferences,
                                      }) 
  {

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
        className='p-2 d-flex flex-column justify-content-center align-items-center' 
        // style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
              maxLength="3" 
              minLength='1'
              oninput="this.value=this.value.replace(/[^0-9]/g,'')"
              style={{ backgroundColor: 'transparent', outline: 'none', width: '40px', height: '24px', textAlign: 'center'
                    }} 
              disabled={!editIsPossible}
              value={inputNumb}
              min='1'
              max='99'
              onChange={handleInputNumbers}
          />

            {unit}
      </p>

      <input
        value={inputText}
        type='text'
        key={name}
        disabled={!editIsPossible}
        onChange={handleInputText}
        className='repetitionIntervalTextFields'
        maxLength = '8'
        minLength = '3'
        style={{
                textAlign: editIsPossible ? '' : 'center', 
                cursor: editIsPossible ? 'pointer' : 'default'
              }}
      />

    </div>
  )

}

