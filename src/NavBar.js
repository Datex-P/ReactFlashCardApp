import React from 'react'

import './LittleComponents/styles.css'
import MenuContainer from './Deck/MenuContainer'


export default function NavBar({editButtonClicked, showProgressDiagram, setShowProgressDiagram}) {
  
  
  return (
    <>   
      <MenuContainer 
        editButtonClicked={editButtonClicked}
        showProgressDiagram={showProgressDiagram}
        setShowProgressDiagram={setShowProgressDiagram}
        /> 
    </>
  )
}


