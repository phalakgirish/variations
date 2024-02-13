import React, { useEffect, useRef, useState } from 'react';
import Sidebar from "../component/Sidebar";
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sidemenu from '../assets/img/second-age.png';
import cover from '../assets/img/png2.png';
import addfile from '../assets/img/outline_note_add_black_24dp.png';

import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import * as htmlToImage from 'html-to-image';


import { faUndo, faRedo, faSearchPlus, faShirt, faList, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';

function Export(){

    const [tshirtvariation,setTshirtvariation] = useState();
    var tshirtdetails = JSON.parse(localStorage.getItem('tshirtDetails'));
    var selectedImage = localStorage.getItem('bgImageDetails');
    // console.log(tshirtdetails);
    const tshirtimg = useRef();
     
   var backgroundImg=localStorage.getItem('bgImageDetails');
   
    const backgroundImage = backgroundImg; // Replace with your background image URL
   
    const canvasRef = useRef([]);
    const canvasRefName = useRef([]);

    const drawTextOnCanvas = (text, number,canvas) => {
        if (canvas) {
             var playernamedetails = JSON.parse(localStorage.getItem('playernamedetails'));
             var playernumberdetails = JSON.parse(localStorage.getItem('playernumberdetails'));
            //  console.log(playernumberdetails.textColor);
            const ctx = canvas.getContext('2d');
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
             // Draw background image
             const img = new Image();
             img.src = backgroundImage;
             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              // Draw text or other content on top of the background
            // Draw name
            ctx.font = `${playernamedetails.NametextSize}px ${playernamedetails.NamefontFamily}`
            ctx.fillStyle = playernamedetails.NametextColor;
            ctx.strokeStyle=playernamedetails.NameoutlineColor
            ctx.lineWidth = '2'; // Set the outline size
            ctx.rotate((playernamedetails.NamerotationAngle * Math.PI) / 180); // Convert degrees to radians
            ctx.fillText(text, playernamedetails.NametextPosition.x-135, playernamedetails.NametextPosition.y);

              // Draw number
            ctx.font = `${playernumberdetails.textSize}px ${playernumberdetails.fontFamily}`
            ctx.fillStyle = playernumberdetails.textColor;
            ctx.strokeStyle=playernumberdetails.outlineColor
            ctx.lineWidth = '2'; // Set the outline size
            ctx.rotate((playernumberdetails.rotationAngle * Math.PI) / 180); // Convert degrees to radians
            ctx.fillText(number, playernumberdetails.textPosition.x-160, playernumberdetails.textPosition.y-100);
        }
    };

    useEffect(() => {
        if (tshirtdetails) {
            tshirtdetails.forEach((val, index) => {
                console.log(val);
                drawTextOnCanvas(val.name, val.number, canvasRef.current[index]);
                // drawTextOnCanvas(`${val.name}`, canvasRef.current[index]);
                // drawTextOnCanvas(`${val.number}`, canvasRef.current[index]);
            });
        }
    }, [tshirtdetails]);
    const downloadImage = async () => {

        var divimg = document.querySelectorAll('.tshirtimg1');
        // console.log(divimg[0]);
        //console.log("dimensions")
        const tshirtSize = "XL";
        const dimensions = {
            XL: { width: 2208, height: 3171 },
            '2XL': { width: 2304, height: 3309 },
            L: { width: 1929, height: 2757 },
            M: { width: 2016, height: 2895 },
            // Add more sizes as needed
        };
        const dataUrl = await htmlToImage.toPng(tshirtimg.current);
        
        const resizedDataUrl = await resizeImage(dataUrl, dimensions[tshirtSize].width, dimensions[tshirtSize].height);
        // for(let i in divimg)
        // {
            // console.log(divimg[i]);
          
            // console.log(dataUrl);
             //download image
             const link = document.createElement('a');
             link.download = `tshirtimg.png`;
             link.href = resizedDataUrl;
             link.click();
        // }

       
        // var count = tshirtimg.current.length;
        // console.log(count);
      }

      const resizeImage = (dataUrl, width, height) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/png'));
            };
        });
    };

    const handleDownload = (canvas, fileName,size) => {
        console.log(canvas);
        const dataUrl = canvas.toDataURL('image/png');
        const tshirtSize = size;
        const dimensions = {
            XS: { width: 1824, height: 2620 },
            S: { width: 1920, height: 2757 },
            M: { width: 2016, height: 2895 },
            L: { width: 2112, height: 3033 },
            XL: { width: 2208, height: 3171 },
            '2XL': { width: 2304, height: 3309 },
            '3XL': { width: 2400, height: 3447 },
            '4XL': { width: 2496, height: 3585 },
            '5XL': { width: 2592, height: 3723 },
            '6XL': { width: 2688, height: 3861 },
        };
    
        resizeImage(dataUrl, dimensions[tshirtSize].width, dimensions[tshirtSize].height)
            .then(resizedDataUrl => {
                const link = document.createElement('a');
                link.href = resizedDataUrl;
                link.download = fileName;
                link.click();
            });
    };

     useEffect(()=>{
        
        // var playernamedetails = JSON.parse(localStorage.getItem('playernamedetails'));
        // var playernumberdetails = JSON.parse(localStorage.getItem('playernumberdetails'));
        // console.log(playernamedetails);
        // console.log(playernumberdetails);
        // const canvas = canvasRefName.current;
        // const ctx = canvas.getContext('2d');
       
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.translate(playernamedetails.NametextPosition.x-135, playernamedetails.NametextPosition.y);
        // ctx.rotate((playernamedetails.NamerotationAngle * Math.PI) / 180); // Convert degrees to radians
      
        // ctx.font = `${playernamedetails.NametextSize-20}px ${playernamedetails.NamefontFamily}`
        // ctx.fillStyle = playernamedetails.NametextColor;
        // ctx.strokeStyle = playernamedetails.NameoutlineColor; // Set the outline color
        // ctx.lineWidth = playernamedetails.outlineSize; // Set the outline size
          
        // ctx.strokeText(tshirtdetails[0].name, 0, 0);
        // ctx.fillText(tshirtdetails[0].name, 0, 0);
        // ctx.restore();
        // ctx.save();

        // const canvas1 = canvasRef.current;
        // const ctxnumber = canvas1.getContext('2d');

        // ctxnumber.clearRect(0, 0, canvas.width, canvas.height);
        // ctxnumber.translate(playernumberdetails.textPosition.x-160, playernumberdetails.textPosition.y-100);
        // ctxnumber.rotate((playernumberdetails.rotationAngle * Math.PI) / 180); // Convert degrees to radians
      
        // ctxnumber.font = `${playernumberdetails.textSize}px ${playernumberdetails.fontFamily}`
        // ctxnumber.fillStyle = playernumberdetails.textColor;
        // ctxnumber.strokeStyle = playernumberdetails.outlineColor; // Set the outline color
        // // ctxnumber.lineWidth = playernumberdetails.outlineSize; // Set the outline size
          
        // ctxnumber.strokeText(tshirtdetails[0].number, 0, 0);
        // ctxnumber.fillText(tshirtdetails[0].number, 0, 0);
        // ctxnumber.restore();
        // ctxnumber.save();

      });


   
    return(
        <div id="main-container" className="container-fluid main">

        <Sidebar></Sidebar>
        <section className="home">
            <div className="row mx-2">
                <div className="col-2 page-side">
                    <div className="custom-side">
                        <p className="mt-3 mx-2">Preview</p>

                        <Form.Group controlId="formFile" className="mb-3">
                            <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Medium Size 38 (21 x 29)"
                                readOnly
                            />
                            <InputGroup.Text id="inputGroupAppend">
                            {/* <p className=''>Medium</p> */}
                            </InputGroup.Text>
                            
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Backgroundpattern.jpg"
                                readOnly
                            />
                            <InputGroup.Text id="inputGroupAppend">
                            <FontAwesomeIcon icon={faTrash} className='mx-2' />
                            <img src={addfile}></img>
                            </InputGroup.Text>
                            
                            </InputGroup>
                        </Form.Group>


                        <Form.Select aria-label="Default select example" className="mb-2">
                            <option>Anton</option>
                           
                        </Form.Select>
                    
                        </div>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0" className="mb-2 custom-accordion">
                                <Accordion.Header>Anton</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                    <img src={sidemenu} style={{ width: '90%' , textAlign: 'center'}} />
                                     
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
                        
                    </div>

                    <div className="row mt-5">
                    <div className="col-12 text-center">
                           <h4>Variation Completed - Unleash the Power of Personalisation</h4>
                           <p>With a simple click of the "Create" button, watch as our software auto-generates<br/> a myriad of variations, effortlessly incorporating the selected fonts and Player
                           <br/> details, Experience the power of automation and unleash your creativity.</p>
                            <Button className="px-3 py-1" style={{borderRadius: '30px'}} onClick={downloadImage}> Download All </Button>
                        </div>
                        <div className="container mt-5">
                            <div className="row variation-inner">
                                <div className="col-8">
                                    <h5>{tshirtdetails.length} Variations Created</h5>
                                    <div className='my-5 d-flex justify-content-center ' >
                                    {tshirtdetails && tshirtdetails.map((val, index) => (
                <div key={index} className='col-4 mx-3 alert alert-danger' style={{ position: 'relative' }}>
                    <div className='tshirtimg1'>
                        <svg width="220" height="315" xmlns="http://www.w3.org/2000/svg" >
                            <rect x="40" y="0" width="160" height="315" fill="white" />
                            {selectedImage && <image href={selectedImage} x="0" y="0" width="220" height="315" />}
                            <circle cx="110" cy="-55" r="73" fill="white" />
                        </svg>
                        <canvas
                            ref={(ref) => {
                                if (ref) canvasRef.current[index] = ref;
                            }}
                            width={220}
                            height={315}
                            style={{ position: 'absolute', top: 16, left: 16 }}
                        ></canvas>
                    </div>
                    <div className='mt-3'>
                        <button className='px-3 py-1 me-3' style={{ borderRadius: '30px', backgroundColor: '#9fd3f7', border: '0' }}> Edit</button>
                        <button className='px-3 py-1' style={{ borderRadius: '30px', backgroundColor: '#9fd3f7', border: '0' }} onClick={() => handleDownload(canvasRef.current[index], `tshirt_${index + 1}.png`,val.size)}> Download </button>
                    </div>
                </div>
            ))}     

                                        {/* <div className='col-4 mx-3 alert alert-danger' style={{ position: 'relative' }}>
                                            <svg width="220" height="315" xmlns="http://www.w3.org/2000/svg" >
                                                    <rect x="40" y="0" width="160" height="315" fill="white" />
                                                    {selectedImage && <image href={selectedImage} x="0" y="0" width="220" height="315"/>}
                                                     {/* {backgroundImage && <image href={backgroundImage} x="40" y="0" width="320" height="500" style={{border:'1px solid red;' }}/>} 
                                                    <circle cx="110" cy="-55" r="73" fill="white" />
                                                </svg>
                                                <canvas
                                                    ref={canvasRef}
                                                    width={220}
                                                    height={315}
                                                    style={{ position: 'absolute', top: 16, left: 16 }}
                                                    ></canvas>
                                                <canvas
                                                    ref={canvasRefName}
                                                    width={220}
                                                    height={315}
                                                    style={{ position: 'absolute', top: 16, left: 16}}
                                                ></canvas>
                                            <div className='mt-3'>
                                                <Button className='px-3 py-1 me-3' style={{borderRadius: '30px',  backgroundColor: '#9fd3f7', border:'0'}}> Edit </Button>
                                                <Button className='px-3 py-1' style={{borderRadius: '30px',  backgroundColor: '#9fd3f7', border:'0'}}> Download </Button>
                                            </div>
                                            
                                        </div> */}
                                            
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    </div>
    );
}

export default Export;