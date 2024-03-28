
<Accordion defaultActiveKey={activeAccordionItem}>
<Accordion.Item eventKey="1" className={(activeAccordionItem !== '1')?"mb-2 custom-accordion hide-accordian":"mb-2 custom-accordion show-accordian"}>
  <Accordion.Header className='mx-2'>Player Name</Accordion.Header>
  <Accordion.Body >
    <Form>
      <FontAwesomeIcon icon="" />
      <div className="mb-2 row custombackground">
        <div className="col-3 d-flex align-items-center">
          <InputGroup.Text
            id="inputGroup-sizing-default"
            className="custom-input-group-text"
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
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
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
          >
            Font
          </InputGroup.Text>
        </div>
        <div className="col-9 d-flex align-items-center">
          <Form.Select
            aria-label="Default select example"
            value={NamefontFamily}
            onChange={handlePlayerNameFontFamilyChange}
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
        <div className="font-sample" style={{ fontFamily: NamefontFamily }}>
          {fontOptions.map((option) => (
            <span
              key={option.value}
              style={{ display: NamefontFamily === option.value ? 'block' : 'none' }}
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
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
          >
            <div>Text Color</div>
          </InputGroup.Text>

        </div>
        <div className="col-9 d-flex align-items-center justify-content-end" >
          {/* Additional content in the second column */}
          {/* <div
            onClick={handlePlayerNameTextColorClick}
            style={{
              width: '20px',
              height: '20px',
              background: NametextColor,
              marginLeft: 'auto',
              border: '1px solid rgb(0,0,0,0.1)'
            }}
          ></div> */}

          <Form.Control
            type="color"
            style={{ border: "1px solid black", padding: "0px", height: "25px", width: "30px", borderRadius: "8px" }}
            id="exampleColorInput"
            value={NametextColor}
            onChange={(e)=>{handlePlayerNameTextColorChange(e)}}
            onBlur={handlePlayerNameTextColorClick} // Close the color picker on blur
          />
        </div>
      </div>
      <div className="mb-4 row custombackground">
        <div className="col-3 d-flex align-items-center">
          <InputGroup.Text
            id="inputGroup-sizing-default"
            className="custom-input-group-text"
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
          >
            <div>Text Size</div>
          </InputGroup.Text>
        </div>
        <div className="col-9 d-flex align-items-center justify-content-end">
           <input
            type="number"
            value={NametextSize}
            onChange={handlePlayerNameTextSizeChange}
            className='custom-select text-end texttb'
          />
        </div>
      </div>
      <div className="mb-2 row custombackground">
        <div className="col-3 d-flex align-items-center">
          <InputGroup.Text
            id="inputGroup-sizing-default"
            className="custom-input-group-text"
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
          >
            <div>Border</div>
          </InputGroup.Text>
        </div>
        <div className="col-9 d-flex align-items-center justify-content-end">
           <input
            type="number"
            value={NametextBorder}
            onChange={handlePlayerNameBorderChange}
            className='custom-select text-end texttb'
          />
        </div>
      </div>
      <div className="mb-2 row custombackground">
        <div className="col-3 d-flex align-items-center">
          <InputGroup.Text
            id="inputGroup-sizing-default"
            className="custom-input-group-text"
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
          >
            <div>Border Color</div>
          </InputGroup.Text>

        </div>
        <div className="col-9 d-flex align-items-center justify-content-end">
          {/* Additional content in the second column */}


          <Form.Control
            type="color"
            id="exampleColorInput"
            style={{ border: "1px solid black", padding: "0px", height: "25px", width: "30px", borderRadius: "8px" }}
            defaultValue={NameoutlineColor}
            onChange={(e) => { handlePlayerNameOutlineColorChange(e) }}
            onBlur={handlePlayerNameOutlineColorClick} // Close the color picker on blur
          />
          
        </div>
      </div>
      <div className="mb-2 row custombackground">
        <div className="col-3 d-flex align-items-center">
          <InputGroup.Text
            id="inputGroup-sizing-default"
            className="custom-input-group-text"
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
          >
            <div>Rotation</div>
          </InputGroup.Text>

        </div>
        <div className="col-9 d-flex align-items-center justify-content-end">
          {/* Additional content in the second column */}
          <input
            type="number"
            value={NamerotationAngle}
            ref={NamerotationInputRef}
            onChange={handlePlayerNameRotationChange}
            placeholder="Enter rotation angle"
            className='custom-select text-end texttb'
          />
        </div>
      </div>
    </Form>
  </Accordion.Body>
</Accordion.Item>

<Accordion.Item eventKey="2" className={(activeAccordionItem !== '2')?"mb-2 custom-accordion hide-accordian":"mb-2 custom-accordion show-accordian"}>
  <Accordion.Header className='mx-2'>Player Number font</Accordion.Header>
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
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
          >
            Text
          </InputGroup.Text>
        </div>
        <div className="col-9 d-flex align-items-center">
          <Form.Control
            value={playerNo}
            onChange={handlePlayerNoChange}
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
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
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
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
          >
            <div>Text Color</div>
          </InputGroup.Text>

        </div>
        <div className="col-9 d-flex align-items-center justify-content-end">
          {/* Additional content in the second column */}

          <Form.Control
            type="color"
            id="exampleColorInput"
            style={{ border: "1px solid black", padding: "0px", height: "25px", width: "30px", borderRadius: "8px" }}
            defaultValue={textColor}
            onChange={(e) => { handleTextColorChange(e) }}
            onBlur={handleTextColorClick} // Close the color picker on blur
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

</div> */}
      <div className="mb-4 row custombackground">
        <div className="col-3 d-flex align-items-center">
          <InputGroup.Text
            id="inputGroup-sizing-default"
            className="custom-input-group-text"
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
          >
            Text Size
          </InputGroup.Text>
        </div>
        <div className="col-9 d-flex align-items-center justify-content-end">
           <input
            type="number"
            value={textSize}
            onChange={handleTextSizeChange}
            className='custom-select text-end texttb'
          />
        </div>
      </div>
      <div className="mb-2 row custombackground">
        <div className="col-3 d-flex align-items-center">
          <InputGroup.Text
            id="inputGroup-sizing-default"
            className="custom-input-group-text"
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
          >
            Border
          </InputGroup.Text>
        </div>
        <div className="col-9 d-flex align-items-center justify-content-end">
           <input
            type="number"
            value={NotextBorder}
            onChange={handleNoBorderChange}
            className='custom-select text-end texttb'
          />
        </div>
        
      </div>
      <div className="mb-2 row custombackground">
        <div className="col-3 d-flex align-items-center">
          <InputGroup.Text
            id="inputGroup-sizing-default"
            className="custom-input-group-text"
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
          >
            <div>Border Color</div>
          </InputGroup.Text>

        </div>
        <div className="col-9 d-flex align-items-center justify-content-end">
          {/* Additional content in the second column */}

          <Form.Control
            type="color"
            id="exampleColorInput"
            style={{ border: "1px solid black", padding: "0px", height: "25px", width: "30px", borderRadius: "8px" }}
            defaultValue={outlineColor}
            onChange={(e) => { handleOutlineColorChange(e) }}
            onBlur={handleOutlineColorClick} // Close the color picker on blur
          />
        </div>
      </div>
      <div className="mb-2 row custombackground">
        <div className="col-3 d-flex align-items-center">
          <InputGroup.Text
            id="inputGroup-sizing-default"
            className="custom-input-group-text"
            style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
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
            className='custom-select text-end texttb'
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