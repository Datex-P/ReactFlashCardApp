import { Modal } from 'react-bootstrap'
import redCross from '../../icons/redCross.svg'

export default function StyledModal({children, show, setShow,title,menu, setEdit, setShowAnswer, setShowRepeat}) {
  return(
    <Modal
        show={show}
        onHide={() => setShow(false)}
        contentClassName={'mod'}
        backdrop="static"
        style= {{left: '-160px !important', right: '45px !important'}}
      >
          <div style={{width: '98%', height: '95%', margin: 'auto', overflow: 'hidden auto'}}>
        <Modal.Header className='border-bottom-0'>
          <Modal.Title style={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '12px', height: '24px' }}>
            {title}
          </Modal.Title>
            {menu}
          <button className='redCross'
          onClick={() => {setShow(false)

           setShowAnswer(false)
           setEdit(false)
           setShowRepeat(false)
          }
          } >
          <img src={redCross} alt='redCross' />
          </button>
        </Modal.Header>
        <Modal.Body >

          {children}

        </Modal.Body>
          </div>
      </Modal>
   
  )
}