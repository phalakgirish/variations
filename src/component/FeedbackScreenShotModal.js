import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

export default function FeedbackScreenShotModal(props) {

    const [activeTabIndex, setActiveTabIndex] = useState(1);
    const thisTabref = useRef();
    const otherTabref = useRef();
    const windowTabref = useRef();
    const EntireScreenref = useRef();


    const setActiveTab = (index) => {
        setActiveTabIndex(index);
      };
      
  return (
    <>
     <Modal
        size="lg"
        show={props.showScreenShot}
        onHide={() => props.handelScreenShotHide()}
        aria-labelledby="example-modal-sizes-title-lg"
        className='feedback-screen-shot-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Send feedback to Variant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p style={{fontWeight:'500',fontSize:'16px'}}>Choose what to share</p>
            <div className='Screen-tab-div'>
                    <div className='Screen-tabs-li'>
                        <ul className='tabs-header'>
                                <li key={1} className={activeTabIndex == 1 ? "active-tab" : ""} onClick={()=>setActiveTabIndex(1)}> <span className='tabs-heading'>This Tab</span></li>
                                <li key={2} className={activeTabIndex == 2 ? "active-tab" : ""} onClick={()=>setActiveTabIndex(2)}> <span className='tabs-heading'>Other Tab</span></li>
                                <li key={3} className={activeTabIndex == 3 ? "active-tab" : ""} onClick={()=>setActiveTabIndex(3)}> <span className='tabs-heading'>Window</span></li>
                                <li key={4} className={activeTabIndex == 4 ? "active-tab" : ""} onClick={()=>setActiveTabIndex(4)}> <span className='tabs-heading'>Entire Screen</span></li>
                        </ul>
                    </div>
                    <div className='Screen-tab-body'>
                                <div className={activeTabIndex === 1 ? "tabs-body tab-body-div active-tab" : "tabs-body tab-body-div inactive-tab"} ref={thisTabref}>
                                    This tab
                                </div>
                                <div className={activeTabIndex === 2 ? "tabs-body tab-body-div active-tab" : "tabs-body tab-body-div inactive-tab"} ref={otherTabref}>
                                    Other Tab
                                </div>
                                <div className={activeTabIndex === 3 ? "tabs-body tab-body-div active-tab" : "tabs-body tab-body-div inactive-tab"} ref={windowTabref}>
                                    Window
                                </div>
                                <div className={activeTabIndex === 4 ? "tabs-body tab-body-div active-tab" : "tabs-body tab-body-div inactive-tab"} ref={EntireScreenref}>
                                    Entire Screen
                                </div>
                    </div>
            </div>
            <hr />
            <div className='feedback-screen-shot-action'>
                <button className='screen-shot-cancel-btn act-btn'>Cancel</button>
                <button className='screen-shot-share-btn act-btn'>Share</button>
            </div>
            
        </Modal.Body>
      </Modal>
    </>
  )
}
