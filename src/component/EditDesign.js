import React, { useState, useEffect, useRef } from 'react';
import Sidebar from "../component/Sidebar";
import Button from 'react-bootstrap/Button';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fronttshirt from '../assets/img/Plain TeeShirt.png';
// import backtshirt from '../assets/img/t-shirt.png'

// import fronttshirt from '../assets/img/Front.svg';
import undoblack from '../assets/img/undo_black_24dp.svg';
import redoblack from '../assets/img/redo_black_24dp.svg';
import backtshirt from '../assets/img/Plain TeeShirt.png';
// import backtshirt from '../assets/img/homepage-first.png';

import redo from '../assets/img/outline_undo_black_24dp.png';
import undo from '../assets/img/outline_redo_black_24dp.png';
import addfile from '../assets/img/upload_file_FILL0_wght400_GRAD0_opsz24.svg';
import secureLocalStorage from 'react-secure-storage';
import Accordion from 'react-bootstrap/Accordion';
import { ChromePicker } from 'react-color';

import { faUndo, faRedo, faSearchPlus, faShirt, faList, faCirclePlus, faImage, faTrash, faUnderline, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import '../styles.css'
import { Border } from 'react-bootstrap-icons';
import { Stage, Layer, Rect, Circle, Image as KonvaImage, Text, Transformer } from 'react-konva';
// import Konva from 'konva';
import useImage from 'use-image';

import usePopup from '../hook/usePopUp';
import Popup from './Popup';
import verifytoken from '../env/verifytoken';


const fontStyles = {
  Arial: { fontFamily: 'Arial, sans-serif' },
  'Times New Roman': { fontFamily: "'Times New Roman', Times, serif" },
  'Euclid Circular A': { fontFamily: "'Euclid Circular A', sans-serif" },
  Medium: { fontFamily: 'Medium, sans-serif' },
  BlinkMacSystemFont: { fontFamily: 'BlinkMacSystemFont, sans-serif' },
  'Segoe UI': { fontFamily: 'Segoe UI, sans-serif' },
  Ubuntu: { fontFamily: 'Ubuntu, sans-serif' },
  Cantarell: { fontFamily: 'Cantarell, sans-serif' },
  'Fira Sans': { fontFamily: 'Fira Sans, sans-serif' },
  'Droid Sans': { fontFamily: 'Droid Sans, sans-serif' },
  'Helvetica Neue': { fontFamily: 'Helvetica Neue, sans-serif' },
  'American Captain': { fontFamily: 'American Captain, sans-serif' },
  'Bruce Forever': { fontFamily: 'Bruce Forever, sans-serif' },
  Freshman: { fontFamily: 'Freshman, sans-serif' },
  'Govrnment Agent BB': { fontFamily: 'Govrnment Agent BB, sans-serif' },
  'Govrnment Agent BB Italic': { fontFamily: 'Govrnment Agent BB Italic, sans-serif' },
  'Jersey M54': { fontFamily: 'Jersey M54, sans-serif' },
  'Rozha One': { fontFamily: 'Rozha One, sans-serif' },
  'Sports Jersey': { fontFamily: 'Sports Jersey, sans-serif' },
  'Sports World': { fontFamily: 'Sports World, sans-serif' }
};

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
function EditDesign() {
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

  const { state } = useLocation();
  const selectedValue = localStorage.getItem('tshirtSize');
  const [view, setView] = useState('front');

  const playerIndex = state.indexSr;

  // localStorage.setItem('tshirtSize',selectedValue);

  var playernamedetails = JSON.parse(localStorage.getItem('playernamedetails'));
  var playernumberdetails = JSON.parse(localStorage.getItem('playernumberdetails'));
  const tshirtChangeData = JSON.parse(localStorage.getItem('tshirtchangedetails'));
  var tshirtdetails = JSON.parse(localStorage.getItem('tshirtDetails'));
  // var selectedBGImage = localStorage.getItem('bgImageDetails');
  var selectedBGImage = state.selectedImage;

  

  if (tshirtChangeData != null) {
    var playerTShirtDetails = []
    playerTShirtDetails = tshirtChangeData.filter((item) => item.indexSr === playerIndex)
    if (playerTShirtDetails.length != 0) {
      playernamedetails = playerTShirtDetails[0].playernamedetails;
      playernumberdetails = playerTShirtDetails[0].playernumberdetails;
    }
  }
  var playerNameNo = tshirtdetails.filter((item, index) => item.indexSr === playerIndex)
  const [playerName, setPlayerName] = useState(playerNameNo[0].name);
  const [playerNo, setPlayerNo] = useState(playerNameNo[0].number);

  //Player Number
  const [textSize, setTextSize] = useState(playernumberdetails.textSize);
  const [fontFamily, setFontFamily] = useState(playernumberdetails.fontFamily);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState({ x: playernumberdetails.textPosition.x, y: playernumberdetails.textPosition.y }); // Initial position
  const [textColor, setTextColor] = useState(playernumberdetails.textColor); // Default color
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [outlineColor, setOutLineColor] = useState(playernumberdetails.outlineColor);
  const [NotextBorder, setNoTextBorder] = useState(playernumberdetails.NotextBorder);
  const [outLinecolorPickerVisible, setoutLineColorPickerVisible] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(playernumberdetails.rotationAngle);
  const [playerNoWidth, setPlayerNoWidth] = useState(playernumberdetails.NoWidth);
  const [NoScale, setNoScale] = useState({ x: playernumberdetails.NoScale.x, y: playernumberdetails.NoScale.x })
  const rotationInputRef = useRef();




  //Player Name
  const [NametextSize, setNameTextSize] = useState(playernamedetails.NametextSize);
  const [NamefontFamily, setNameFontFamily] = useState(playernamedetails.NamefontFamily);
  const [NameisDragging, setNameIsDragging] = useState(false);
  const [NamedragStart, setNameDragStart] = useState({ x: 0, y: 0 });
  const [NametextBorder, setNameTextBorder] = useState(playernamedetails.NametextBorder);
  const [NametextPosition, setNameTextPosition] = useState({ x: playernamedetails.NametextPosition.x, y: playernamedetails.NametextPosition.y }); // Initial position
  const [NametextColor, setNameTextColor] = useState(playernamedetails.NametextColor); // Default color
  const [NamecolorPickerVisible, setNameColorPickerVisible] = useState(false);
  const [NameoutlineColor, setNameOutLineColor] = useState(playernamedetails.NameoutlineColor);
  const [NameoutLinecolorPickerVisible, setNameoutLineColorPickerVisible] = useState(false);
  const [NamerotationAngle, setNameRotationAngle] = useState(playernamedetails.NamerotationAngle);
  const [playerNameWidth, setPlayerNameWidth] = useState(playernamedetails.NameWidth);
  const NamerotationInputRef = useRef();
  const [NametextPositionPer, setNametextPositionPer] = useState({ x: 0, y: 0 });
  const [textPositionPer, setTextPositionPer] = useState({ x: 0, y: 0 });
  const [NameScale, setNameScale] = useState({ x: playernamedetails.NameScale.x, y: playernamedetails.NameScale.x })





  const [selectedImage, setSelectedImage] = useState(selectedBGImage);
  const [IsNameSelected, setNameSelected] = useState(false);
  const [IsNoSelected, setNoSelected] = useState(false);
  const canvasRef = useRef(null);
  const canvasRefName = useRef(null);
  const TextNameRef = useRef(null);
  const TextNameTranRef = useRef(null);
  const TextNoRef = useRef(null);
  const TextNoTranRef = useRef(null);
  const [activeAccordionItem, setActiveAccordionItem] = useState("");
  const [history, setHistory] = useState([]);
  const [UndoRedo, setUndoRedo] = useState(0)

  const { isOpen, message, openPopup, closePopup } = usePopup();


  const LoadImage = () => {
    const [image] = useImage((state.side == 'front')?fronttshirt:backtshirt);
    return <KonvaImage image={image} width={500} height={500} />;
  };
  const LoadBGImage = () => {
    const [image] = useImage(selectedImage);
    return <KonvaImage image={image} width={320} height={500} style={{ position: 'absolute', top: 0, left: 280, zIndex: 0 }} x={90.5} />;
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
  
    setTextSize(event.target.value);
  };
  const handleTextColorChange = (color) => {
    setTextColor(color.target.value);

  };
  const handleOutlineColorChange = (color) => {
    setOutLineColor(color.target.value)

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


    setDragStart({ x: event.clientX, y: event.clientY });

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


  };

  const handlePlayerNameOutlineColorChange = (color) => {
    setNameOutLineColor(color.target.value)

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
    toggleAccordion1();
    setActiveAccordionItem("1");

  };

  // Function to handle click or tap on number text
  const handleNumberClick = () => {
    setNoSelected(true);
    setNameSelected(false);
    toggleAccordion2();
    setActiveAccordionItem("2");

  };

  const handleNameNumberDetails = async (ev) => {
    var tshirtchangedetails = JSON.parse(localStorage.getItem('tshirtchangedetails'));
    var changedData = []

    if (tshirtchangedetails != null) {
      changedData = tshirtchangedetails.filter((items) => items.indexSr != playerIndex);
    }


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



    if (history.length == 0) {
      historyStep = 0;
    }
    else if (history.length !== historyStep) {
      historyStep = history.length
    }
    else {
      historyStep = historyStep + 1
    }
    var historyrem = history.slice(0, historyStep + 1);
    var historydts = [...historyrem, { selectedImage: selectedImage, playernamedetails: playernamedetails, playernumberdetails: playernumberdetails }]
    setHistory(historydts)

    tshirtchangedetails = [...changedData, { indexSr: playerIndex, playernamedetails: playernamedetails, playernumberdetails: playernumberdetails }];

    if (ev === 1) {
      localStorage.setItem('tshirtchangedetails', JSON.stringify(tshirtchangedetails));

      var local_Data = JSON.parse(localStorage.getItem('tshirtDetails'));

      // var filterd_local_Data = local_Data.filter((item)=>item.indexSr != playerIndex)
      const updatedItems = local_Data.map(item => 
        item.indexSr === playerIndex ? { ...item, name:playerName,number:playerNo} : item
      );

      // console.log(updatedItems);
      localStorage.setItem('tshirtDetails',JSON.stringify(updatedItems))
    
    }
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

  const handelUndo = (e) => {
    if (historyStep === 0) {
      return;
    }
    historyStep = historyStep - 1;

    const previous = history[historyStep];

    setUndoRedo(1);
    if (previous != undefined) {
      UndoRedoUpdate(previous);
    }
  }

  const handelRedo = (e) => {

    if (historyStep === history.length - 1) {
      return;
    }
    historyStep = historyStep + 1;

    const next = history[historyStep];

    setUndoRedo(1);
    if (next != undefined) {
      UndoRedoUpdate(next);
    }

  }

  useEffect(() => {
    if (IsNameSelected) {
      TextNoTranRef.current.nodes([TextNameRef.current]);
    }

    if (IsNoSelected) {
      TextNoTranRef.current.nodes([TextNoRef.current]);
    }

    if (UndoRedo === 0) {
      handleNameNumberDetails(0);
    }


    setUndoRedo(0);

    //   localStorage.setItem('playernamedetails',JSON.stringify(playernamedetails));
    //   localStorage.setItem('playernumberdetails',JSON.stringify(playernumberdetails));



  }, [view, playerNo, textPosition.x, textPosition.y, textColor, textSize, fontFamily, outlineColor, NametextBorder, rotationAngle, playerName, NametextPosition.x, NametextPosition.y, NametextColor, NametextSize, NamefontFamily, NotextBorder, NameoutlineColor, NamerotationAngle, IsNameSelected]);

  useEffect(() => {
    const detectionElement = document.createElement('div');
    detectionElement.style.fontFamily = 'inherit';
    document.body.appendChild(detectionElement);
    const computedFont = window.getComputedStyle(detectionElement).fontFamily;

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

  const navigateToVariation = () => {
    const playerNamedetails = localStorage.getItem('playernamedetails');
    const bgName = localStorage.getItem('bgname');

    // Check if playerNamedetails exists in localStorage and if its "Name" value is not equal to 'Sample text'
    // if (playerNamedetails && JSON.parse(playerNamedetails).Name !== 'Sample text' && bgName) {
      if (playerName !== 'Sample text') {

        // Navigate to Variation page
        handleNameNumberDetails(1);
        navigate('/Variation', { state: { selectedImage: selectedImage,side:state.side } });
      } else {
        // Display error messages based on conditions
        if (!playerNamedetails || JSON.parse(playerNamedetails).Name === 'Sample text') {
          openPopup('Please enter Name');
        }
      }
  };
  const addVariation = () => {
    var variationdts = localStorage.getItem('tshirtDetails');
    if (variationdts == null || variationdts == undefined) {
      alert('Add Variation');
    }
    else {
      navigate('/Export', { state: { selectedImage: selectedImage } })
    }
  }
  const [accordion1Open, setAccordion1Open] = useState(false);
  const [accordion2Open, setAccordion2Open] = useState(false);

  const toggleAccordion1 = () => {
    setAccordion1Open(!accordion1Open);
    if (accordion2Open) {
      setAccordion2Open(false); // Close accordion2 if it's open
  }
  };

  const toggleAccordion2 = () => {
    setAccordion2Open(!accordion2Open);
    if (accordion1Open) {
      setAccordion1Open(false); // Close accordion1 if it's open
  }
  };

  return (
    <div id="main-container" className="container-fluid main">

      <Sidebar></Sidebar>
      <section className="home">
        <div className="row mx-2">
          <div className="col-3 page-side">
            <div className="custom-side">
              <p className="side-title">Steps</p>
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
            <div>
              <div className="accordionn mb-2">
                <div className='custom-accordion acco1'>
                  <div className="accordion-header mx-2" onClick={toggleAccordion1}>
                    <span> Player Name </span>
                    <span className='bg-dd'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down svgg" viewBox="0 0 16 16">
                      <path d="M8 10.598L1.646 4.354a.5.5 0 0 1 .708-.708L8 9.182l5.646-5.536a.5.5 0 1 1 .708.708L8 10.598z" />
                    </svg></span>
                  </div>
                  {accordion1Open && (
                    <div className="accordionn-content">
                      <div>
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
                                type='text'
                                maxLength='12'
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
                                  <option key={option.value} value={option.value} style={fontStyles[option.value]}>
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
                                style={{ background: 'white', height: '38px', fontSize: '12px', color: 'gray' }}
                              >
                                <div>Text Color</div>
                              </InputGroup.Text>

                            </div>
                            <div className="col-9 d-flex align-items-center justify-content-end" >
                              {/* Additional content in the second column */}
                              <Form.Control
                                type="color"
                                style={{ border: "1px solid black", padding: "0px", height: "25px", width: "30px", borderRadius: "8px" }}
                                id="exampleColorInput"
                                value={NametextColor}
                                onChange={(e) => { handlePlayerNameTextColorChange(e) }}
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
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="accordionn mb-2">
                <div className='custom-accordion acco2 '>
                  <div className="accordion-header mx-2" onClick={toggleAccordion2}>
                    <span>Player Number</span>
                    <span className='bg-dd'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down svgg" viewBox="0 0 16 16">
                      <path d="M8 10.598L1.646 4.354a.5.5 0 0 1 .708-.708L8 9.182l5.646-5.536a.5.5 0 1 1 .708.708L8 10.598z" />
                    </svg></span>
                  </div>
                  {accordion2Open && (
                    <div className="accordionn-content">
                      <div>
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
                                type='number'
                                maxLength='3'
                                defaultValue={playerNo}
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
                        </Form>
                      </div>          </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-9">
            <div className="row tab mt-3">
              <ul className="d-flex col-6 custom-tabs">
                <li className="active" onClick={() => { handleNameNumberDetails(1); navigate('/Design', { state: { selectedImage: selectedImage,side:state.side } }) }}>Design</li>
                <li className="mx-2" onClick={navigateToVariation}>Variation</li>
                <li className="mx-2" onClick={() => { handleNameNumberDetails(1); addVariation(); navigate('/Export', { state: { selectedImage: selectedImage,side:state.side } }) }}>Export</li>
              </ul>
              <div className="col-6 custom-btn">
                <Button className="float-end " variant="primary" onClick={() => {
                  handleNameNumberDetails(1);
                  navigate('/Export', { state: { selectedImage: selectedImage } });
                }}>
                  <FontAwesomeIcon icon={faList} style={{ marginRight: '5px' }} /> Export
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
                <div id="container" style={{ display: 'flex' }}>
                  <div className='Action-btn-div'>
                    <button className='btn undo-redo-btn' onClick={(e) => { handelUndo(e) }}><img src={undoblack} /><br />Undo</button><br />
                    <button className='btn undo-redo-btn' onClick={(e) => { handelRedo(e) }}><img src={redoblack} /><br />Redo</button>
                  </div>
                  <div style={{ position: 'relative' }} className='tshirt-draw-canvas'>

                    <svg className='svg-bg-img' xmlns="http://www.w3.org/2000/svg" ref={canvasRefName}>

                      <rect x="0" y="0" width="320" height="500" fill="white" />
                      {/* {selectedImage && <image href={selectedImage}  className='tshirt-bg-img'/>} */}
                      {/* {backgroundImage && <image href={backgroundImage} x="40" y="0" width="320" height="500" style={{border:'1px solid red;' }}/>} */}

                      <circle cx="160" cy="-123" r="160" fill="white" className='neck-circle' />
                    </svg>

                    <Stage width={500} height={500} style={{ position: 'absolute', top: 0, left: 190 }}>
                      <Layer>
                        {selectedImage && <LoadBGImage x={285} />}
                        <LoadImage />
                      </Layer>
                    </Stage>
                    <Stage width={320} height={500} style={{ position: 'absolute', top: 0, left: 280, zIndex: 0 }} ref={canvasRef}>
                      <Layer>
                        <Text ref={TextNameRef} text={playerName} fontSize={NametextSize} draggable x={NametextPosition.x} y={NametextPosition.y} fill={NametextColor} fontFamily={NamefontFamily} onDragEnd={(e) => {

                          setNameTextPosition({
                            x: e.target.x(),
                            y: e.target.y(),
                          });
                        }} stroke={NameoutlineColor} strokeWidth={NametextBorder} onClick={(e) => { handleNameClick() }} onTap={(e) => { handleNameClick() }} align='center' width={playerNameWidth} rotation={NamerotationAngle} scaleX={NameScale.x} scaleY={NameScale.y} />
                        {/* {IsNameSelected &&<Transformer ref={TextNameTranRef} keepRatio={false} enabledAnchors={[
                                                        'top-left',
                                                        'top-right',
                                                        'bottom-left',
                                                        'bottom-right',
                                                      ]}/>} */}
                        <Text ref={TextNoRef} text={playerNo} fontSize={textSize} draggable x={textPosition.x} y={textPosition.y} fill={textColor} fontFamily={fontFamily} onDragEnd={(e) => {

                          setTextPosition({
                            x: e.target.x(),
                            y: e.target.y(),
                          });
                        }} stroke={outlineColor} strokeWidth={NotextBorder}
                          onClick={(e) => {
                            handleNumberClick()
                          }} onTap={(e) => { handleNumberClick() }}
                          align='center' width={playerNoWidth} rotation={rotationAngle}
                          scaleX={NoScale.x} scaleY={NoScale.y} />
                        <Transformer ref={TextNoTranRef} />

                      </Layer>
                    </Stage>
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

                    {/* <Form.Select aria-label="Default select example" className="mb-2">
                                        <option>Back Side - Medium Size 38 (21 x 29)</option>
                                    
                                </Form.Select> */}
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
    </div>
  );
}

export default EditDesign;