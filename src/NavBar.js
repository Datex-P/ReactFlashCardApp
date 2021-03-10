import React from 'react'

import './LittleComponents/styles.css'
import MenuContainer from './Deck/MenuContainer'

export default function NavBar({editBtnClicked}) {
  
  
  return (
    <>   
      <MenuContainer editBtnClicked={editBtnClicked}/> 
    </>
  )
}


