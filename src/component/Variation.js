import React,{ useRef, useState,useEffect}  from 'react';
import Sidebar from "../component/Sidebar";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sidemenu from '../assets/img/second-age.png';
import switchImage from '../assets/img/switch_access.png'

import * as XLSX from 'xlsx';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import { useForm } from 'react-hook-form';


import { faUndo, faRedo, faSearchPlus, faShirt, faList, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';

function Variation(){
    var fileRecord = null;
const [filedata,setFileData] = useState(null);
    const[fileStatus,setFileStatus] = useState(false);
    const[errmsg,setErrmsg] = useState(" ");
    const[errFile,setErrFile] = useState(false);
    const[excelFileType,setExcelFileType] = useState(false);
    const[excelFile,setExcelFile] = useState(null);
    const[excelData,setExcelData] = useState(null);
    const message = useRef();
    const navigate = useNavigate();
    const fileInputField = useRef();

    const [NametextSize,setNameTextSize]=useState('32');
    const [NamefontFamily, setNameFontFamily] = useState('Arial');
    const [tshirtSize,settshirtSize]=useState('M');
    const [NametextPosition, setNameTextPosition] = useState({ x:200, y:150 }); // Initial position
    const [NametextColor, setNameTextColor] = useState('#808080'); // Default color
    const [NameoutlineColor,setNameOutLineColor]=useState('#00000');
    const [NamerotationAngle, setNameRotationAngle] = useState(0);
    const [NofontFamily,setNofontFamily]=useState('');
    const [BgName,setBgName]=useState('');
    useEffect(() => {
        var playernamedetails = JSON.parse(localStorage.getItem('playernamedetails'));
        var playernumberdetails = JSON.parse(localStorage.getItem('playernumberdetails'));
        var tshirtSizeSelected= localStorage.getItem('tshirtSize');
        var imgname=localStorage.getItem('bgname')
        console.log(playernamedetails);
        setNameFontFamily(playernamedetails.NamefontFamily);
        setNameTextSize(playernamedetails.NametextSize);
        settshirtSize(tshirtSizeSelected);
        setBgName(imgname);
        setNofontFamily(playernumberdetails.fontFamily)

    }, );
     const [appendingRow,setAppendingRow] = useState([]);
    const [count,setCount] = useState(0);
     const { register, formState: { errors },handleSubmit,unregister } = useForm();
    var selectFile = (ev)=>{
        console.log(ev.target.files[0]);
        if(ev.target.files[0] === undefined || ev.target.files[0] === null)
        {
            setFileStatus(false);
        }
        else
        {
            setFileStatus(true);
            setErrFile(false);
            // setFileRecord(ev.target.files[0])
            fileRecord = ev.target.files[0]
            console.log(fileRecord);
		    setFileData(fileRecord)
            
            const fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];

            if(fileTypes.includes(fileRecord.type))
            {
                setExcelFileType(true);
                message.current.className = '';
                setErrmsg('');

                let reader = new FileReader();
                reader.readAsArrayBuffer(fileRecord);
                reader.onload = (ev) =>{
                    // setExcelFile(ev.target.result);
                    // console.log(ev.target.result);
                    const workbook = XLSX.read(ev.target.result,{type:'buffer'});
                    console.log(workbook);
                    const workSheetName = workbook.SheetNames[0];
                    console.log(workSheetName);
                    const worksheet = workbook.Sheets[workSheetName];
                    console.log(worksheet);
                    const data = XLSX.utils.sheet_to_json(worksheet);
                    console.log(data);
		    setCount(data.length);
                    setExcelData(data);
                };
            }
            else
            {
                setExcelFileType(false);
                setExcelData(null);
                message.current.className = 'alert alert-danger upload-error';
                setErrmsg('Please Select Only Excel File Types.');
            }



        }          
    }

    var addRow = (ev) =>{
        // ev.peventDefault()
        console.log(count);
        // setAppendingRow([...appendingRow,count+1]);
        appendingRow.push(count+1);
        console.log(appendingRow);
        setCount(count+1);
        

    }

    var removeAddedRow = (ev) =>{
        const currentTarget = ev.currentTarget.getAttribute("for");
        console.log(currentTarget);
        document.getElementById(currentTarget).remove();
    };

    var removeExcelRow = (index,id) =>{
        {
            const list = [...excelData];
            unregister(`name[${index}]`);
            unregister(`number[${index}]`);
            unregister(`size[${index}]`);
            console.log(list);
            const result = list.filter(items=>items.__rowNum__ != id)
            console.log(result);
            setExcelData((result.length == 0)?null:result);

          }

    }

    var upload_data = (data)=>{
         // ev.preventDefault();
        // console.log(typeof excelData);
        console.log(data);
        var dataToPost = []
        for(let i in data['name'])
        {
            dataToPost = [...dataToPost,{name:data['name'][i],number:data['number'][i],size:data['size'][i]}];

        }
        // console.log(dataToPost);
        localStorage.setItem('tshirtDetails',JSON.stringify(dataToPost))
    }
    return(
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
                        
                    <img src={sidemenu} style={{ width: '100%' , textAlign: 'center'}} />
                              
                    </div>
                       
                <div className="col-9">
                    <div className="row tab mt-3">
                        <ul className="d-flex col-6 custom-tabs">
                            <li className="">Design</li>
                            <li className="mx-2">Variation</li>
                            <li className="mx-2">Export</li>
                        </ul>
                        <div className="col-6 custom-btn">
                            <Button href='/Export' className="float-end " variant="primary">
                            <img src={switchImage} alt="home"  style={{width: '25px'}}/> Generate
                            </Button> 
                       </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-12 text-center">
                           <h4>Maintain Excel</h4>
                           <p>Efficient input all player name and number details into <br/> the Excel.Our user-friendly system ensures accuracy <br/> and saves you valuable time.</p>
                            {/* <Button className="px-3 py-1" style={{borderRadius: '30px', backgroundColor:'#2b2b5e'}} type="file" > Upload Excel </Button> */}
                            <div className='upload-excel-div'>
                                <input type="file" id="uploadbtn" className='upload_excel_input' ref={fileInputField} onChange={selectFile}/>
                                <lable type="file" for="uploadbtn" className='upload_excel_lable' onClick={()=> fileInputField.current.click()}>Upload Excel</lable>
                                 
                            </div>
                                <lable ref={message} className=''>{errmsg}</lable>    
                        </div>
                        <div className="container mt-5">
                            <div className="row variation-inner">
                                <div className="col-6">
                                <form onSubmit={handleSubmit(upload_data)}>
                                   <table responsive="sm" className='table variation-inner-table'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th style={{width:'10%'}}>Number</th>
                                            <th>Size</th>
                                        </tr>
                                    </thead>
                                    <tbody className="custom-tbody">
                                        
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

                                                {excelData && excelData.map((value,index) =>(
                                                <tr key={index} id={value['__rowNum__']}>
                                                    
                                                    <td><input type='text' className="form-control tshirt-variant-data" style={{backgroundColor: 'rgb(231, 239, 254)',borderRadius: '52px'}} name="name[]" value={value['name']} {...register(`name[${index}]`)}/></td>
                                                    <td><input type='text' className="form-control tshirt-variant-data" style={{backgroundColor: 'rgb(231, 239, 254)',borderRadius: '52px'}} name="number[]" value={value['number']} {...register(`number[${index}]`)}/></td>
                                                    <td><input type='text' className="form-control tshirt-variant-data" style={{backgroundColor: 'rgb(231, 239, 254)',borderRadius: '52px'}} name="size[]" value={value['size']} {...register(`size[${index}]`)}/></td>
                                                    <td><span for={index} className="form-control tshirt-variant-data" style={{borderRadius: '52px', border: 'none',color:'#000'}} onClick={(ev)=> removeExcelRow(index,value['__rowNum__'])}><FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} /></span></td>
                                                </tr>
                                                ))}
                                                {appendingRow && appendingRow.map((val,index)=>(
                                                    <tr id={val}>
                                                    <td><input type='text' className="form-control tshirt-variant-data" style={{backgroundColor: 'rgb(231, 239, 254)',borderRadius: '52px'}} name="name[]" {...register(`name[${val}]`)} placeholder='Type here...'/></td>
                                                    <td><input type='text' className="form-control tshirt-variant-data" style={{backgroundColor: 'rgb(231, 239, 254)',borderRadius: '52px'}} name="number[]"  {...register(`number[${val}]`)} placeholder='00'/></td>
                                                    <td><input type='text' className="form-control tshirt-variant-data" style={{backgroundColor: 'rgb(231, 239, 254)',borderRadius: '52px'}} name="size[]" {...register(`size[${val}]`)} placeholder='Size'/></td>
                                                    <td key={val}><span for={val} className="form-control tshirt-variant-data" style={{borderRadius: '52px', border: 'none',color:'#000'}} onClick={(ev)=> removeAddedRow(ev)}><FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} /></span></td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <Button style={{borderRadius: '30px', backgroundColor: '#0986dc', border:'0'}} onClick={()=>addRow()}>Add</Button>
                                        <Button type='submit' style={{borderRadius: '30px', backgroundColor: '#0986dc', border:'0', marginLeft:'20px'}} >Save</Button>
                                   </form>

                                </div>

                                <div className="col-3 side-card">
                                    <div className="card">
                                        <div className='card-inner'>
                                        <h6>uploaded File</h6>
                                        <p>FILE NAME</p>
                                        <h6>{(filedata != null)?filedata['name']:''}</h6>
                                        <p>FILE SIZE</p>
                                        <h6>{(filedata != null)?(filedata['size'] / 1024).toFixed(2) + " KB":''}</h6>
                                        <div className="mx-auto mt-3 text-center">
                                            <Button style={{backgroundColor: '#050505', borderRadius: '52px', border: 'none'}} onClick={()=>setFileData(null)}>
                                            <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                                                Remove file
                                            </Button>
                                        </div>
                                        
                                        </div>
                                        
                                    </div>

                                    <div className='mt-4'>
                                        <p>TOTAL</p>
                                        <h6>{count} Variations</h6>
                                        <p>RENDERING TIME</p>
                                        <h6>1.2 Min Approx</h6>
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