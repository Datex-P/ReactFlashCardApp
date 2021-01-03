import React from 'react';
import { Nav } from 'react-bootstrap'



export default function Icon({ src, alt, href, style = null }) {


  return (
    <div
      style={{ ...style, display: 'flex' }}
      className='iconContainer'>

      <img src={src} alt={alt} style={{ width: '20px' }} />
      <Nav.Link href={`/${href}`} className={'link'}> {href} </Nav.Link>


    </div>
  )
}
