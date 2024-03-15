import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'; 
import { BrowserRouter as Router, Link,useNavigate  } from "react-router-dom";
import titleimg from '../assets/img/Layer_1-2.svg'
import Varient from '../assets/img/varient.png'
import { useForm } from 'react-hook-form';
import KEYS from "../env/env";
import verifyotp from "../env/verifyotp";

function Verifyotp(){

  const navigate = useNavigate();
  const digit1 = useRef();
  const digit2 = useRef();
  const digit3 = useRef();
  const digit4 = useRef();
  const [digit1Value,setDigit1Value] = useState('-');
  const [digit2Value,setDigit2Value] = useState('-');
  const [digit3Value,setDigit3Value] = useState('-');
  const [digit4Value,setDigit4Value] = useState('-');

  var email_id  = localStorage.getItem('users_email');

  const { register, formState: { errors },handleSubmit } = useForm();

  const handleInputChange1 = (e) =>{
    if(e.target.value != '')
    {
      // setDigit2Value('');
      digit2.current.focus();
    } 
  }
  const handleInputChange2 = (e) =>{
    if(e.target.value != '')
    {
      // setDigit3Value('');
      digit3.current.focus();
    }
  }
  const handleInputChange3 = (e) =>{
    if(e.target.value != '')
    {
      // setDigit4Value('');
      digit4.current.focus();
    }
  }
  const handleInputChange4 = (e) =>{
    if(e.target.value != '')
    {
      
      digit4.current.blur();
    }
  }

  var verify_otp = (e) =>{
    // console.log(data);
    e.preventDefault();

    

    var dataToPost = {
        email_id:email_id,
        otp: digit1.current.value+digit2.current.value+digit3.current.value+digit4.current.value
    };

    // console.log(dataToPost);
    var response = verifyotp(dataToPost);
    // console.log(response);

    if(!response)
    {
        navigate('/login');
    }
    else
    {
        
        navigate('/new-password');
    }


  }

  useEffect(()=>{
    // setDigit1Value('');
    digit1.current.focus();
  },[])
  
    return(
      <div id="main-container" className="container-fluid main">
        <div className="sidemenu d-flex flex-column justifycontent-between min-vh-100">
            <div className="text-center mt-3">
              <ul className="nav nav-pills flex-column">
                  <li>
                    <img src={Varient} alt="Varient logo" style={{width: '50px', top: 0}} />
                  </li>
              </ul>
            </div>
        </div>

        <section className="home">
            <div className="container login-container">
              <div className="row mt-4">
                <div className="mb-4">
                  <ul className="d-flex col-11 login-tabs">
                    <li className="">Signup</li>
                    <li className="mx-2">Payment</li>
                    <li className="mx-2">Register</li>
                  </ul>
                </div>
              </div>
              <div className="row my-5">
                <div className="col-4">
                    <div className="login">
                      <h3 className="text-center mb-2">Check you email</h3>
                      <p>We sent you the OTP to {email_id}</p>
                     
                      <form onSubmit={(e)=>verify_otp(e)}>
                      <p className="text-left mb-1 mt-6">Verify OTP</p>
                        <div className="otp-input-div">
                          <input className="otp-num-input" type="text" name="email" maxLength="1" placeholder="-" ref={digit1} onChange={(e)=>handleInputChange1(e)} />
                          <input className="otp-num-input" type="text" name="email" maxLength="1" placeholder="-" ref={digit2} onChange={(e)=>handleInputChange2(e)} />
                          <input className="otp-num-input" type="text" name="email" maxLength="1" placeholder="-" ref={digit3} onChange={(e)=>handleInputChange3(e)} />
                          <input className="otp-num-input" type="text" name="email" maxLength="1" placeholder="-" ref={digit4}
                          onChange={(e)=>handleInputChange4(e)} />
                        </div>
                        <input className="submit" type="submit" value="Verify OTP"  />
                      </form>
                      <div className="my-4 text-center">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} size="xs" style={{color: "#8b3cd9",}} />
                            <a href="/Login" className="login-a mx-2">Back to Login</a>
                      </div>
                    
                    </div>
                </div>
                    <div className="col-8 d-flex justify-content-center align-items-center">
                    <div className="login-title">
                    <img src={titleimg} alt="title" />
                    <p>Join the Crafters</p>
                  </div>
                </div>
              </div>
            </div>
           
            
        </section>
    </div>
    );
}

export default Verifyotp;