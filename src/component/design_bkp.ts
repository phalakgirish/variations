import React, { useState, useEffect, useRef } from 'react';
import Sidebar from "../component/Sidebar";
import Button from 'react-bootstrap/Button';
import { useParams,useLocation } from 'react-router-dom';
import Select from 'react-select';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fronttshirt from '../assets/img/Plain TeeShirt.png';
import backtshirt from '../assets/img/t-shirt.png'

import undo from '../assets/img/outline_undo_black_24dp.png';
import redo from '../assets/img/outline_redo_black_24dp.png';
import addfile from '../assets/img/outline_note_add_black_24dp.png';

import Accordion from 'react-bootstrap/Accordion';
import { ChromePicker } from 'react-color';

import { faUndo, faRedo, faSearchPlus, faShirt, faList, faCirclePlus,faImage, faTrash, faUnderline,faFileUpload } from '@fortawesome/free-solid-svg-icons';
import '../styles.css'
import { Border } from 'react-bootstrap-icons';

const fontOptions = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    // Add more font options as needed
  ];
  const fontSizes = [
    { value: '12', label: '12' },
    { value: '14', label: '14' },
    { value: '16', label: '16' },
    { value: '18', label: '18' },
    { value: '20', label: '20' },
    { value: '22', label: '22' },
    { value: '24', label: '24' },
    { value: '28', label: '28' },
    { value: '30', label: '30' },
    { value: '32', label: '32' },
    { value: '34', label: '34' },
    { value: '36', label: '36' },
    { value: '38', label: '38' },
    { value: '40', label: '40' },
    { value: '42', label: '42' },
    { value: '44', label: '44' },
    { value: '46', label: '46' },
    { value: '48', label: '48' },
    { value: '50', label: '50' },
    { value: '52', label: '52' },
    { value: '54', label: '54' },
    { value: '56', label: '56' },
    { value: '58', label: '58' },
    { value: '60', label: '60' },
    { value: '61', label: '61' },
    { value: '62', label: '62' },
    { value: '64', label: '64' },
    { value: '68', label: '68' },
    { value: '70', label: '70' },
    { value: '72', label: '72' },

    
    // Add more font options as needed
  ];  
  const TextOutline = [
    { value: '12', label: '12' },
    { value: '14', label: '14' },
    { value: '16', label: '16' },
    { value: '18', label: '18' },
    { value: '20', label: '20' },
    { value: '22', label: '22' },
    { value: '24', label: '24' },
    { value: '28', label: '28' },
    { value: '30', label: '30' },
    { value: '32', label: '32' },
    { value: '34', label: '34' },
    { value: '36', label: '36' },
    { value: '38', label: '38' },
    { value: '40', label: '40' },
    { value: '42', label: '42' },
    { value: '44', label: '44' },
    { value: '46', label: '46' },
    { value: '48', label: '48' },
    { value: '50', label: '50' },
    { value: '52', label: '52' },
    { value: '54', label: '54' },
    { value: '56', label: '56' },
    { value: '58', label: '58' },
    { value: '60', label: '60' },
    { value: '61', label: '61' },
    { value: '62', label: '62' },
    { value: '64', label: '64' },
    { value: '68', label: '68' },
    { value: '70', label: '70' },
    { value: '72', label: '72' },

    
    // Add more font options as needed
  ];  
  const CustomOption = ({ innerProps, label, data }) => (
    <div {...innerProps} style={{ fontFamily: data.value }}>
      {label}
    </div>
  );
function Design(){
    const { state } = useLocation();
    const selectedValue = state.selectedValue;
    const [view, setView] = useState('front');
    const [playerName, setPlayerName] = useState('');
   
    const [textSize,setTextSize]=useState('12');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [textPosition, setTextPosition] = useState({ x: 250, y: 250 }); // Initial position
    const [textColor, setTextColor] = useState('#808080'); // Default color
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [outlineColor,setOutLineColor]=useState('#00000');
    const [outLinecolorPickerVisible, setoutLineColorPickerVisible] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0);
  const rotationInputRef = useRef();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

    const canvasRef = useRef(null);
   
    const handleTextColorClick = () => {
        setColorPickerVisible(!colorPickerVisible);
      };
      const handleOutlineColorClick = () => {
        setoutLineColorPickerVisible(!outLinecolorPickerVisible);
      };  
    const handleToggleView = (newView) => {
        setView(newView);
    };
    const handlePlayerNameChange = (event) => {
        setPlayerName(event.target.value);
    };
    const handleTextSizeChange = (event) => {
        console.log(event.target.value);
        setTextSize(event.target.value);
    };
    const handleTextColorChange = (color) => {
        setTextColor(color.hex);
    };
    const handleOutlineColorChange=(color)=>{
        setOutLineColor(color.hex)
    }
    const handleColorPickerClose = () => {
        setColorPickerVisible(false);
      };
    const handleFontFamilyChange = (selectedOption) => {
        
        setFontFamily(selectedOption.target.value);
      };
    const handleMouseDown = (event) => {
        setIsDragging(true);
        setDragStart({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            const deltaX = event.clientX - dragStart.x;
            const deltaY = event.clientY - dragStart.y;

            setTextPosition({
                x: textPosition.x + deltaX,
                y: textPosition.y + deltaY,
            });

            setDragStart({ x: event.clientX, y: event.clientY });
        }
    };

    const handleRotationChange = () => {
        const angle = parseFloat(rotationInputRef.current.value);
        setRotationAngle(isNaN(angle) ? 0 : angle);
      };
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setSelectedImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      const handleImageRemove = ()=>{
        setSelectedImage(null);
      }
    
      // useEffect(() => {
      //   const canvas = canvasRef.current;
      //   const ctx = canvas.getContext('2d');
    
      //   if (backgroundImage) {
      //     const bgImg = new Image();
      //     bgImg.src = backgroundImage;
    
      //     bgImg.onload = () => {
      //       ctx.clearRect(0, 0, canvas.width, canvas.height);
      //       ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    
      //       // Add your additional drawing logic here
      //     };
      //   }
      // }, [backgroundImage]);

      const handleImageSelect = () => {
        // You can open a file dialog or fetch an image from an API and set it as the selected image
        // For simplicity, let's assume the image source is a URL
        const imageUrl = prompt('Enter the URL of the image:');
        setSelectedImage(imageUrl);
      };
      
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
       
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const tshirtImg = new Image();
        tshirtImg.src = view === 'front' ? fronttshirt : backtshirt;
        const outlineSize = 2; // Adjust the outline size as needed
        //const outlineColor = 'blueviolet'; // Adjust the outline color as needed

        tshirtImg.onload = () => {
            // Set canvas dimensions to match the T-shirt image dimensions
    // canvas.width = tshirtImg.width;
    // canvas.height = tshirtImg.height;

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
     // Draw T-shirt background in a separate div
    //  const backgroundDiv = document.getElementById('tshirtBackground');
    //  backgroundDiv.style.width = '100px';
    //  backgroundDiv.style.height = `${canvas.height}px`;
    //  backgroundDiv.style.backgroundImage = `url(${tshirtImg.src})`;

    //  ctx.drawImage(tshirtImg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(tshirtImg, 0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(textPosition.x, textPosition.y);
            ctx.rotate((rotationAngle * Math.PI) / 180); // Convert degrees to radians
      
            ctx.font = `${textSize}px ${fontFamily}`
            ctx.fillStyle = textColor;
            ctx.strokeStyle = outlineColor; // Set the outline color
            ctx.lineWidth = outlineSize; // Set the outline size
            // ctx.strokeText(playerName, textPosition.x, textPosition.y);
            // ctx.fillText(playerName, textPosition.x, textPosition.y);
             // Draw the rotated text
      ctx.strokeText(playerName, 0, 0);
      ctx.fillText(playerName, 0, 0);
      ctx.restore(); // Restore the canvas state
        };
    }, [view, playerName, textPosition,textColor,textSize,fontFamily,outlineColor,rotationAngle]);

    

    return(
      <div id="main-container" className="container-fluid main">

        <Sidebar></Sidebar>
        <section className="home">
            <div className="row mx-2">
                <div className="col-3 page-side">
                    <div className="custom-side">
                        <p className="mt-3 mx-2">Steps</p>
                        
                        <Form.Select aria-label="Default select example" className="mb-2" value={selectedValue}>
                            <option>XS 34 (19 x 27 in)</option>
                            <option>S 36 (20 x 28 in)</option>  
                            <option>M 38 (21 x 29 in)</option>
                            <option>L 40 (22 x 30 in)</option>
                            <option>XL 42 (23 x 31 in)</option>
                            <option>2XL 44 (24 x 32 in)</option> 
                            <option>3XL 46 (25 x 33 in)</option>
                            <option>4XL 48 (26 x 34 in)</option>
                            <option>5XL 50 (27 x 35 in)</option>
                            <option>6XL 52 (28 x 35 in)</option>    
                           
                        </Form.Select>
                        {/* <Dropdown className="mb-2">
                            <Dropdown.Toggle id="dropdown-basic">Medium Size 38 (21 x 29)
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu">
                                <Dropdown.Item href="#/action-1">Medium Size 38 (21 x 29) </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Large Size 38 (21 x 29) </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                        
                        {/* <Form.Group controlId="formFile" className="mb-2">
                            <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Add background image"
                                readOnly
                                style={{ color: 'black' }}
                            />
                            <InputGroup.Text id="inputGroupAppend">
                                
                                <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '5px' }} />
                            </InputGroup.Text>
                            
                            </InputGroup>
                        </Form.Group> */}
                         <Form.Group controlId="formFile" className="mb-2">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Add background image"
            readOnly
            style={{ color: 'black' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="imageInput"
          />
          <label htmlFor="imageInput" style={{ cursor: 'pointer' }}>
            <InputGroup.Text id="inputGroupAppend">
            <img src={addfile} alt="file" />
              {/* <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '5px' }} /> */}
            </InputGroup.Text>
          </label>
        </InputGroup>
      </Form.Group>

                        </div>
                        <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="0" className="mb-2 mx-3 custom-accordion">
                                <Accordion.Header className='mx-3'>Player Name</Accordion.Header>
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
                                <Form.Select aria-label="Default select example"  className="mb-2">
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

                            <Accordion.Item eventKey="1" className="mb-2 mx-3 custom-accordion">
                                <Accordion.Header className='mx-3'>Player Number font</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                    {/* <InputGroup className="mb-2 custombackground">
                                        <InputGroup.Text id="inputGroup-sizing-default" className="custom-input-group-text">
                                        Text
                                        </InputGroup.Text>
                                        <Form.Control
        value={playerName}
        onChange={handlePlayerNameChange}
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        className="text-end"
    />
                                    </InputGroup> */}
                                    <FontAwesomeIcon icon="" />
                                    <div className="mb-2 row custombackground">
  <div className="col-3 d-flex align-items-center">
    <InputGroup.Text
      id="inputGroup-sizing-default"
      className="custom-input-group-text"
      style={{ background: 'white', height: '38px',fontSize:'12px', color:'gray' }}
    >
       Text
    </InputGroup.Text>
  </div>
  <div className="col-9 d-flex align-items-center">
  <Form.Control
        value={playerName}
        onChange={handlePlayerNameChange}
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        className="text-end"
    />
  </div>
</div>
                                    <div className="mb-2 row custombackground">
  <div className="col-3 d-flex align-items-center">
    <InputGroup.Text
      id="inputGroup-sizing-default"
      className="custom-input-group-text"
      style={{ background: 'white', height: '38px',fontSize:'12px', color:'gray'  }}
    >
      Font
    </InputGroup.Text>
  </div>
  <div className="col-9 d-flex align-items-center">
  <Form.Select
                  aria-label="Default select example"
                  value={fontFamily}
                  onChange={handleFontFamilyChange}
                  className="custom-select text-end"
                  style={{ border: 'none' }}
                >
                         {fontOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

                 
                </Form.Select>
  </div>
  <div className="font-sample" style={{ fontFamily: fontFamily }}>
  {fontOptions.map((option) => (
    <span
      key={option.value}
      style={{ display: fontFamily === option.value ? 'block' : 'none' }}
    >
      Sample Text
    </span>
  ))}
</div>
</div>
<div className="mb-2 row custombackground">
      <div className="col-3 d-flex align-items-center">
        <InputGroup.Text
          id="inputGroup-sizing-default"
          className="custom-input-group-text"
          style={{ background: 'white', height: '38px',fontSize:'12px', color:'gray'}}
         >
          <div>Text Color</div>
        </InputGroup.Text>
       
      </div>
      <div className="col-9 d-flex align-items-center justify-content-end">
        {/* Additional content in the second column */}
        <div
          onClick={handleTextColorClick}
          style={{
            width: '20px',
            height: '20px',
            background: textColor,
            marginLeft: 'auto',
          }}
        ></div>
        {colorPickerVisible && (
          <ChromePicker
           
            color={textColor}
            onChangeComplete={handleTextColorChange}
            onClose={handleColorPickerClose}
            style={{
                position: 'absolute',
                zIndex: '1',
                marginTop: '10px', // Optional: adjust the margin to position the color picker
              }}
          />
        )}
      </div>
    </div>
    <div className="mb-2 row custombackground">
  <div className="col-3 d-flex align-items-center">
    <InputGroup.Text
      id="inputGroup-sizing-default"
      className="custom-input-group-text"
      style={{ background: 'white', height: '38px',fontSize:'12px', color:'gray'  }}
    >
      Text Size
    </InputGroup.Text>
  </div>
  <div className="col-9 d-flex align-items-center">
  <Form.Select
                  aria-label="Default select example"
                  value={textSize}  
                   onChange={handleTextSizeChange}
                  className="custom-select text-end"
                  style={{ border: 'none' }}
                >
                         {fontSizes.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

                 
                </Form.Select>
  </div>
 
</div>
<div className="mb-2 row custombackground">
      <div className="col-3 d-flex align-items-center">
        <InputGroup.Text
          id="inputGroup-sizing-default"
          className="custom-input-group-text"
          style={{ background: 'white', height: '38px',fontSize:'12px', color:'gray'}}
         >
          <div>Outline</div>
        </InputGroup.Text>
       
      </div>
      <div className="col-9 d-flex align-items-center justify-content-end">
        {/* Additional content in the second column */}
        <div
          onClick={handleOutlineColorClick}
          style={{
            width: '20px',
            height: '20px',
            background: textColor,
            marginLeft: 'auto',
          }}
        ></div>
        {outLinecolorPickerVisible && (
          <ChromePicker
           
            color={textColor}
            onChangeComplete={handleOutlineColorChange}
            onClose={handleColorPickerClose}
            style={{
                position: 'absolute',
                zIndex: '1',
                marginTop: '10px', // Optional: adjust the margin to position the color picker
              }}
          />
        )}
      </div>
    </div>
    <div className="mb-2 row custombackground">
      <div className="col-3 d-flex align-items-center">
        <InputGroup.Text
          id="inputGroup-sizing-default"
          className="custom-input-group-text"
          style={{ background: 'white', height: '38px',fontSize:'12px', color:'gray'}}
         >
          <div>Rotation</div>
        </InputGroup.Text>
       
      </div>
      <div className="col-9 d-flex align-items-center justify-content-end">
        {/* Additional content in the second column */}
        <input
        type="number"
        value={rotationAngle}
        ref={rotationInputRef}
        onChange={handleRotationChange}
        placeholder="Enter rotation angle"
        className='custom-select text-end text-end'
        style={{
            width: '60px',
            // height: '100px',
            marginLeft: 'auto',
          }}
      />  
      </div>
    </div>
   
{/* <div className="mb-2 row custombackground">
  <div className="col-3 d-flex align-items-center">
    <InputGroup.Text
      id="inputGroup-sizing-default"
      className="custom-input-group-text"
      style={{ background: 'white', height: '38px',fontSize:'12px', color:'gray'  }}
    >
      
    </InputGroup.Text>
  </div>
  <div className="col-9 d-flex align-items-center">
  <Form.Select
                  aria-label="Default select example"
                  value={textSize}  
                   onChange={handleTextSizeChange}
                  className="custom-select text-end"
                  style={{ border: 'none' }}
                >
                         {fontSizes.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

                 
                </Form.Select>
  </div>
 
</div> */}




                                    {/* <InputGroup className="mb-2 custombackground">
                                    <div className="col-3 d-flex align-items-center">
    <InputGroup.Text
      id="inputGroup-sizing-default"
      className="custom-input-group-text"
      style={{ background: 'white', height: '38px',fontSize:'12px', color:'gray'  }}
    >
      Font
    </InputGroup.Text>
  </div>
  <div className="col-9 d-flex align-items-center">
                <Form.Select
                  aria-label="Default select example"
                  value={fontFamily}
                  onChange={handleFontFamilyChange}
                  className="custom-select text-end"
                  style={{ border: 'none' }}
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                 
                </Form.Select>
                </div>
              </InputGroup> */}
             
                               
                                {/* <Form.Select aria-label="Default select example"  value={textColor}   onChange={handleTextColorChange} className="mb-2">
                                    <option>Text Color</option>
                                    <option value="black">Black</option>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                
                                </Form.Select> */}
                                {/* <Form.Select aria-label="Default select example" value={textSize}   onChange={handleTextSizeChange}  className="mb-2">
                                    <option>Text Size</option>
                                    <option value="12">12</option>
                                <option value="14">14</option>
                                <option value="16">16</option>
                                <option value="18">18</option>
                                <option value="22">22</option>
                                
                                </Form.Select> */}
                                {/* <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Outline</option>
                                
                                </Form.Select> */}
                                {/* <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Text Shape</option>
                                
                                </Form.Select> */}
                                {/* <Form.Select aria-label="Default select example" className="mb-2">
                                    <option>Rotation</option>
                                
                                </Form.Select> */}
                                </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                       
                    </div>
                       
                <div className="col-9">
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
                            <div style={{ position: 'relative' }}>
                              
        <svg width="380" height="500" xmlns="http://www.w3.org/2000/svg" >
         
          <rect x="40" y="0" width="320" height="500" fill="lightblue" />
          {selectedImage && <image href={selectedImage} x="40" y="0" width="320" height="500" />}
          {/* {backgroundImage && <image href={backgroundImage} x="40" y="0" width="320" height="500" style={{border:'1px solid red;' }}/>} */}
         
          <circle cx="200" cy="-123" r="160" fill="white" />
        </svg>
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ position: 'absolute', top: 0, left: 190 }}
        ></canvas>
 
      </div>
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
                                    <FontAwesomeIcon onClick={handleImageRemove} icon={faTrash} style={{ marginRight: '5px', marginLeft: '5px' }} />
                                    <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="imageInput2"
          /><label htmlFor="imageInput" style={{ cursor: 'pointer' }}>
                                    <img src={addfile}  htmlFor="imageInput2" alt="file"  />
                                    </label>
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

export default Design;