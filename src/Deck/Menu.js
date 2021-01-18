import React, { useState } from 'react';
import './styles.css';
import Icon from '../LittleComponents/Icon'
import settingsIcon from '../icons/settings.svg';
import statsIcon from '../icons/stats.svg';
import logoutIcon from '../icons/logout.svg';
import { Modal } from 'react-bootstrap'


export default function Menu() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);


  return (
    <div style={{
      // display: 'flex', alignItems: 'center', marginBottom: '80px'

      backgroundColor: '#5aaa95', zIndex: '100',
      borderTopLeftRadius: '5px', borderTopRightRadius: '5px', width: '504px',
      // marginTop: '20px'
    }}
      className=' mx-auto'

    >
      <div className='menu flexColumnAlignCenter p-3'
      // style={{marginTop: '20px'}}
      >
        <div>Menu</div>
        <div className='menuContainer flexColumnAlignCenter' onClick={() => setShow(!show)}>
          <div className={'menuIcon ' + (show ? 'transPlus' : ' ')} style={{ top: show ? '8px' : '0px' }}></div>
          {!show && <div className={'menuIcon'} style={{ top: '8px' }}></div>}
          <div className={'menuIcon ' + (show ? 'transMinus' : ' ')} style={{ top: show ? '8px' : '16px' }}></div>
        </div>
      </div>

      {
        show &&
        <>

          <Modal show={show} onHide={handleClose} contentClassName={'modNew'} dialogClassName='align-items-start  pl-3' centered>
            <Modal.Body>
              <div className='menuStyling'>
                <Icons icons={[
                  { src: statsIcon, alt: 'statsIcon', href: 'stats', style: {  width: '33%',  padding: '3px' } },
                  { src: settingsIcon, alt: 'settingsIcon', href: 'settings', style: {  width: '33%', padding: '3px', borderLeft: '2px solid black', borderRight: '2px solid black' } },
                  { src: logoutIcon, alt: 'logoutIcon', href: 'logout', style: { width: '33%', padding: '3px' } }
                ]}
                />
              </div>
            </Modal.Body>
          </Modal>
        </>
      }

    </div>
  )
}



function Icons({ icons }) {
  return (
    icons.map((icon, key) => <Icon key={key} {...icon} />)
  )
}