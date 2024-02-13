import React from "react";
import { HouseDoor, Moon, PersonCircle,ChatDots } from 'react-bootstrap-icons';
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import Varient from '../assets/img/varient.png'
import Home from '../assets/img/home_black_24dp.png'
import Person from '../assets/img/account_circle_black_24dp.png'
import Feedback from '../assets/img/rate_review_FILL0_wght400_GRAD0_opsz24.png'



function Sidebar(){
    const { pathname } = useLocation();

    return(
            <div className="sidemenu">
                <div className="text-center mt-3">
                    <ul className="nav nav-pills flex-column">
                        <li>
                            <img src={Varient} alt="Varient logo" style={{width: '50px', top:0}} />
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
                    <li className="nav-item">
                        <a href="#" className="nav-link" aria-current="page">
                            <div className="circle-icon">
                                <Moon size={20} />
                            </div><br/>
                            <span>Theme</span>
                        </a>
                        </li>

                        <li className="nav-item">
                        <a href="#" className="nav-link" aria-current="page">
                            <div className="circle-icon">
                                <img src={Person} alt="home"  style={{width: '25px'}}/>
                            </div><br/>
                            <span>Bhumik</span>
                        </a>
                        </li>

                        <li className="nav-item">
                        <a href="#" className="nav-link" aria-current="page">
                            <div className="circle-icon">
                                <img src={Feedback} alt="home"  style={{width: '20px'}}/>
                            </div><br/>
                            <span>Leave Feedback</span>
                        </a>
                        </li>
                    </ul>
                </div>
            </div>
      
    );
}

export default Sidebar;