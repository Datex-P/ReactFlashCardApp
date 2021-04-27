import React, {useState, useContext} from 'react';
import {Context} from '../../Context'

export default function InputCheckbox ({cardsPausedAndClicked, index}) {
  let [clicked, setClicked] = useState(false)
  const { dataBase, setDataBase} = useContext(Context)


  function cardsPaused() {
    console.log('function cardsPaused was fired')
    return  dataBase.DeckNames[index].data.filter(x => x.pause === true).length || 0
  }


  return (

     
      <div onClick={cardsPausedAndClicked?
                    ()=>setClicked(!clicked)
                    :()=>{}
                    }
      >
          <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox myonoffswitch" 
            // id="myonoffswitch" 
          //  tabindex="0" 
            //{cardsPausedAndClicked? defaultChecked={true} : defaultChecked={false} }
            //defaultChecked: cardsPausedAndClicked? {true}: {false}
            checked={clicked}
          />
        <label className="onoffswitch-label" htmlFor="myonoffswitch">
            <span className="onoffswitch-inner"></span>
            <span className="onoffswitch-switch d-flex justify-content-center align-items-center">
                    {`${cardsPaused()}`}
            </span>
        </label>
    </div>
   
  )
}