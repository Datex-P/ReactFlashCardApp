import React, { useState} from 'react';
import style from './style.module.css'
import '../styles.css'



export default function RepetitionIntervalFields(
                                      { data: { name, amount, unit }, 
                                      editIsPossible, index, 
                                      userTimePreferences, setUserTimePreferences,
                                      saveOrEdit
                                      }) 
  {

  const [inputNumb, setInputNumb] = useState(amount)
  const [inputText, setInputText] = useState(name)
  
  function handleInputNumbers(e) {

    
    if(e.target.value.length<3) {

      setInputNumb(e.target.value)
      let newUserTimePreferences = [ ...userTimePreferences ]
      newUserTimePreferences[index].amount = e.target.value
      setUserTimePreferences(newUserTimePreferences)
    }
  }

  function checker(e){
    let {value} = e.target;
    let newValue = value.replace(/[^0-9]/g,'')
    if(newValue.length<3){
      setInputNumb(newValue)
    }
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
    >
      <p 
          className=' border border-dark d-flex justify-content-center' 
          style={{borderRadius: '5px', width: '79 px'}}
      >
          <div style={{ marginRight: '4px' }}
          >

              {'<'}
          </div>
          <form>

              <input 
                  className={style.input}
                  type='number'
                  style={{ backgroundColor: 'transparent', outline: 'none', width: '40px', 
                  height: '24px', textAlign: 'center', cursor: saveOrEdit? 'pointer': 'default'
                        }} 
                  disabled={!editIsPossible}
                  value={inputNumb}
                  onChange={handleInputNumbers}
                  onInput={checker}
            
              />
          </form>

            {unit}
      </p>
      <form>
          <input
            value={inputText}
            type='text'
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
      </form>

    </div>
  )

}

