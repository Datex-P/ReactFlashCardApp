import React from 'react';
import { Nav } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

 function Icon({ src, alt, href, style = null,history }) {


  return (
    <div
      style={{ ...style, display: 'flex' }}
      className='iconContainer'>

      <img 
          src={src} 
          alt={alt} 
          style={{ width: '20px' }} 
      />
      
      <Nav.Link 
          className={'link px-3'}
          onClick={()=>{
            history.push('/'+href)}
            } 
      > 
          {href} 
      </Nav.Link>

    </div>
  )
}

export default withRouter(Icon)
