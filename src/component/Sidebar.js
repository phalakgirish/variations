import React, { useState } from "react";
import { HouseDoor, Moon, PersonCircle,ChatDots } from 'react-bootstrap-icons';
import { BrowserRouter as Router, Link, useLocation, useAsyncError,useNavigate } from "react-router-dom";
import Varient from '../assets/img/Group 12302.svg'
import Home from '../assets/img/home_black_24dp.svg'
import Person from '../assets/img/account_circle_black_24dp.svg'
import Feedback from '../assets/img/rate_review_FILL0_wght400_GRAD0_opsz24.svg'
import FeedbackOffCanvas from "./FeedbackOffCanvas";
import FeedbackScreenShotModal from "./FeedbackScreenShotModal";
import secureLocalStorage from 'react-secure-storage';


function Sidebar(){
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showScreenShot, setShowScreenShot] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handelScreenShotShow = ()=>{
        setShowScreenShot(true)
        handleClose();
    }
    const handelScreenShotHide = () =>{
        setShowScreenShot(false)
        handleShow();
    }

    const handleLogout = () =>{
        secureLocalStorage.removeItem('Login');
        navigate('/')
        
    }

    return(
        <>
            <div className="sidemenu">
                <div className="text-center mt-3">
                    <ul className="nav nav-pills flex-column">
                        <li>
                        <Link to="/Home">
                            <img src={Varient} alt="Varient logo" style={{width: '50px', top:0}} />
                                                        </Link>

                        </li>
                    </ul>
                </div>

                <div className="text-center">
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                            <Link to="/Home" className={`nav-link ${pathname === "/Home" ? "active" : ""}`} aria-current="page">
                                <div className="circle-icon">
                                    <img src={Home} alt="home" style={{width: '25px'}}/>
                                </div><br/>
                                <span>Home</span> 
                            </Link>
                        </li>
                    </ul>
                </div>
                
                <div className="text-center mb-3">
                    <ul className="nav nav-pills flex-column">
                    {/* <li className="nav-item">
                        <a href="#" className="nav-link" aria-current="page">
                            <div className="circle-icon">
                                <Moon size={20} />
                            </div><br/>
                            <span>Theme</span>
                        </a>
                        </li> */}

                        <li className="nav-item" onClick={()=>{handleLogout()}}>
                        <a href="#" className="nav-link" aria-current="page">
                            <div className="circle-icon">
                                <img src={Person} alt="home"  style={{width: '25px'}}/>
                            </div><br/>
                            <span>Logout</span>
                        </a>
                        </li>

                        <li className="nav-item" onClick={()=>{handleShow()}}>
                            <div className="circle-icon">
                                <img src={Feedback} alt="home"  style={{width: '20px'}}/>
                            </div><br/>
                            <span>Leave Feedback</span>
                        </li>
                    </ul>
                </div>
            </div>

            {show && <FeedbackOffCanvas key={1} placement={'end'} name={'end'} handleClose = {handleClose} show={show} handelScreenShotShow={handelScreenShotShow}/>}
            {showScreenShot && <FeedbackScreenShotModal handelScreenShotHide = {handelScreenShotHide} showScreenShot = {showScreenShot}/>}

            </>
      
    );
}

export default Sidebar;