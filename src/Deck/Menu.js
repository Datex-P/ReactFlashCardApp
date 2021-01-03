import React, { useState } from 'react';
import './styles.css';
import Icon from '../LittleComponents/Icon'
import settingsIcon from '../icons/settings.svg';
import statsIcon    from '../icons/stats.svg';
import logoutIcon   from '../icons/logout.svg';


export default function Menu() {

  const [show, setShow] = useState(false);

  return (
    <div style={{display: 'flex', alignItems:'center', marginBottom: '80px'}}>
      <div className='menu flexColumnAlignCenter'>Menu
        <div className='menuContainer flexColumnAlignCenter' onClick={() => setShow(!show)}>
          <div className={'menuIcon '+(show?'transPlus':' ')} style={{ top: show?'8px':'0px' }}></div>
          {!show&&<div className={'menuIcon'} style={{ top: '8px' }}></div>}
          <div className={'menuIcon '+(show?'transMinus':' ')} style={{ top: show?'8px':'16px' }}></div>
        </div>
      </div>
      {
        show
          &&
          <div style={{position: 'relative'}}>
            <div className='menuStyling'>
              <Icons icons={[
                {src:settingsIcon, alt:'settingsIcon', href: 'settings', style: {padding: '3px'}},
                {src:statsIcon, alt:'statsIcon', href:'stats',style:{borderLeft:'2px solid black',padding: '3px', borderRight:'2px solid black'}},
                {src:logoutIcon, alt:'logoutIcon', href:'logout', style: {padding: '3px'}}
              ]} 
              />

            </div>
          </div>
      }
    </div>
  )
}



function Icons({icons}){
  return(
    icons.map((icon,key)=><Icon key={key} {...icon}/>)
  )
}