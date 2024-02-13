import React, { useState } from "react";
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

  const { register, formState: { errors },handleSubmit } = useForm();

  var verify_otp = (data) =>{
    // console.log(data);

    var email_id  = localStorage.getItem('users_email');

    var dataToPost = {
        email_id:email_id,
        otp: data.digit1+data.digit2+data.digit3+data.digit4
    };

    console.log(dataToPost);
    var response = verifyotp(dataToPost);
    console.log(response);

    if(!response)
    {
        navigate('/login');
    }
    else
    {
        
        navigate('/new-password');
    }


  }
  
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
                      <p>We sent you the OTP to user@email.com</p>
                     
                      <form onSubmit={handleSubmit(verify_otp)}>
                      <p className="text-left mb-1 mt-6">Verify OTP</p>
                        <div className="otp-input-div">
                          <input className="otp-num-input" type="text" name="email" maxLength="1" placeholder="-" {...register("digit1")}/>
                          <input className="otp-num-input" type="text" name="email" maxLength="1" placeholder="-" {...register("digit2")}/>
                          <input className="otp-num-input" type="text" name="email" maxLength="1" placeholder="-" {...register("digit3")}/>
                          <input className="otp-num-input" type="text" name="email" maxLength="1" placeholder="-" {...register("digit4")}/>
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