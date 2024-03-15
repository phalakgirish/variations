import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form } from 'react-router-dom';

export default function FeedbackOffCanvas({ name, ...props }) {

  const [feedbackSendStatus,setFeedbackSendStatus] = useState(false);
  return (
    <>
        <Offcanvas show={props.show} onHide={props.handleClose} {...props} className='FeedbackOffCanvas'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='FeedBackOffCanvasTitle'>Send feedback to Variant</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <div className='feedback-input-div'>
                <p className='feedback-input-div'>Describe your feedback</p>
                <textarea placeholder='Tell us what prompted this feedback...' className='feedback-input-textarea' rows='4'/>
               <br /> <span style={{fontWeight:'500',fontSize:'14px',opacity:'60%'}}>Please don't include any sensitive information.</span>
            </div>
            <div className='feedback-ScreenShot-div' onClick={()=>{props.handelScreenShotShow()}}>
                <p className='feedback-ScreenShot-label'>A screenshot will help us better understand your feedback.</p>
                <div className='feedback-Screenshot-capture'>
                    Capture Screenshot
                </div>
            </div>
            <input type='checkbox'/><span style={{fontWeight:'500',fontSize:'12px',opacity:'70%',paddingLeft:'5px'}}>We may email you for more information or updates</span>
            <div className='feedback-type-div'>
                <p className='feedback-input-div'>Select the type</p>
                <div className='feedback-input-type-div'>
                    <div className='feedback-type-button'>Problem</div>
                    <div className='feedback-type-button'> Solution</div>
                </div>
            </div>
            <hr />
            <button onClick={()=>{console.log('send')}} className='feedback-send-btn'>Send</button>

            
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
