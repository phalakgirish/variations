import React, { useState } from 'react';
import Sidebar from "../component/Sidebar";
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fronttshirt from '../assets/img/second-age.png';
import backtshirt from '../assets/img/t-shirt.png'

import undo from '../assets/img/outline_undo_black_24dp.png';
import redo from '../assets/img/outline_redo_black_24dp.png';
import addfile from '../assets/img/outline_note_add_black_24dp.png';

import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';


import { faUndo, faRedo, faSearchPlus, faShirt, faList, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function TshirtFront(){

        const [view, setView] = useState('front'); 
      
        const handleToggleView = (newView) => {
            setView(newView);
          };

    return(
      <div id="main-container" className="container-fluid main">

        <Sidebar></Sidebar>
        <section className="home">
            <div className="row mx-2">
                <div className="col-2 page-side">
                    <div className="custom-side">
                        <p className="mt-3 mx-2">Steps</p>

                        <Form.Select aria-label="Default select example" className="mb-2">
                            <option>Medium Size 38 (21 x 29)</option>
                           
                        </Form.Select>
                        {/* <Dropdown className="mb-2">
                            <Dropdown.Toggle id="dropdown-basic">Medium Size 38 (21 x 29)
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu">
                                <Dropdown.Item href="#/action-1">Medium Size 38 (21 x 29) </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Large Size 38 (21 x 29) </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                        
                        <Form.Group controlId="formFile" className="mb-3">
                            <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Add background image"
                                readOnly
                            />
                            <InputGroup.Text id="inputGroupAppend">
                                <img src={addfile} />
                            </InputGroup.Text>
                            
                            </InputGroup>
                        </Form.Group>


                        <Form.Select aria-label="Default select example" className="mb-2">
                            <option>Player Name font</option>
                           
                        </Form.Select>
                        </div>
                        <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="0" className="mb-2 custom-accordion">
                                <Accordion.Header>Player Name font</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                    <InputGroup className="mb-2">
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                        Text
                                        </InputGroup.Text>
                                        <Form.Control
                                        value={"jigar"}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        />
                                    </InputGroup>

                                    <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Font</option>
                                
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Text Color</option>
                                
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Text Size</option>
                                
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Outline</option>
                                
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Text Shape</option>
                                
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Rotation</option>
                                
                                </Form.Select>
                                </Form>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1" className="mb-2 custom-accordion">
                                <Accordion.Header>Player Number font</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                    <InputGroup className="mb-2">
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                        Text
                                        </InputGroup.Text>
                                        <Form.Control
                                        value={"jigar"}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        />
                                    </InputGroup>

                                    <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Font</option>
                                
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Text Color</option>
                                
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Text Size</option>
                                
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Outline</option>
                                
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Text Shape</option>
                                
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Rotation</option>
                                
                                </Form.Select>
                                </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                       
                    </div>
                       
                <div className="col-10">
                    <div className="row tab mt-3">
                        <ul className="d-flex col-6 custom-tabs">
                            <li className="">Design</li>
                            <li className="mx-2">Variation</li>
                            <li className="mx-2">Export</li>
                        </ul>
                        <div className="col-6 custom-btn">
                            <Button href='/Variation' className="float-end " variant="primary">
                            <FontAwesomeIcon icon={faList} style={{ marginRight: '5px' }} /> Add Variation
                            </Button> 
                       </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-1 tool-btn">
                            <Button className="mb-2">
                            <img src={undo} alt="undo" />
                            <span>Undo</span>
                            </Button> 
                            <Button className="mb-2">
                            <img src={redo} alt="redo" />
                                <span>Redo</span>
                            </Button> 
                            <Button className="mb-2">
                            <FontAwesomeIcon icon={faSearchPlus} style={{ marginRight: '5px' }} />
                                <span>Zoom</span>
                            </Button> 
                        </div>
                        <div className="col-10 text-center">
                            <div>
                            <img
                                src={view === 'front' ? fronttshirt : backtshirt}
                                className="img-fluid mx-auto d-block"
                                alt="Responsive image"
                            />    

                            </div>
                           
                        <div className='tsize'>
                            <div className='mx-auto' style={{ width: '30%' }}>
                                <Form.Group controlId="formFile" className="mb-3 mx-auto">
                                    <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Add background image"
                                        readOnly
                                    />
                                    <InputGroup.Text id="inputGroupAppend">
                                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px', marginLeft: '5px' }} />
                                    <img src={addfile} alt="file" />
                                    </InputGroup.Text>
                                    
                                    </InputGroup>
                                </Form.Group>

                                <Form.Select aria-label="Default select example" className="mb-2">
                                        <option>Back Side - Medium Size 38 (21 x 29)</option>
                                    
                                </Form.Select>
                            </div>
                            
                        </div>
                        
                        </div>
                        <div className="col-1 tool-btn">
                            <Button className={`mb-2 ${view === 'front' ? 'active' : ''}`} onClick={() => handleToggleView('front')}>                            <FontAwesomeIcon icon={faShirt} style={{ marginRight: '5px' }} />
                                <span>Front</span>
                            </Button> 
                            <Button className={`mb-2 ${view === 'back' ? 'active' : ''}`} onClick={()=> handleToggleView('back')}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ marginRight: '5px' }} />
                                <span>Add backside</span>
                            </Button> 
                           
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    </div>
    );
}

export default TshirtFront;