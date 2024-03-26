import React, { useState, useEffect, useRef } from 'react';
import Sidebar from "../component/Sidebar";
import Button from 'react-bootstrap/Button';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fronttshirt from '../assets/img/Plain TeeShirt.png';
// import backtshirt from '../assets/img/t-shirt.png'
import * as htmlToImage from 'html-to-image';

// import fronttshirt from '../assets/img/Front.svg';
import undoblack from '../assets/img/undo_black_24dp.svg';
import redoblack from '../assets/img/redo_black_24dp.svg';
import backtshirt from '../assets/img/Plain TeeShirt.png';
import redo from '../assets/img/outline_undo_black_24dp.png';
import undo from '../assets/img/outline_redo_black_24dp.png';
import addfile from '../assets/img/upload_file_FILL0_wght400_GRAD0_opsz24.svg';

import Accordion from 'react-bootstrap/Accordion';
import { ChromePicker } from 'react-color';

import { faUndo, faRedo, faSearchPlus, faShirt, faList, faCirclePlus, faImage, faTrash, faUnderline, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import '../styles.css'
import '../index.css'
import { Border, Link } from 'react-bootstrap-icons';
import { Stage, Layer, Rect, Circle, Image as KonvaImage, Text, Transformer, Shape } from 'react-konva';
// import Konva from 'konva';
import useImage from 'use-image';
import usePopup from '../hook/usePopUp';
import Popup from './Popup';


var fontOptions = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Euclid Circular A', label: 'Euclid Circular A' },
  { value: 'Medium', label: 'Medium' },
  { value: 'BlinkMacSystemFont', label: 'BlinkMacSystemFont' },
  { value: 'Segoe UI', label: 'Segoe UI' },
  { value: 'Ubuntu', label: 'Ubuntu' },
  { value: 'Cantarell', label: 'Cantarell' },
  { value: 'Fira Sans', label: 'Fira Sans' },
  { value: 'Droid Sans', label: 'Droid Sans' },
  { value: 'Helvetica Neue', label: 'Helvetica Neue' },
  { value: 'American Captain', label: 'American Captain' },
  { value: 'Bruce Forever', label: 'Bruce Forever' },
  { value: 'Freshman', label: 'Freshman' },
  { value: 'Govrnment Agent BB', label: 'Govrnment Agent BB' },
  { value: 'Govrnment Agent BB Italic', label: 'Govrnment Agent BB Italic' },
  { value: 'Jersey M54', label: 'Jersey M54' },
  { value: 'Rozha One', label: 'Rozha One' },
  { value: 'Sports Jersey', label: 'Sports Jersey' },
  { value: 'Sports World', label: 'Sports World' },

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
let historyStep = 0
function Design() {
  // const { state } = useLocation();
  // var selectedValue
  // if(state != null)
  // {
  //   selectedValue = state.selectedValue;
  // }
  // else
  // {
  //   selectedValue = localStorage.getItem('tshirtSize');
  // }
  var Existingplayernamedetails = JSON.parse(localStorage.getItem('playernamedetails'));
  var Existingplayernumberdetails = JSON.parse(localStorage.getItem('playernumberdetails'));
  var selectedBGImage = localStorage.getItem('bgImageDetails');
  // const { state } = useLocation();
  // console.log(state);

  const [view, setView] = useState('front');
  const [playerName, setPlayerName] = useState((Existingplayernamedetails != null) ? Existingplayernamedetails.Name : 'Sample text');
  const [playerNo, setPlayerNo] = useState((Existingplayernumberdetails != null) ? Existingplayernumberdetails.No : '10');
  const navigate = useNavigate()

  // localStorage.setItem('tshirtSize',selectedValue);



  // console.log(Existingplayernamedetails,Existingplayernumberdetails);




  //Player Number
  const [textSize, setTextSize] = useState((Existingplayernumberdetails != null) ? Existingplayernumberdetails.textSize : '32');
  const [fontFamily, setFontFamily] = useState((Existingplayernumberdetails != null) ? Existingplayernumberdetails.fontFamily : 'Arial');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState((Existingplayernumberdetails != null) ? Existingplayernumberdetails.textPosition : { x: 11, y: 280 }); // Initial position
  const [textColor, setTextColor] = useState((Existingplayernumberdetails != null) ? Existingplayernumberdetails.textColor : '#808080'); // Default color
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [outlineColor, setOutLineColor] = useState((Existingplayernumberdetails != null) ? Existingplayernumberdetails.outlineColor : '#00000');
  const [NotextBorder, setNoTextBorder] = useState((Existingplayernumberdetails != null) ? Existingplayernumberdetails.NotextBorder : '');
  const [outLinecolorPickerVisible, setoutLineColorPickerVisible] = useState(false);
  const [rotationAngle, setRotationAngle] = useState((Existingplayernumberdetails != null) ? Existingplayernumberdetails.rotationAngle : 0);
  const [playerNoWidth, setPlayerNoWidth] = useState((Existingplayernumberdetails != null) ? Existingplayernumberdetails.NoWidth : 300)
  const [NoScale, setNoScale] = useState((Existingplayernumberdetails != null) ? Existingplayernumberdetails.NoScale : { x: 1, y: 1 })
  const rotationInputRef = useRef();




  //Player Name
  const [NametextSize, setNameTextSize] = useState((Existingplayernamedetails != null) ? Existingplayernamedetails.NametextSize : '32');
  const [NamefontFamily, setNameFontFamily] = useState((Existingplayernamedetails != null) ? Existingplayernamedetails.NamefontFamily : 'Arial');
  const [NameisDragging, setNameIsDragging] = useState(false);
  const [NamedragStart, setNameDragStart] = useState({ x: 0, y: 0 });
  const [NametextBorder, setNameTextBorder] = useState((Existingplayernamedetails != null) ? Existingplayernamedetails.NametextBorder : '');
  const [NametextPosition, setNameTextPosition] = useState((Existingplayernamedetails != null) ? Existingplayernamedetails.NametextPosition : { x: 11, y: 150 }); // Initial position
  const [NametextColor, setNameTextColor] = useState((Existingplayernamedetails != null) ? Existingplayernamedetails.NametextColor : '#808080'); // Default color
  const [NamecolorPickerVisible, setNameColorPickerVisible] = useState(false);
  const [NameoutlineColor, setNameOutLineColor] = useState((Existingplayernamedetails != null) ? Existingplayernamedetails.NameoutlineColor : '#00000');
  const [NameoutLinecolorPickerVisible, setNameoutLineColorPickerVisible] = useState(false);
  const [NamerotationAngle, setNameRotationAngle] = useState((Existingplayernamedetails != null) ? Existingplayernamedetails.NamerotationAngle : 0);
  const [playerNameWidth, setPlayerNameWidth] = useState((Existingplayernamedetails != null) ? Existingplayernamedetails.NameWidth : 300)
  const NamerotationInputRef = useRef();
  const [NametextPositionPer, setNametextPositionPer] = useState({ x: 0, y: 0 });
  const [textPositionPer, setTextPositionPer] = useState({ x: 0, y: 0 });
  const [NameScale, setNameScale] = useState((Existingplayernamedetails != null) ? Existingplayernamedetails.NameScale : { x: 1, y: 1 })





  const [selectedImage, setSelectedImage] = useState((selectedBGImage != null)?selectedBGImage:null);
  // const [selectedImage, setSelectedImage] = useState((state != null) ? state.selectedImage : null);
  const [IsNameSelected, setNameSelected] = useState(false);
  const [IsNoSelected, setNoSelected] = useState(false);
  const canvasRef = useRef(null);
  const canvasRefName = useRef(null);
  const TextNameRef = useRef(null);
  const TextNameTranRef = useRef(null);
  const TextNoRef = useRef(null);
  const TextNoTranRef = useRef(null);
  const fontfamilyDropDown = useRef()
  const DesignImage = useRef();
  const [activeAccordionItem, setActiveAccordionItem] = useState("");
  const [history, setHistory] = useState([]);
  const [UndoRedo,setUndoRedo] = useState(0)


  if (Existingplayernamedetails != null && Existingplayernumberdetails != null) {
    //Number Details
    // setPlayerName(Existingplayernamedetails.Name);
    // setNameTextSize(Existingplayernamedetails.NametextSize);
    // setNameFontFamily(Existingplayernamedetails.NamefontFamily);
    // setNameTextPosition(Existingplayernamedetails.NametextPosition);
    // setNameTextColor(Existingplayernamedetails.NametextColor);
    // setNameOutLineColor(Existingplayernamedetails.NameoutlineColor);
    // setNameTextBorder(Existingplayernamedetails.NametextBorder);
    // setNameRotationAngle(Existingplayernamedetails.NamerotationAngle);

    //Name Details
    // setPlayerNo(Existingplayernumberdetails.No);
    // setTextSize(Existingplayernumberdetails.textSize);
    // setFontFamily(Existingplayernumberdetails.fontFamily);
    // setTextPosition(Existingplayernumberdetails.textPosition);
    // setTextColor(Existingplayernumberdetails.textColor);
    // setOutLineColor(Existingplayernumberdetails.outlineColor);
    // setNoTextBorder(Existingplayernumberdetails.NotextBorder);
    // setRotationAngle(Existingplayernumberdetails.rotationAngle);



  }

  const { isOpen, message, openPopup, closePopup } = usePopup();


  const LoadImage = () => {
    const [image] = useImage(fronttshirt);
    return <KonvaImage image={image} width={500} height={500} />;
  };
  const LoadBGImage = () => {
    const [image] = useImage(selectedImage);
    return <KonvaImage image={image} width={320} height={500} style={{ position: 'absolute', top: 0, left: 280, zIndex: 0 }} x={90.5} />
    // return <Shape sceneFunc={(context, shape)=>{context.beginPath();
    //   context.moveTo(77, 8);
    //   context.quadraticCurveTo(155, 45, 240, 8);
    //   // context.lineTo(220, 50);
    //   context.lineTo(320, 33);
    //   context.lineTo(320, 500);
    //   context.lineTo(0, 500);
    //   context.lineTo(0, 33);
    //   context.closePath();
    //   context.fillStrokeShape(shape);}} strokeWidth={1} fillPatternImage={image} fillPatternScale={{x:0.65,y:0.7}} style={{ position: 'absolute', top: 0, left: 280,zIndex:0 }} x={90.5}></Shape>;
  };
  //Player No
  const handleTextColorClick = () => {
    setColorPickerVisible(!colorPickerVisible);
  };
  const handleOutlineColorClick = () => {
    setoutLineColorPickerVisible(!outLinecolorPickerVisible);
  };
  const handleToggleView = (newView) => {
    setView(newView);
  };

  const handlePlayerNoChange = (event) => {
    setPlayerNo(event.target.value);
  };
  const handleTextSizeChange = (event) => {
    console.log(event.target.value);
    setTextSize(event.target.value);
  };
  const handleTextColorChange = (color) => {
    setTextColor(color.target.value);
    // setTimeout(() => {
    //   handleColorPickerClose();
    // }, '1000');
  };
  const handleOutlineColorChange = (color) => {
    setOutLineColor(color.target.value)
    // setTimeout(() => {
    //   handleOutlineColorClick();
    // }, '1000');
  }
  const handleNoBorderChange = (event) => {

    setNoTextBorder(event.target.value);
  };
  const handleColorPickerClose = () => {
    setColorPickerVisible(false);
  };
  const handleFontFamilyChange = (selectedOption) => {

    setFontFamily(selectedOption.target.value);
  };
  const handleMouseDown = (event, type) => {

    console.log(type);
    setDragStart({ x: event.clientX, y: event.clientY });
    console.log(type);
    if (type === 'number') {
      setIsDragging(true);
    } else if (type === 'name') {
      setNameIsDragging(true);

    }

  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setNameIsDragging(false);
  };

  const handleMouseMove = (event) => {
    const deltaX = event.clientX - dragStart.x;
    const deltaY = event.clientY - dragStart.y;

    if (isDragging) {
      setTextPosition({
        x: textPosition.x + deltaX,
        y: textPosition.y + deltaY,
      });
    } else if (NameisDragging) {

      setNameTextPosition({
        x: NametextPosition.x + deltaX,
        y: NametextPosition.y + deltaY,
      });
    }

    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleRotationChange = () => {
    const angle = parseFloat(rotationInputRef.current.value);
    setRotationAngle(isNaN(angle) ? 0 : angle);
  };


  //Player Name
  const handlePlayerNameToggleView = (newView) => {
    setView(newView);
  };

  const handlePlayerNameTextColorClick = () => {
    setNameColorPickerVisible(!NamecolorPickerVisible);
  };

  const handlePlayerNameColorPickerClose = () => {
    setNameColorPickerVisible(false);
  };

  const handlePlayerNameOutlineColorClick = () => {
    setNameoutLineColorPickerVisible(!NameoutLinecolorPickerVisible);
  };


  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };
  const handlePlayerNameTextSizeChange = (event) => {

    setNameTextSize(event.target.value);
  };
  const handlePlayerNameBorderChange = (event) => {

    setNameTextBorder(event.target.value);
  };
  const handlePlayerNameTextColorChange = (color) => {
    setNameTextColor(color.target.value);
    // setTimeout(() => {
    //   handlePlayerNameColorPickerClose();
    // }, "1000");

  };

  const handlePlayerNameOutlineColorChange = (color) => {
    setNameOutLineColor(color.target.value)
    // setTimeout(() => {
    //   handlePlayerNameOutlineColorClick();
    // }, "1000");
  }

  const handlePlayerNameFontFamilyChange = (selectedOption) => {

    setNameFontFamily(selectedOption.target.value);
  };


  const handlePlayerNameMouseMove = (event) => {
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

  const handlePlayerNameRotationChange = () => {
    const angle = parseFloat(NamerotationInputRef.current.value);
    setNameRotationAngle(isNaN(angle) ? 0 : angle);
  };

  const handleImageChange = (e) => {
    handleNameNumberDetails(0);
    const file = e.target.files[0];
    localStorage.removeItem('bgImageDetails');
    if (file) {

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        console.log(reader.result);
        // localStorage.setItem('bgImageDetails',reader.result)
        // localStorage.setItem('bgImageDetails',reader.result)
        localStorage.setItem('bgname', file.name);
        handleNameNumberDetails(0);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageRemove = () => {
    setSelectedImage(null);
  }

  const handleNameClick = () => {
    setNameSelected(true);
    setNoSelected(false);
    setActiveAccordionItem("1");
    console.log('accordion 1');// Open accordion item with eventkey 1
  };

  // Function to handle click or tap on number text
  const handleNumberClick = () => {
    setNoSelected(true);
    setNameSelected(false);
    setActiveAccordionItem("2");
    console.log('accordion 2');// Open accordion item with eventkey 2
  };
  const handleNameNumberDetails = async (ev) => {

    const canvas = canvasRef.current;

    var canvaseNameX = (NametextPosition.x / canvas.attrs.width) * 100;
    var canvaseNameY = (NametextPosition.y / canvas.attrs.height) * 100;

    var canvaseNumberX = (textPosition.x / canvas.attrs.width) * 100;
    var canvaseNumberY = (textPosition.y / canvas.attrs.height) * 100;

    const textName = TextNameRef.current;

    var TextWidthPer = (textName.textWidth / canvas.attrs.width) * 100;


    setNametextPositionPer({ x: canvaseNameX, y: canvaseNameY });
    setTextPositionPer({ x: canvaseNumberX, y: canvaseNumberY });



    var playernamedetails = {
      Name: playerName,
      NametextSize: NametextSize,
      NamefontFamily: NamefontFamily,
      NametextPosition: NametextPosition,
      NametextColor: NametextColor,
      NameoutlineColor: NameoutlineColor,
      // NamerotationAngle:NamerotationAngle,
      NamerotationAngle: TextNameRef.current.attrs.rotation,
      NametextBorder: NametextBorder,
      NametextPositionPer: NametextPositionPer,
      NametextSizePer: (NametextSize / canvas.attrs.width) * 100,
      NametextBorderPer: (NametextBorder / canvas.attrs.width) * 100,
      TextWidthPer: TextWidthPer,
      NameWidth: playerNameWidth,
      NameWidthPer: (playerNameWidth / canvas.attrs.width) * 100,
      NameScale: { x: TextNameRef.current.attrs.scaleX, y: TextNameRef.current.attrs.scaleY }
    }
    var playernumberdetails = {
      No: playerNo,
      textSize: textSize,
      fontFamily: fontFamily,
      textPosition: textPosition,
      textColor: textColor,
      outlineColor: outlineColor,
      // rotationAngle:rotationAngle,
      rotationAngle: TextNoRef.current.attrs.rotation,
      NotextBorder: NotextBorder,
      textPositionPer: textPositionPer,
      textSizePer: (textSize / canvas.attrs.width) * 100,
      NotextBorderPer: (NotextBorder / canvas.attrs.width) * 100,
      NoWidth: playerNoWidth,
      NoWidthPer: (playerNoWidth / canvas.attrs.width) * 100,
      NoScale: { x: TextNoRef.current.attrs.scaleX, y: TextNoRef.current.attrs.scaleY }
    }

    console.log(playernamedetails);
    console.log(playernumberdetails);
    if(history.length == 0)
    {
      historyStep = 0;
    }
    else if(history.length !== historyStep)
    {
      historyStep = history.length
    }
    else
    {
      historyStep = historyStep +1
    }
    console.log(historyStep);
    var historyrem = history.slice(0, historyStep + 1);
    var historydts = [...historyrem,{selectedImage:selectedImage,playernamedetails:playernamedetails,playernumberdetails:playernumberdetails}]
    setHistory(historydts)
    console.log(history);
    if(ev === 1)
    {
      localStorage.setItem('playernamedetails', JSON.stringify(playernamedetails));
      localStorage.setItem('playernumberdetails', JSON.stringify(playernumberdetails));
      localStorage.setItem('bgImageDetails',selectedImage)
    }
    

    // const dataUrl = await htmlToImage.toPng(DesignImage.current);
    // const link = document.createElement('a');
    //         link.href = dataUrl;
    //         link.download = 'Designimage.png';
    //         link.click();
  }

  const handleMouseKeyUp = (e) => {
    console.log(e);
  }

  const UndoRedoUpdate = (obj) => {
    setPlayerName(obj.playernamedetails.Name)
      setNameTextSize(obj.playernamedetails.NametextSize)
      setNameFontFamily(obj.playernamedetails.NamefontFamily)
      setNameTextBorder(obj.playernamedetails.NametextBorder)
      setNameTextPosition(obj.playernamedetails.NametextPosition)
      setNameTextColor(obj.playernamedetails.NametextColor)
      setNameOutLineColor(obj.playernamedetails.NameoutlineColor)
      setNameRotationAngle(obj.playernamedetails.NamerotationAngle)
      setPlayerNameWidth(obj.playernamedetails.NameWidth)
      setNameScale(obj.playernamedetails.NameScale)
      setSelectedImage(obj.selectedImage)
      // console.log(obj.playernamedetails);
      setPlayerNo(obj.playernumberdetails.No)
      setTextSize(obj.playernumberdetails.textSize)
      setFontFamily(obj.playernumberdetails.fontFamily)
      setTextPosition(obj.playernumberdetails.textPosition)
      setTextColor(obj.playernumberdetails.textColor)
      setOutLineColor(obj.playernumberdetails.outlineColor)
      setNoTextBorder(obj.playernumberdetails.NotextBorder)
      setRotationAngle(obj.playernumberdetails.rotationAngle)
      setPlayerNoWidth(obj.playernumberdetails.NoWidth)
      setNoScale(obj.playernumberdetails.NoScale)
  }
  
  const handelUndo = (e)=>{
    if(historyStep === 0){
      return ;
    }
    historyStep = historyStep-1;
    console.log(historyStep);
    console.log(history);
    const previous = history[historyStep];
    console.log(previous);
    setUndoRedo(1);
    if(previous != undefined)
    {
      UndoRedoUpdate(previous);
    }
  }

  const handelRedo = (e)=>{

    if(historyStep === history.length -1){
      return ;
    }
    historyStep = historyStep+1;
    console.log(historyStep);
    console.log(history);
    const next = history[historyStep];
    console.log(next);
    setUndoRedo(1);
    if(next != undefined)
    {
      UndoRedoUpdate(next);
    }

  }
  useEffect(() => {
    // document.addEventListener('mouseup',handleMouseKeyUp())
    if (IsNameSelected) {
      console.log(TextNameRef.current);
      TextNoTranRef.current.nodes([TextNameRef.current]);
    }

    if (IsNoSelected) {
      TextNoTranRef.current.nodes([TextNoRef.current]);
    }


    // setPlayerNameWidth(300);
    // setPlayerNoWidth(300);
    if(UndoRedo === 0)
    {
      handleNameNumberDetails(0);
    }
   

    const handleBeforeUnload = (event) => {
      // Cancel the event
      event.preventDefault();
      console.log(event);
      // Chrome requires returnValue to be set
      event.returnValue = '';
      // localStorage.removeItem('playernamedetails');
      // localStorage.removeItem('playernumberdetails');
      // localStorage.removeItem('bgImageDetails');
      // localStorage.removeItem('tshirtchangedetails');
      // localStorage.removeItem('tshirtDetails');

      // state.selectedImage= null;
      // setSelectedImage(null)
      
        // var tshirtDetails = JSON.parse(localStorage.getItem('tshirtDetails'));
        // console.log(tshirtDetails);
        // if(tshirtDetails != null || tshirtDetails != undefined)
        // {
        //   // const response = window.confirm('Are you sure you want to refresh? Your variation changes may be lost.')
        //   // if(response)
        //   // {
        //     console.log(tshirtDetails);
        //     localStorage.removeItem('playernamedetails');
        //     localStorage.removeItem('playernumberdetails');
        //     localStorage.removeItem('bgname');
        //     localStorage.removeItem('tshirtchangedetails');
        //   // }
          
        // }
        
      
    //   // Add your custom logic here, for example, showing a confirmation dialog
      const message = 'Are you sure you want to refresh? Your unsaved changes may be lost.';
      event.returnValue = message;
      return message;
    };  
    setUndoRedo(0);
    // window.addEventListener('beforeunload',handleBeforeUnload);

    // return () => {
    //   window.removeEventListener('beforeunload', handleBeforeUnload);
    // };
    
    // const canvas = canvasRef.current;
    // var canvaseNameX = (NametextPosition.x/canvas.attrs.width)*100;
    // var canvaseNameY =  (NametextPosition.y/canvas.attrs.height)*100;

    // var canvaseNumberX = (textPosition.x/canvas.attrs.width)*100;
    // var canvaseNumberY =  (textPosition.y/canvas.attrs.height)*100;

    // const textName = TextNameRef.current;

    // var TextWidthPer= (textName.textWidth/canvas.attrs.width)*100;


    // setNametextPositionPer({x:canvaseNameX,y:canvaseNameY});
    // setTextPositionPer({x:canvaseNumberX,y:canvaseNumberY});



    // var playernamedetails = {
    //   NametextSize:NametextSize,
    //   NamefontFamily:NamefontFamily,
    //   NametextPosition:NametextPosition,
    //   NametextColor:NametextColor,
    //   NameoutlineColor:NameoutlineColor,
    //   NamerotationAngle:NamerotationAngle,
    //   NametextBorder:NametextBorder,
    //   NametextPositionPer:NametextPositionPer,
    //   NametextSizePer:(NametextSize/canvas.attrs.width)*100,
    //   NametextBorderPer:(NametextBorder/canvas.attrs.width)*100,
    //   TextWidthPer:TextWidthPer

    // }
    // var playernumberdetails = {
    //   textSize:textSize,
    //   fontFamily:fontFamily,
    //   textPosition:textPosition,
    //   textColor:textColor,
    //   outlineColor:outlineColor,
    //   rotationAngle:rotationAngle,
    //   NotextBorder:NotextBorder,
    //   textPositionPer: textPositionPer,
    //   textSizePer:(textSize/canvas.attrs.width)*100,
    //   NotextBorderPer:(NotextBorder/canvas.attrs.width)*100,

    // }

    // // console.log(playernamedetails);
    // // console.log(playernumberdetails);

    // localStorage.setItem('playernamedetails',JSON.stringify(playernamedetails));
    // localStorage.setItem('playernumberdetails',JSON.stringify(playernumberdetails));



  }, [view, playerNo, textPosition, textColor, textSize, fontFamily, outlineColor, NametextBorder, rotationAngle, playerName, NametextPosition, NametextColor, NametextSize, NamefontFamily, NotextBorder, NameoutlineColor, NamerotationAngle, IsNameSelected]);


  useEffect(() => {
    const detectionElement = document.createElement('div');
    detectionElement.style.fontFamily = 'inherit';
    document.body.appendChild(detectionElement);
    const computedFont = window.getComputedStyle(detectionElement).fontFamily;
    // console.log(typeof computedFont)
    document.body.removeChild(detectionElement);
    var SystemFonts = computedFont.split(",");


    var fontlistarr = [...fontOptions];

    for (let i in SystemFonts) {
      var repeatFont = fontlistarr.find((items) => items.value == ((SystemFonts[i].replace('"', '')).replace('"', '')).trim());
      if (repeatFont == undefined) {
        fontlistarr = [...fontlistarr, { value: ((SystemFonts[i].replace('"', '')).replace('"', '')).trim(), label: ((SystemFonts[i].replace('"', '')).replace('"', '')).trim() }]
      }
    }
    fontOptions = fontlistarr;

  }, [])
  console.log(typeof activeAccordionItem);

  const navigateToVariation = () => {
    const playerNamedetails = localStorage.getItem('playernamedetails');

    // Check if playerNamedetails exists in localStorage and if its "Name" value is not equal to 'Sample text'
    // if (playerNamedetails && JSON.parse(playerNamedetails).Name !== 'Sample text' && bgName) {
    if (playerName !== 'Sample text') {

      // Navigate to Variation page
      handleNameNumberDetails(1);
      navigate('/Variation', { state: { selectedImage: selectedImage } });
    } else {
      // Display error messages based on conditions
      if (!playerNamedetails || JSON.parse(playerNamedetails).Name === 'Sample text') {
        openPopup('Please enter Name');
      }
    }
  };
const addVariation =()=>{
  var variationdts = localStorage.getItem('tshirtDetails');
  if(variationdts == null || variationdts == undefined)
  {
    openPopup('Add Variation');
  }
  else
  {
    navigate('/Export',{ state: { selectedImage: selectedImage } })
  }
 
}
  return (
    <div id="main-container" className="container-fluid main" style={{overflowY:'scroll'}}>

      <Sidebar></Sidebar>
      <section className="home">
      <Popup isOpen={isOpen} message={message} closePopup={closePopup} />
        <div className="row mx-2">
          <div className="col-3 page-side">
            <div className="custom-side">
              <p className="side-title">Steps</p>

              {/* <Form.Select aria-label="Default select example" className="mb-2" value={selectedValue}>
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
                            
                          </Form.Select> */}
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

          </div>

          <div className="col-9">
            <div className="row tab mt-3">
              <ul className="d-flex col-6 custom-tabs">
                <li className="active" onClick={() => { handleNameNumberDetails(1); navigate('/Design', { state: { selectedImage: selectedImage } }) }}>Design</li>
                <li className="mx-2" onClick={navigateToVariation}>Variation</li>
                <li className="mx-2" onClick={() => { handleNameNumberDetails(1); addVariation()}}>Export</li>
              </ul>
              <div className="col-6 custom-btn">
                <Button className="float-end" variant="primary" onClick={navigateToVariation}>
                  <FontAwesomeIcon icon={faList} style={{ marginRight: '5px' }} /> Add Variation
                </Button>
              </div>
            </div>

            <div className="row mt-5">
              {/* <div className="col-1 tool-btn">
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
                        </div> */}
              <div className="col-10 ">
                <div id="container" style={{display:'flex'}}>
                <div className='Action-btn-div'>
                          <button className='btn undo-redo-btn' onClick={(e)=>{handelUndo(e)}}><img src={undoblack}/><br />Undo</button><br />
                          <button className='btn undo-redo-btn' onClick={(e)=>{handelRedo(e)}}><img src={redoblack}/><br />Redo</button>
                  </div>
                  <div style={{ position: 'relative' }} className='tshirt-draw-canvas' ref={DesignImage}>

                    <svg className='svg-bg-img' xmlns="http://www.w3.org/2000/svg" ref={canvasRefName}>

                      <rect x="0" y="0" width="320" height="500" fill="white" />
                      {/* {selectedImage && <image href={selectedImage}  className='tshirt-bg-img'/>} */}
                      {/* {backgroundImage && <image href={backgroundImage} x="40" y="0" width="320" height="500" style={{border:'1px solid red;' }}/>} */}

                      <circle cx="160" cy="-123" r="160" fill="white" className='neck-circle' />
                    </svg>

                    <Stage width={500} height={500} className='ts-img'>
                      <Layer>
                        {selectedImage && <LoadBGImage x={285} />}
                        <LoadImage />
                      </Layer>
                    </Stage>
                    <Stage width={320} height={500} className='ts-detail' ref={canvasRef}>
                      <Layer>
                        <Text ref={TextNameRef} text={playerName} fontSize={NametextSize} draggable x={NametextPosition.x} y={NametextPosition.y} fill={NametextColor} fontFamily={NamefontFamily} onDragEnd={(e) => {
                          console.log(e.target);
                          setNameTextPosition({
                            x: e.target.x(),
                            y: e.target.y(),
                          });
                        }} stroke={NameoutlineColor} strokeWidth={NametextBorder} onClick={handleNameClick} onTap={handleNameClick} align='center' width={playerNameWidth} rotation={NamerotationAngle} scaleX={NameScale.x} scaleY={NameScale.y} />
                        {/* {IsNameSelected && <Transformer ref={TextNameTranRef} keepRatio={false} enabledAnchors={[
                                                              'top-left',
                                                              'top-right',
                                                              'bottom-left',
                                                              'bottom-right',
                                                            ]}/>} */}
                        <Text ref={TextNoRef} text={playerNo} fontSize={textSize} draggable x={textPosition.x} y={textPosition.y} fill={textColor} fontFamily={fontFamily} onDragEnd={(e) => {
                          console.log(e.target);
                          setTextPosition({
                            x: e.target.x(),
                            y: e.target.y(),
                          });
                        }} stroke={outlineColor} strokeWidth={NotextBorder}
                          onClick={
                            handleNumberClick
                          } onTap={handleNumberClick} align='center' width={playerNoWidth} rotation={rotationAngle} scaleX={NoScale.x} scaleY={NoScale.y} />
                        <Transformer ref={TextNoTranRef} />

                      </Layer>
                    </Stage>
                    <div style={{ position: 'absolute', top: 70,right:-285 }}>
                      <div style={{ marginBottom: 60, display: 'inline-block', marginLeft:40}}>
                        <div style={{ width: 150, marginBottom: 5, height: 1, backgroundColor: 'black', display: 'inline-block' }}></div><div class="rounded-div">1</div><span>&nbsp; Add Tee Shirt Design</span>
                      </div><br />
                      <div style={{ marginBottom: 100, display: 'inline-block' ,marginLeft:30}}>
                        <div style={{ width: 200, marginBottom: 5, height: 1, backgroundColor: 'black', display: 'inline-block' }}></div><div class="rounded-div">2</div><span>&nbsp; Add Name</span>
                      </div><br />
                      <div style={{ marginBottom: 10, display: 'inline-block',marginRight:80 }}>
                        <div style={{ width: 180, marginBottom: 5, height: 1, backgroundColor: 'black', display: 'inline-block' }}></div><div class="rounded-div">3</div><span>&nbsp; Add Number</span>
                      </div></div>
                  </div>
                  
                </div>

                <div className='tsize'>
                  <div className='tsize-action-div'>
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
                            <img src={addfile} htmlFor="imageInput2" alt="file" />
                          </label>
                        </InputGroup.Text>

                      </InputGroup>

                    </Form.Group>

                    <Form.Label className="m-2">
                      Expected Image Pixels (1824 x 2620 Px)

                    </Form.Label>
                  </div>

                </div>
               

              </div>
              {/* <div className="col-1 tool-btn">
                            <Button className={`mb-2 ${view === 'front' ? 'active' : ''}`} onClick={() => handleToggleView('front')}>                            <FontAwesomeIcon icon={faShirt} style={{ marginRight: '5px' }} />
                                <span>Front</span>
                            </Button> 
                            <Button className={`mb-2 ${view === 'back' ? 'active' : ''}`} onClick={()=> handleToggleView('back')}>
                            <FontAwesomeIcon icon={faCirclePlus} style={{ marginRight: '5px' }} />
                                <span>Add backside</span>
                            </Button> 
                           
                        </div> */}
            </div>
          </div>
        </div>

      </section>
      {/* <div ref={fontfamilyDropDown} style={{visibility:'hidden'}}></div> */}
    </div>

  );
}

export default Design;