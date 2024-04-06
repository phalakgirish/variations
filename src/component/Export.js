import React, { useEffect, useRef, useState } from 'react';
// import CloudmersiveConvertApiClient  from 'cloudmersive-convert-api-client';
import Sidebar from "../component/Sidebar";
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sidemenu from '../assets/img/second-age.png';
import cover from '../assets/img/png2.png';
import addfile from '../assets/img/outline_note_add_black_24dp.png';
import ReactDOMServer from 'react-dom/server';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { getImageSize } from 'react-image-size';
import { faUndo, faRedo, faSearchPlus, faShirt, faList, faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { Stage, Layer, Rect, Circle, Image as KonvaImage, Text } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-bootstrap-icons';
import '../index.css';
import download from '../assets/img/file_download_black_24dp.svg'
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import secureLocalStorage from 'react-secure-storage';
import verifytoken from '../env/verifytoken';


function Export() {
    const navigate = useNavigate();
    var token = secureLocalStorage.getItem('Login')
    if(token == null)
    {
        navigate('/');
    }
    else
    {
        var tokenExpired = verifytoken();
        if(tokenExpired)
        {
            navigate('/')
        }
    }
    const [tshirtvariation, setTshirtvariation] = useState();
    const [tshirtdetails, setTshirtDetails] = useState(JSON.parse(localStorage.getItem('tshirtDetails')));
    // var selectedImage = localStorage.getItem('bgImageDetails');
    const { state } = useLocation();
    var selectedImage = state.selectedImage;
    const [isLoaderShow, setIsLoaderShow] = useState(false)


    // var [imagebg] = useImage(selectedImage)
    var [imagebg] = useImage(state.selectedImage)

    const tshirtimg = useRef();
    
    const [dataURL, setDataURL] = useState([]);


    //    var backgroundImg=localStorage.getItem('bgImageDetails');
    var backgroundImg = state.selectedImage;


    const backgroundImage = backgroundImg; // Replace with your background image URL

    const canvasRef = useRef([]);
    const canvasRefName = useRef([]);
    const downladImage = useRef([]);
    var stagediv = useRef();
    var inputSearch = useRef();
    var ResizeImagediv = useRef();
    const ImgDivRef = useRef([]);


    var tshirtchangedetails = JSON.parse(localStorage.getItem('tshirtchangedetails'));


    const drawTextOnCanvas = (text, number, canvas, index) => {
        if (canvas) {

            var playernamedetails = JSON.parse(localStorage.getItem('playernamedetails'));
            var playernumberdetails = JSON.parse(localStorage.getItem('playernumberdetails'));

            var changedData = []

            if (tshirtchangedetails != null) {
                changedData = tshirtchangedetails.filter((item) => item.indexSr == index);

                if (changedData.length != 0) {
                    playernamedetails = changedData[0].playernamedetails;
                    playernumberdetails = changedData[0].playernumberdetails;
                }
            }

            const stage = canvas;
            // console.log(stage);
            //  stage.children = [];
            const layer = new Konva.Layer();
            //  console.log(layer);
            // var image = new Konva.Image({
            //     x:0,
            //     y:0,
            //     image:selectedImage,
            //     width:220,
            //     height:315
            // })
            // layer.add(image);

            var text1 = new Konva.Text({
                x: (playernamedetails.NametextPositionPer.x * canvas.attrs.width) / 100,
                y: (playernamedetails.NametextPositionPer.y * canvas.attrs.height) / 100,
                text: text,
                fontSize: ((playernamedetails.NametextSizePer * canvas.attrs.width) / 100),
                fontFamily: playernamedetails.NamefontFamily,
                fill: playernamedetails.NametextColor,
                stroke: playernamedetails.NameoutlineColor,
                strokeWidth: (playernamedetails.NametextBorderPer * canvas.attrs.width) / 100,
                align: 'center',
                width: (playernamedetails.NameWidthPer * canvas.attrs.width) / 100,
                rotation: playernamedetails.NamerotationAngle,
                scaleX: playernamedetails.NameScale.x,
                scaleY: playernamedetails.NameScale.y
            });

            layer.add(text1);

            var text2 = new Konva.Text({
                x: (playernumberdetails.textPositionPer.x * canvas.attrs.width) / 100,
                y: (playernumberdetails.textPositionPer.y * canvas.attrs.height) / 100,
                text: number,
                fontSize: ((playernumberdetails.textSizePer * canvas.attrs.width) / 100),
                fontFamily: playernumberdetails.fontFamily,
                fill: playernumberdetails.textColor,
                stroke: playernumberdetails.outlineColor,
                strokeWidth: (playernumberdetails.NotextBorderPer * canvas.attrs.width) / 100,
                align: 'center',
                width: (playernumberdetails.NoWidthPer * canvas.attrs.width) / 100,
                rotation: playernumberdetails.rotationAngles,
                scaleX: playernumberdetails.NoScale.x,
                scaleY: playernumberdetails.NoScale.y
            });

            layer.add(text2);



            stage.add(layer);
        }
    };

    useEffect(() => {
        // canvasRef.destroy();

        if (tshirtdetails) {
            tshirtdetails.forEach((val, index) => {
                drawTextOnCanvas(val.name, val.number, canvasRef.current[val.indexSr], val.indexSr);
                // drawTextOnCanvas(`${val.name}`, canvasRef.current[index]);
                // drawTextOnCanvas(`${val.number}`, canvasRef.current[index]);
            });
        }

    }, [tshirtdetails]);
    const downloadImage = async () => {

        // var divimg = document.querySelectorAll('.tshirtimg1');
        // const tshirtSize = "XL";
        // const dimensions = {
        //     XL: { width: 2208, height: 3171 },
        //     '2XL': { width: 2304, height: 3309 },
        //     L: { width: 1929, height: 2757 },
        //     M: { width: 2016, height: 2895 },
        //     // Add more sizes as needed
        // };
        // const dataUrl = await htmlToImage.toPng(tshirtimg.current);

        // const resizedDataUrl = await resizeImage(dataUrl, dimensions[tshirtSize].width, dimensions[tshirtSize].height);
        // // for(let i in divimg)
        // // {
        //     // console.log(divimg[i]);

        //     // console.log(dataUrl);
        //      //download image
        //      const link = document.createElement('a');
        //      link.download = `tshirtimg.png`;
        //      link.href = resizedDataUrl;
        //      link.click();
        // }


        // var count = tshirtimg.current.length;
        // console.log(count);
        setIsLoaderShow(true);
        for (let i in tshirtdetails) {
            handleDownload(canvasRef.current[tshirtdetails[i].indexSr], `${tshirtdetails[i].size}_${tshirtdetails[i].name}_${tshirtdetails[i].number}.jpeg`, tshirtdetails[i].size, tshirtdetails[i].indexSr, i,'zip');
        }
        // convertBase64ToZip(dataURL)

        setTimeout(()=>{
            // console.log(listObj_data);
            convertBase64ToZip(listObj_data);
        },3000)
        

    }

    const convertBase64ToZip = async (base64String) => {
        try {
            const zip = new JSZip();
            const folder = zip.folder('tshirt_variation');  // create a folder in the ZIP file
            // console.log(base64String);
            // Convert Base64 string to Blob
            for(let val of base64String)
            {
                // console.log(val);
                const byteCharacters = atob(val.baseString.split(',')[1]);
                const byteArrays = [];
        
                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);
        
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
        
                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }
        
                const blob = new Blob(byteArrays, { type: 'image/jpeg' });
        
                // Add the Blob to the ZIP folder
                await folder.file(val.fileName, blob);
                setIsLoaderShow(false);
            }
            
    
            // Generate the ZIP file
            const zipBlob = await zip.generateAsync({ type: 'blob' });
    
            // // Save the ZIP file
            saveAs(zipBlob, 'tshirt_variation.zip');
    
        } catch (error) {
            console.error('Error converting Base64 to ZIP:', error);
        }
    };

    const Loader = () => {
        const [isLoading, setIsLoading] = useState(true);
      
        // Simulate loading effect with useEffect
        useEffect(() => {
        //   const timer = setTimeout(() => {
        //     setIsLoading(false);
        //   }); // Simulates 3 seconds of loading
      
        //   return () => clearTimeout(timer);
        }, []);
      
        if (isLoading) {
          return (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          );
        }
      };

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
    const [bgimage] = useImage(backgroundImg);
    const drawResizeStage = (indexSr, index, width, height) => {
        // console.log(index, width, height);
        var playernamedetails = JSON.parse(localStorage.getItem('playernamedetails'));
        var playernumberdetails = JSON.parse(localStorage.getItem('playernumberdetails'));
        var changedData = []

        if (tshirtchangedetails != null) {
            changedData = tshirtchangedetails.filter((item) => item.indexSr == indexSr);
            console.log(changedData);
            if (changedData.length != 0) {
                playernamedetails = changedData[0].playernamedetails;
                playernumberdetails = changedData[0].playernumberdetails;

                console.log(playernamedetails, playernumberdetails);
            }
        }

        const LoadImage = () => {
            const [image] = useImage(backgroundImg);
            return <KonvaImage image={image} width={width} height={height} />;
        };

        // var convertedwidth = width;
        // var convertedheight = height;
        var convertedwidth = ((width * 100) / 24);
        var convertedheight = ((height * 100) / 24);
        stagediv.current.attrs.width = convertedwidth;
        stagediv.current.attrs.height = convertedheight;
        // console.log(stagediv);
        var stage = stagediv.current
        //https://codepen.io/AudreyRBC/pen/MzmLYx 
        //http://www.javascripter.net/faq/hex2cmyk.htm
        var layer = new Konva.Layer();
        var image = new Konva.Image({
            x: 0,
            y: 0,
            image: bgimage,
            width: convertedwidth,
            height: convertedheight
        })
        layer.add(image);

        var text1 = new Konva.Text({
            x: (playernamedetails.NametextPositionPer.x * convertedwidth) / 100,
            y: (playernamedetails.NametextPositionPer.y * convertedheight) / 100,
            text: tshirtdetails[index].name,
            fontSize: ((playernamedetails.NametextSizePer * convertedwidth) / 100),
            fontFamily: playernamedetails.NamefontFamily,
            fill: playernamedetails.NametextColor,
            stroke: playernamedetails.NameoutlineColor,
            strokeWidth: (playernamedetails.NametextBorderPer * convertedwidth) / 100,
            align: 'center',
            width: (playernamedetails.NameWidthPer * convertedwidth) / 100,
            rotation: playernamedetails.NamerotationAngle,
            scaleX: playernamedetails.NameScale.x,
            scaleY: playernamedetails.NameScale.y
        })

        layer.add(text1);
        var text2 = new Konva.Text({
            x: (playernumberdetails.textPositionPer.x * convertedwidth) / 100,
            y: (playernumberdetails.textPositionPer.y * convertedheight) / 100,
            text: tshirtdetails[index].number,
            fontSize: ((playernumberdetails.textSizePer * convertedwidth) / 100),
            fontFamily: playernumberdetails.fontFamily,
            fill: playernumberdetails.textColor,
            stroke: playernumberdetails.outlineColor,
            strokeWidth: (playernumberdetails.NotextBorderPer * convertedwidth) / 100,
            align: 'center',
            width: (playernumberdetails.NoWidthPer * convertedwidth) / 100,
            rotation: playernumberdetails.rotationAngles,
            scaleX: playernumberdetails.NoScale.x,
            scaleY: playernumberdetails.NoScale.y
        })

        layer.add(text2);
        stage.add(layer);


        return (stagediv.current);

    }



    var listObj_data = []
    const handleDownload = (canvas, fileName, size, indexSr, index,file_type) => {
        // console.log(stagediv);

        // var canvasHtml = await html2canvas(stagediv.current,{scale:3});
        // const dataUrl = canvasHtml.toDataURL();
        // const dataUrl = await htmlToImage.toPng(canvas,{ cacheBust: false });
        const tshirtSize = size;
        // const dimensions = {
        //     XS: { width: 1824, height: 2620 },
        //     S: { width: 1920, height: 2757 },
        //     M: { width: 2016, height: 2895 },
        //     L: { width: 2112, height: 3033 },
        //     XL: { width: 2208, height: 3171 },
        //     '2XL': { width: 2304, height: 3309 },
        //     '3XL': { width: 2400, height: 3447 },
        //     '4XL': { width: 2496, height: 3585 },
        //     '5XL': { width: 2592, height: 3723 },
        //     '6XL': { width: 2688, height: 3861 },
        // };

        const dimensions = {                         // 24     66              
            XS: { width: 1386.96, height: 1945.72 },//455.04 674.28
            S: { width: 1440.96, height: 2016.72 }, //479.04 740.28
            M: { width: 1512.96, height: 2088.72 }, //503.04 806.28
            L: { width: 1584.96, height: 2160.72 }, //527.04 872.28
            XL: { width: 1656.96, height: 2232.72 },//551.04 938.28
            '2XL': { width: 1728.96, height: 2304.72 },//575.04 1004.28
            '3XL': { width: 1800.96, height: 2376.72 },//599.04 1070.28
            '4XL': { width: 1872.96, height: 2448.72 },//623.04 1136.28
            '5XL': { width: 1944.96, height: 2520.72 },//647.04 1202.28
            '6XL': { width: 2016.96, height: 2592.72 },//671.04 1268.28
        };



        var stageRsize = drawResizeStage(indexSr, index, dimensions[tshirtSize].width, dimensions[tshirtSize].height);
        // console.log(stageRsize.toDataURL());


        //  var stageRsize = <drawResizeStage index={index} width={dimensions[tshirtSize].width} height={dimensions[tshirtSize].height}/>

        var stageDataURL = stageRsize.toDataURL();
        // var dimensions1 = await getImageSize(stageDataURL);
        // console.log(dimensions1);
        // var callback = (error,data,response) =>{}

        const generateImage = async (canvas, stageRsize, fileName) => {
            // Use html2canvas to capture the content and convert it to an image
            // console.log(image);
            // console.log(stagediv.current);
            await html2canvas(canvas, {
                scale: 3, // Set scale to 3 to achieve 300 DPI (300/72)
            }).then((canvas) => {
                // Convert canvas to base64 data URL
                //   console.log(canvas);
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                console.log(imgData);
                // Create a link to download the image
                const link = document.createElement('a');
                link.download = fileName;
                link.href = imgData;
                link.click();
            });
        };

        const resizeImage = (stageDataURL, maxWidth, maxHeight, fileName,file_type) => {
            // return new Promise((resolve) => {
            let img = new Image()
            img.src = stageDataURL
            img.onload = () => {
                let canvas = document.createElement('canvas')
                const MAX_WIDTH = maxWidth
                const MAX_HEIGHT = maxHeight
                let width = img.width
                let height = img.height

                // if (width > height) {
                //   if (width > MAX_WIDTH) {
                //     height *= MAX_WIDTH / width
                //     width = MAX_WIDTH
                //   }
                // } else {
                //   if (height > MAX_HEIGHT) {
                //     width *= MAX_HEIGHT / height
                //     height = MAX_HEIGHT
                //   }
                // }

                // var dpiWidth = (width / 96) * 300;
                // var dpiheight = (height / 96) * 300
                // canvas.width = width 
                // canvas.height = height

                //GIRISH CODE
                const aspectRatio = img.width / img.height;
                const targetWidth = 1440;
                const targetHeight = targetWidth / aspectRatio;

                // Set the size of the canvas
                // canvas.width = targetWidth;
                // canvas.height = targetHeight;
                canvas.width = width;
                canvas.height = height;


                let ctx = canvas.getContext('2d')
                // ctx.scale(300/96,300/96);
                // ctx.drawImage(img, 0, 0, width, height)
                // ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // resolve(canvas.toDataURL())
                // console.log(canvas.toDataURL('image/jpeg'));
                // var canvasHtml = html2canvas(canvas,{scale:3});
                // const dataUrl = await htmlToImage.toPng(canvas,{ cacheBust: false,scale:3 });
                if(file_type == 'single')
                {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/jpeg', 1.0);
                    link.download = fileName;
                    link.click();
                }
                else
                {
                    var canvasDataURL = canvas.toDataURL('image/jpeg', 1.0);
                    var new_obj = {fileName:fileName,baseString:canvasDataURL}
                    // console.log(new_obj);
                    listObj_data = [...listObj_data,new_obj];
                    // console.log(listObj_data);
                    // setDataURL(DataUrls)
                }
                
            }
            // })
        }

        resizeImage(stageDataURL, dimensions[tshirtSize].width, dimensions[tshirtSize].height, fileName,file_type);
        //   console.log(imagedataurl);
        //         const link = document.createElement('a');
        //         link.href = imagedataurl;
        //         link.download = fileName;
        //         link.click();

        stagediv.current.children = [];
        // console.log(stagediv.current);

    };

    const handelInputsearch = () => {

        // console.log(inputSearch.current.value);
        if (inputSearch.current.value != '') {
            // canvasRef.current= [];
            var excelData = JSON.parse(localStorage.getItem('tshirtDetails'));
            // console.log(excelData);
            // var filterData = excelData.filter((item,index)=>(item.name === inputSearch.current.value || item.number === parseInt(inputSearch.current.value)))
            var searchvalue = inputSearch.current.value;
            var filterData = excelData.filter((item, index) => (item.name.toLowerCase().includes(searchvalue.toLowerCase()) || item.number.toString().includes(inputSearch.current.value)))
            // console.log(filterData);
            // setTshirtDetails(filterData);
            for (let val of excelData) {
                if (filterData.length > 0) {
                    // console.log(ImgDivRef.current[filterData[0].indexSr]);
                    var searchdata = filterData.filter(item => item.indexSr == val.indexSr)
                    // console.log(dts);
                    // console.log(val.indexSr);
                    // if(dts.indexSr !== val.indexSr)
                    if (searchdata.length == 0) {
                        ImgDivRef.current[val.indexSr].className = 'col-xl-3 col-3 hideimage'
                        // console.log(ImgDivRef.current[val.indexSr]);
                    }
                    else {
                        ImgDivRef.current[val.indexSr].className = 'col-xl-3 col-3'
                    }
                }
                else {
                    ImgDivRef.current[val.indexSr].className = 'col-xl-3 col-3 hideimage'
                }
            }


        }
        else {

            var filterData = JSON.parse(localStorage.getItem('tshirtDetails'))

            for (let val of filterData) {

                ImgDivRef.current[val.indexSr].className = 'col-xl-3 col-3'

            }

            // setTshirtDetails(filterData);

        }

    }


    return (
        <div id="main-container" className="container-fluid main">
            {isLoaderShow && (
                <Loader />
            )}
            <Sidebar></Sidebar>
            <section className="home" style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
                <div className="row mx-2">
                    <div className="col-12">
                        <div className="row tab mt-3">
                            <ul className="d-flex col-6 custom-tabs">
                                <li className="" onClick={() => { navigate('/Design', { state: { selectedImage: selectedImage,side:state.side } }) }}>Design</li>
                                <li className="mx-2" onClick={() => { navigate('/Variation', { state: { selectedImage: selectedImage,side:state.side } }) }}>Variation</li>
                                <li className="mx-2 active" onClick={() => { navigate('/Export', { state: { selectedImage: selectedImage,side:state.side } }) }}>Export</li>
                            </ul>

                        </div>

                        <div className="row mt-5">
                            <div className="col-12 text-center">
                                <h4>Variation Completed - Unleash the Power of Personalisation</h4>
                                <p>With a simple click of the "Create" button, watch as our software auto-generates<br /> a myriad of variations, effortlessly incorporating the selected fonts and Player
                                    <br /> details, Experience the power of automation and unleash your creativity.</p>
                                    <Button className="px-3 py-1" style={{ borderRadius: '30px' }} onClick={downloadImage}><img src={download} alt="download" style={{ width: '20px' }} />
                                    Download All </Button>
                            </div>
                            <div className="container mt-5">
                                <div className="row justify-content-center">
                                    <div className="col-lg-10" style={{ backgroundColor: '#F9FAFD', paddingLeft: "30px", paddingTop: "10px" }}>
                                        <div className='row mt-4'>
                                            <h5 style={{ width: '30%' }}>{tshirtdetails && tshirtdetails.length} Variations Created</h5>
                                            <div className='' style={{ width: '40%', alignItems: 'right' }}>
                                            </div>
                                            <div className='' style={{ width: '30%', alignItems: 'right', display: 'flex' }}>
                                                <div style={{ width: '12%', padding: '10px 5px 0 5px', backgroundColor: '#EAEEF8', borderRadius: "20px 0 0 20px" }}><FontAwesomeIcon icon={faMagnifyingGlass} className='mx-2' /></div>
                                                <input ref={inputSearch} type='text' placeholder='Search all files' className='export-variation-search' onChange={() => { handelInputsearch(); }} />
                                            </div>
                                        </div>
                                        <div className='my-5 col-12 justify-content-center ' >
                                            <div className='row'>
                                                {tshirtdetails && tshirtdetails.map((val, index) => (

                                                    <div key={index} className='col-xl-3 col-md-3 col-lg-3 col-3' style={{ position: 'relative', paddingLeft: '10px', marginBottom: '25px' }}
                                                        ref={(ref) => {
                                                            if (ref) ImgDivRef.current[val.indexSr] = ref;
                                                        }}>
                                                        <div className='tshirtimg1' ref={(ref) => {
                                                            if (ref) downladImage.current[val.indexSr] = ref;
                                                        }}>
                                                            <svg width="220" height="315" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "10px" }}>
                                                                {/* <rect x="40" y="0" width="160" height="315" fill="white" /> */}
                                                                {selectedImage && <image href={selectedImage} width="220" height="315" preserveAspectRatio="xMidYMid slice" />}
                                                                {/* <circle cx="110" cy="-55" r="73" fill="white" /> */}
                                                            </svg>
                                                            {/* <canvas
                            ref={(ref) => {
                                if (ref) canvasRef.current[index] = ref;
                            }}
                            width={220}
                            height={315}
                            style={{ position: 'absolute', top: 16, left: 16 }}
                        ></canvas> */}
                                                            <Stage ref={(ref) => {
                                                                if (ref) canvasRef.current[val.indexSr] = ref;
                                                            }}
                                                                width={220}
                                                                height={315}
                                                                style={{ position: 'absolute', top: 0, left: 10, border: '0px solid #000', borderRadius: "10px" }}></Stage>
                                                        </div>
                                                        <div className='mt-3'>
                                                            <button className='px-3 py-1 me-3' style={{ borderRadius: '30px', backgroundColor: '#9fd3f7', border: '0' }} onClick={() => { navigate('/EditDesign', { state: { indexSr: val.indexSr, selectedImage: selectedImage,side:state.side } }) }}> Edit</button>
                                                            <button className='px-3 py-1' style={{ borderRadius: '30px', backgroundColor: '#9fd3f7', border: '0' }} onClick={() => handleDownload(downladImage.current[val.indexSr], `${val.size}_${val.name}_${val.number}.jpeg`, val.size, val.indexSr, index,'single')}> Download </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="stagediv" className='container' style={{ visibility: 'hidden', display: 'none' }} ref={ResizeImagediv}>
                    <Stage ref={stagediv}></Stage>
                </div>

            </section>
        </div>
    );
}

export default Export;