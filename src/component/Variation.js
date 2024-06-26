import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Sidebar from "../component/Sidebar";
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sidemenu from '../assets/img/second-age.png';
import switchImage from '../assets/img/switch_access_shortcut_black_24dp.svg';
import fronttshirt from '../assets/img/Plain TeeShirt.png';
import * as XLSX from 'xlsx';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import { useForm } from 'react-hook-form';
import { Stage, Layer, Rect, Circle, Image as KonvaImage, Text, Shape } from 'react-konva';
import Konva from 'konva';
import excelDownloadUrl from '../assets/sampleSheet.xlsx';
import secureLocalStorage from 'react-secure-storage';
import { faUndo, faRedo, faSearchPlus, faShirt, faList, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-bootstrap-icons';
import useImage from 'use-image';
import verifytoken from '../env/verifytoken';

function Variation() {
    var fileRecord = null;
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
    const [filedata, setFileData] = useState(null);
    const [fileStatus, setFileStatus] = useState(false);
    const [errmsg, setErrmsg] = useState(" ");
    const [errFile, setErrFile] = useState(false);
    const [excelFileType, setExcelFileType] = useState(false);
    const [excelFile, setExcelFile] = useState(null);
    const [excelData, setExcelData] = useState(null);
    const message = useRef();
    
    const fileInputField = useRef();
    const { state } = useLocation();
    // console.log(state);
    const [NametextSize, setNameTextSize] = useState('32');
    const [NamefontFamily, setNameFontFamily] = useState('Arial');
    const [tshirtSize, settshirtSize] = useState('M');
    const [NametextPosition, setNameTextPosition] = useState({ x: 200, y: 150 }); // Initial position
    const [NametextColor, setNameTextColor] = useState('#808080'); // Default color
    const [NameoutlineColor, setNameOutLineColor] = useState('#00000');
    const [NamerotationAngle, setNameRotationAngle] = useState(0);
    const [NofontFamily, setNofontFamily] = useState('');
    const [BgName, setBgName] = useState('');
    const [RemovedRow, setremovedRow] = useState([]);
    const [renderingTime, setRenderingTime] = useState(null);
    const [localStorageValue, setLocalStorageValue] = useState('');
    const [isSaveDisabled, setSaveDisabled] = useState(true);
    const [generateDisable, setGenerateDisable] = useState(true)
    var CharCount = {}

    // var selectedImage = localStorage.getItem('bgImageDetails');
    var selectedImage = state.selectedImage;
    const NameRef = useRef(Array(10).fill(null));
    const NumberRef = useRef(Array(3).fill(null));
    const SizeRef = useRef([]);

    const dimensions = {                         // 24     66              
        'XS': { width: 1386.96, height: 1945.72 },//455.04 674.28
        'S': { width: 1440.96, height: 2016.72 }, //479.04 740.28
        'M': { width: 1512.96, height: 2088.72 }, //503.04 806.28
        'L': { width: 1584.96, height: 2160.72 }, //527.04 872.28
        'XL': { width: 1656.96, height: 2232.72 },//551.04 938.28
        '2XL': { width: 1728.96, height: 2304.72 },//575.04 1004.28
        '3XL': { width: 1800.96, height: 2376.72 },//599.04 1070.28
        '4XL': { width: 1872.96, height: 2448.72 },//623.04 1136.28
        '5XL': { width: 1944.96, height: 2520.72 },//647.04 1202.28
        '6XL': { width: 2016.96, height: 2592.72 },//671.04 1268.28
    };

    const canvasRef = useRef(null);

    const LoadBGImage = () => {
        const [image] = useImage(selectedImage);
        // image.width = 320;
        // image.height = 500;
        return <KonvaImage image={image} width={220} height={315} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} x={56} />

        // return <Shape sceneFunc={(context, shape)=>{context.beginPath();
        //     context.moveTo(48, 6);
        //     context.quadraticCurveTo(100, 27, 153, 5);
        //     // context.lineTo(220, 50);
        //     context.lineTo(203, 20);
        //     context.lineTo(203, 315);
        //     context.lineTo(0, 500);
        //     context.lineTo(0, 23);
        //     context.closePath();
        //     context.fillStrokeShape(shape);}} strokeWidth={1} fillPatternImage={image} fillPatternScale={{x:0.41,y:0.44}} style={{ position: 'absolute', top: 0, left: 0,zIndex:0 }} x={56}></Shape>;

    }

    const LoadImage = () => {
        const [image] = useImage(fronttshirt);
        return <KonvaImage image={image} width={315} height={315} />;
    };

    const drawTextOnCanvas = (canvas) => {
        if (canvas) {

            var playernamedetails = JSON.parse(localStorage.getItem('playernamedetails'));
            var playernumberdetails = JSON.parse(localStorage.getItem('playernumberdetails'));
            //  console.log(playernumberdetails.textColor);

            const stage = canvas;
            // console.log(stage);

            const layer = new Konva.Layer();

            var text1 = new Konva.Text({
                x: (playernamedetails.NametextPositionPer.x * canvas.attrs.width) / 100,
                y: (playernamedetails.NametextPositionPer.y * canvas.attrs.height) / 100,
                text: playernamedetails.Name,
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
                text: playernumberdetails.No,
                fontSize: ((playernumberdetails.textSizePer * canvas.attrs.width) / 100),
                fontFamily: playernumberdetails.fontFamily,
                fill: playernumberdetails.textColor,
                stroke: playernumberdetails.outlineColor,
                strokeWidth: (playernumberdetails.NotextBorderPer * canvas.attrs.width) / 100,
                align: 'center',
                width: (playernumberdetails.NoWidthPer * canvas.attrs.width) / 100,
                rotation: playernumberdetails.rotationAngle,
                scaleX: playernumberdetails.NoScale.x,
                scaleY: playernumberdetails.NoScale.y
            });

            layer.add(text2);

            stage.add(layer);

        }
    };

    useEffect(() => {
        var playernamedetails = JSON.parse(localStorage.getItem('playernamedetails'));
        var playernumberdetails = JSON.parse(localStorage.getItem('playernumberdetails'));
        var tshirtSizeSelected = localStorage.getItem('tshirtSize');
        var imgname = localStorage.getItem('bgname')
        // console.log(playernamedetails);
        setNameFontFamily(playernamedetails.NamefontFamily);
        setNameTextSize(playernamedetails.NametextSize);
        settshirtSize(tshirtSizeSelected);
        setBgName(imgname);
        setNofontFamily(playernumberdetails.fontFamily)
        drawTextOnCanvas(canvasRef.current);

    });
    useEffect(() => {
        var tshirtDetails = JSON.parse(localStorage.getItem('tshirtDetails'));
        // console.log(tshirtDetails);
        if (tshirtDetails != null) {
            setExcelData(tshirtDetails);
            // for(let val of tshirtDetails)
            // {
            //     // console.log(val);
            //     CharCount[val.indexSr] = {namecount:val['name'].length,nambercount:(val['number'].toString()).length}
            //     console.log(CharCount);
            // }
            setCount(tshirtDetails.length);
            setAppendingRow([]);
            setVariationCount(tshirtDetails.length);
            setGenerateDisable(false)
            // console.log(tshirtDetails);
        }
    }, [])
    const [appendingRow, setAppendingRow] = useState([1]);
    const list = [];
    const [count, setCount] = useState(1);
    const [variationcount, setVariationCount] = useState(0);
    const [charCount, setCharCount] = useState(Array(10).fill(0));
    const [numCount, setNumCount] = useState(Array(3).fill(0));

    const handleInputTextChange = (event, index) => {
        const inputValue = event.target.value;
        const newCharCounts = [...charCount];
        newCharCounts[index] = inputValue.length;
        setCharCount(newCharCounts);
        handleInputChange();
    };


    const handleInputNumbeChange = (event, index) => {
        const inputValue = event.target.value;
        const newNumCounts = [...numCount];
        newNumCounts[index] = inputValue.length;
        setNumCount(newNumCounts);
        handleInputChange();
    };

    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    };

    const { register, formState: { errors }, handleSubmit, unregister, reset } = useForm();
    var selectFile = (ev) => {
        console.time('selectFile'); // Start measuring rendering time
        const startTime = performance.now(); // Define startTime
        // console.log(ev.target.files[0]);
        if (ev.target.files[0] === undefined || ev.target.files[0] === null) {
            setFileStatus(false);
        }
        else {
            setFileStatus(true);
            setErrFile(false);
            // setFileRecord(ev.target.files[0])
            fileRecord = ev.target.files[0]
            // console.log(fileRecord);
            setFileData(fileRecord)

            const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];

            if (fileTypes.includes(fileRecord.type)) {
                setExcelFileType(true);
                message.current.className = '';
                setErrmsg('');

                let reader = new FileReader();
                reader.readAsArrayBuffer(fileRecord);
                reader.onload = (ev) => {
                    // setExcelFile(ev.target.result);
                    // console.log(ev.target.result);
                    const workbook = XLSX.read(ev.target.result, { type: 'buffer' });
                    // console.log(workbook);
                    const workSheetName = workbook.SheetNames[0];
                    // console.log(workSheetName);
                    const worksheet = workbook.Sheets[workSheetName];
                    // console.log(worksheet);
                    const data = XLSX.utils.sheet_to_json(worksheet);
                    // console.log(data);
                    setCount(data.length);
                    setVariationCount(data.length);
                    setAppendingRow([]);
                    setExcelData(data);
                    setremovedRow([]);
                    var dataToPost = []
                    var index = 0;
                    for (let val of data) {
                        // if(data['name'][i] != "" && data['size'][i] != "")
                        {
                            dataToPost = [...dataToPost, { indexSr: index + 1, name: val['name'], number: val['number'], size: val['size'] }];
                            // CharCount = [...CharCount,{indexsr:index+1,namecount:val['name'].length,numbercount:val['number'].length}]
                            CharCount[index+1] = {namecount:val['name'].length,numbercount:(val['name'].toString()).length};
                            index = index + 1
                        }
                        // console.log(CharCount);



                    }
                    const endTime = performance.now();
                    const elapsedMilliseconds = endTime - startTime;
                    const elapsedSeconds = elapsedMilliseconds / 1000;
                    setRenderingTime(elapsedSeconds);

                    // console.timeEnd('selectFile');
                    // console.log(dataToPost);
                    localStorage.setItem('tshirtDetails', JSON.stringify(dataToPost))
                    setGenerateDisable(false);
                    const tshirtDetails = localStorage.getItem('tshirtDetails');
                    setLocalStorageValue(tshirtDetails);
                };
            }
            else {
                setExcelFileType(false);
                setExcelData(null);
                console.timeEnd('selectFile'); // End measuring rendering time
                message.current.className = 'alert alert-danger upload-error';
                setErrmsg('Please Select Only Excel File Types.');
                console.timeEnd('selectFile');
            }



        }
    }
    useLayoutEffect(() => {
        const startTime = new Date();
        return () => {
            const endTime = new Date();
            const timeRendered = endTime - startTime;
            // console.log(typeof timeRendered); // Expect this to be a positive number
        };
    }, []);
    var addRow = (ev) => {
        // ev.preventDefault();
        console.log(count);
        console.log();
        const updatedList = [...appendingRow, count + 1];
        setAppendingRow(updatedList);
        console.log(updatedList);
        setCount(count => count + 1);
        setVariationCount(variationcount => variationcount + 1);
        setGenerateDisable(true)

    }


    var removeAddedRow = (ev, val) => {
        console.log(val);
        var removed_row = [...RemovedRow, parseInt(val)]
        setremovedRow(removed_row);
        const currentTarget = ev.currentTarget.getAttribute("for");
        console.log(currentTarget);
        document.getElementById(currentTarget).remove();
        setVariationCount(variationcount => variationcount - 1);
        setSaveDisabled(false)
        setGenerateDisable(true)
    };

    var removeExcelRow = (ev, id) => {
        {
            const list = [...excelData];
            var removed_row = [...RemovedRow, parseInt(id)]
            setremovedRow(removed_row);
            // document.getElementById(currentTarget).remove();
            console.log(list);
            console.log(id);
            const result1 = list.filter(items => items.__rowNum__ != id);
            const result = result1.filter(items => items.indexSr != id);
            console.log(result);
            setExcelData((result.length == 0) ? null : result);
            setVariationCount(variationcount => variationcount - 1);
            setSaveDisabled(false);
            setGenerateDisable(true)

        }

    }
    useEffect(() => { 
        
        // console.log(excelData); 
    }, [excelData])

    var upload_data = (e) => {
        e.preventDefault();
        // console.log(typeof excelData);
        localStorage.removeItem('tshirtDetails')
        console.log(NameRef.current);
        var dataToPost = [];
        console.log(RemovedRow);
        for (let i in NameRef.current) {
            console.log(i);
            var indexNo = RemovedRow.indexOf(parseInt(i));
            console.log(indexNo);
            if (i != 0 && indexNo == -1) {
                const inputRef = NameRef.current[i];
                if (inputRef && inputRef.value !== "" && SizeRef.current[i].value != "") {
                    dataToPost = [...dataToPost, { indexSr: i, name: inputRef.value, number: NumberRef.current[i].value, size: SizeRef.current[i].value }];
                    //    index = index + 1
                }
            }
        }
        // console.log(data);
        // var dataToPost = []
        // var index = 0;
        // for (let i in data['name']) {
        //     if (data['name'][i] != "" && data['size'][i] != "") {
        //         dataToPost = [...dataToPost, { indexSr: index + 1, name: data['name'][i], number: data['number'][i], size: data['size'][i] }];
        //         index = index + 1
        //     }



        // }
        console.log(dataToPost);
        localStorage.setItem('tshirtDetails', JSON.stringify(dataToPost))
        setSaveDisabled(true)
        const tshirtDetails = localStorage.getItem('tshirtDetails');
        setLocalStorageValue(tshirtDetails);
        setGenerateDisable(false)
    }
    useEffect(() => {
        const tshirtDetails = localStorage.getItem('tshirtDetails');
        setLocalStorageValue(tshirtDetails);
    }, []);

    var isDisabled = localStorageValue === '[]' || localStorageValue === '' || !localStorageValue;

    const handleInputChange = () => {
        const inputs = document.querySelectorAll('.tshirt-variant-data input, .tshirt-variant-data select');
        let isEmpty = false;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isEmpty = true;
            }
        });

        setSaveDisabled(isEmpty);
        setGenerateDisable(true);
    };

    return (
        <div id="main-container" className="container-fluid main">

            <Sidebar></Sidebar>
            <section className="home">
                <div className="row mx-2">
                    <div className="col-3 page-side">
                        <div className="custom-side">
                            <p className="side-title">preview</p>

                            <input className="mb-2 form-control"
                                type="text"
                                placeholder={`Selected Size: ${tshirtSize}`}
                                readOnly
                            />

                            <input className="mb-2 form-control"
                                type="text"
                                placeholder={`Selected Image: ${BgName}`}

                                readOnly
                            />

                            <input
                                className="mb-2 form-control"
                                type="text"
                                placeholder={`Name Font: ${NamefontFamily}`}
                                readOnly
                            />
                            <input className="mb-2 form-control"
                                type="text"

                                placeholder={`No Font: ${NofontFamily}`}
                            />
                        </div>

                        {/* <img src={sidemenu} style={{ width: '100%' , textAlign: 'center'}} /> */}
                        <div style={{ position: 'relative' }}>
                            <Stage width={315} height={315} className='stage1'>
                                <Layer>
                                    {/* <LoadImage /> */}
                                    {selectedImage && <LoadBGImage x={285} />}
                                </Layer>
                            </Stage>
                            <Stage width={220} height={315} className='stage2' ref={canvasRef}></Stage>
                        </div>

                    </div>

                    <div className="col-9">
                        <div className="row tab mt-3">
                            <ul className="d-flex col-6 custom-tabs">
                                <li className="" onClick={() => { navigate('/Design', { state: { selectedImage: selectedImage,side:state.side } }) }}>Design</li>
                                <li className="mx-2 active" onClick={() => { navigate('/Variation', { state: { selectedImage: selectedImage,side:state.side } }) }}>Variation</li>
                                <li className="mx-2" onClick={() => { navigate('/Export', { state: { selectedImage: selectedImage,side:state.side } }) }}>Export</li>
                            </ul>
                            <div className="col-6 custom-btn">
                                <Button onClick={() => { navigate('/Export', { state: { selectedImage: selectedImage } }) }} className="float-end " variant="primary" disabled={generateDisable}>
                                    <img src={switchImage} alt="home" style={{ width: '25px' }} /> Generate
                                </Button>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-12 text-center">
                                <h4 className='h-variation'>Maintain Excel</h4>
                                <p className='p-variation'>Efficient input all player name and number details into <br /> the Excel.Our user-friendly system ensures accuracy <br /> and saves you valuable time.</p>
                                {/* <Button className="px-3 py-1" style={{borderRadius: '30px', backgroundColor:'#2b2b5e'}} type="file" > Upload Excel </Button> */}
                                <div className='upload-excel-div'>
                                    <input type="file" id="uploadbtn" className='upload_excel_input' ref={fileInputField} onChange={selectFile} />
                                    <lable type="file" for="uploadbtn" className='upload_excel_lable' onClick={() => fileInputField.current.click()}>Upload Excel</lable>

                                </div>
                                <lable ref={message} className=''>{errmsg}</lable>
                            </div>

                            <div className="container mt-5">

                                <div className="row variation-inner">
                                    <div className='col-3 text-center '>
                                        <div className="card p-3">
                                            <div className='card-inner' >
                                                <h6>Download Sample Excel</h6>
                                                <p className='dwcard'>Maintain Excel Structure for the perfect output.</p>
                                                <div className="mx-auto mt-3 text-center">
                                                    <Button style={{ backgroundColor: '#8B3CD9', borderRadius: '52px', border: 'none' }} >
                                                        <a href={excelDownloadUrl} className='exceldw' download> Download Sample Excel</a>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 variation-block" >
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '5px' }}>
                                            <Button style={{ borderRadius: '30px', backgroundColor: '#8B3CD9', border: '0' }} className="custom-button" onClick={() => addRow()}>Add</Button>
                                            <Button type='submit' style={{ borderRadius: '30px', backgroundColor: '#8B3CD9', border: '0', marginLeft: '20px' }} className="custom-button" disabled={isSaveDisabled} onClick={(e) => upload_data(e)} >Save</Button>

                                        </div>
                                        <div style={{ maxHeight: '50vh', overflowY: 'scroll',paddingBottom:'10px' }}>

                                            <form>


                                                <table responsive="sm" className='table variation-inner-table'>

                                                    <thead className='theadd' style={{ position: 'sticky', top: 0, backgroundColor: '#F9FAFD' }}>
                                                        <tr>
                                                            <th style={{ width: '30%' }}>Name</th>
                                                            <th style={{ width: '10%' }}>Number</th>
                                                            <th style={{ width: '15%' }}>Size</th>
                                                            <th style={{ width: '1%' }}></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="custom-tbody" style={{ backgroundColor: '#F9FAFD' }}>

                                                        {/* <tr>
                                            <td>Jigar <span>5/8</span></td>
                                            <td>26 <span>2/3</span></td>
                                            <td>
                                            <select>
                                                <option>
                                                   Medium-21 x 29
                                                </option>
                                            </select>
                                            </td>
                                        </tr> */}

                                                        {excelData && excelData.map((value, index) => (

                                                            <tr key={index} id={(value['indexSr'] != undefined) ? value['indexSr'] : value['__rowNum__']}>

                                                                <td>
                                                                <div style={{ position: 'relative', display: 'inline-block',width: '100%' }}><input type='text' className="form-control tshirt-variant-data" style={{ backgroundColor: '#EAEEF8', borderRadius: '52px' }} name="name[]" Value={value['name']} ref={(ref) => {
                                                                    if (ref) NameRef.current[(value['indexSr'] != undefined) ? value['indexSr'] : value['__rowNum__']] = ref;
                                                                }} onChange={(e) => handleInputTextChange(e, index)}/>
                                                                 <span className="count" style={{ position: 'absolute', right: '10px', bottom: '8px', color: 'grey',backgroundColor:'#EAEEF8' }}>  {charCount[index] || value['name'].length}/10</span></div></td>
                                                                <td>
                                                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                                                    <input type='number' className="form-control tshirt-variant-data" style={{ backgroundColor: '#EAEEF8', borderRadius: '52px' }} name="number[]" Value={value['number']} ref={(ref) => {
                                                                    if (ref) NumberRef.current[(value['indexSr'] != undefined) ? value['indexSr'] : value['__rowNum__']] = ref;
                                                                }} onChange={(e) => handleInputNumbeChange(e, index)}/>
                                                                <span className="count" style={{ position: 'absolute', right: '10px', bottom: '8px', color: 'grey' }}> {numCount[index] || (value['number'].toString()).length || '0'}/3</span></div></td>
                                                                <td>
                                                                    <select className="form-control tshirt-variant-data" style={{ backgroundColor: '#EAEEF8', borderRadius: '52px', width: '100%' }} name="size[]" defaultValue={value['size']} ref={(ref) => {
                                                                        if (ref) SizeRef.current[(value['indexSr'] != undefined) ? value['indexSr'] : value['__rowNum__']] = ref;
                                                                    }}>
                                                                        {Object.keys(dimensions).map((size, index) => (
                                                                            <option key={index} value={size}>
                                                                                {size}
                                                                            </option>
                                                                        ))}
                                                                    </select></td>
                                                                <td><span for={(value['indexSr'] != undefined) ? value['indexSr'] : value['__rowNum__']} className="form-control tshirt-variant-data" style={{ borderRadius: '52px', border: 'none', color: '#000',backgroundColor:'#fff0'  }} onClick={(ev) => removeExcelRow(ev, (value['indexSr'] != undefined) ? value['indexSr'] : value['__rowNum__'])}><FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} /></span></td>
                                                            </tr>
                                                        ))}
                                                        {appendingRow.map((val, index) => (

                                                            <tr id={`row${val}`} key={`row${val}`}>

                                                                <td ><div style={{ position: 'relative', display: 'inline-block',width: '100%' }}>
                                                                    <input type='text' maxlength="10" className="form-control tshirt-variant-data" style={{ backgroundColor: '#EAEEF8', borderRadius: '52px' }} name="name[]" placeholder='Type here...' ref={(ref) => {
                                                                        if (ref) NameRef.current[val] = ref;
                                                                    }} onChange={(e) => handleInputTextChange(e, index)} />
                                                                    <span className="count" style={{ position: 'absolute', right: '10px', bottom: '8px', color: 'grey',backgroundColor:'#EAEEF8' }}>  {charCount[index] || '0'}/10</span>
                                                                    </div>
                                                                </td>

                                                                <td><div style={{ position: 'relative', display: 'inline-block' }}>
                                                                    <input type='number' maxlength="3" className="form-control tshirt-variant-data" style={{ backgroundColor: '#EAEEF8', borderRadius: '52px' }} name="number[]" placeholder='00' ref={(ref) => {
                                                                        if (ref) NumberRef.current[val] = ref;
                                                                    }} onChange={(e) => handleInputNumbeChange(e, index)} onKeyPress={handleKeyPress} />
                                                                    <span className="count" style={{ position: 'absolute', right: '10px', bottom: '8px', color: 'grey' }}> {numCount[index] || '0'}/3</span></div>
                                                                </td>

                                                                <td>
                                                                    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                                                                        <select className="form-control tshirt-variant-data" style={{ backgroundColor: '#EAEEF8', borderRadius: '52px', width: '100%', paddingRight: '20px' }} name={`size[${val}]`} onChange={handleInputChange} ref={(ref) => {
                                                                            if (ref) SizeRef.current[val] = ref;
                                                                        }}>
                                                                            <option value="" disabled selected hidden>Select Size</option>
                                                                            {Object.keys(dimensions).map((size, index) => (
                                                                                <option key={index} value={size}>
                                                                                    {size}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                        <span style={{ position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)' }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                                                                             <path d="M8 10.598L1.646 4.354a.5.5 0 0 1 .708-.708L8 9.182l5.646-5.536a.5.5 0 1 1 .708.708L8 10.598z"/>
                                                                        </svg>

                                                                        </span>
                                                                    </div>
                                                                </td>

                                                                <td key={`row${val}`}><span for={`row${val}`} className="form-control tshirt-variant-dataa" style={{ borderRadius: '52px', border: 'none', color: '#000',backgroundColor:'#fff0' }} onClick={(ev) => removeAddedRow(ev, val)}><FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} /></span></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </form>

                                        </div>
                                    </div>
                                    <div className={`col-3 side-card ${!excelFileType || !setFileStatus ? 'hidden' : ''}`}>
                                        <div className="card">
                                            <div className='card-inner'>
                                                <h6 className='file-details'>Uploaded File</h6>
                                                <p>FILE NAME</p>
                                                <h6 className='file-details'>{(filedata != null) ? filedata['name'] : ''}</h6>
                                                <p>FILE SIZE</p>
                                                <h6 className='file-details'>{(filedata != null) ? (filedata['size'] / 1024).toFixed(2) + " KB" : ''}</h6>
                                                <div className="mx-auto mt-3 text-center">
                                                    <Button className='rmfile' style={{ backgroundColor: '#050505', borderRadius: '52px', border: 'none' }} onClick={() => setFileData(null)}>
                                                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                                                        Remove file
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mt-4'>
                                            <p>TOTAL</p>
                                            <h6>{variationcount} Variations</h6>
                                            <p>RENDERING TIME</p>

                                            {renderingTime && <h6> {renderingTime.toFixed(2)} seconds</h6>}
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

export default Variation;