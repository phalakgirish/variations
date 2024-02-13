import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'; 
import { BrowserRouter as Router, Link,useNavigate  } from "react-router-dom";
import titleimg from '../assets/img/Layer_1-2.svg'
import Varient from '../assets/img/varient.png'
import { useForm } from 'react-hook-form';
import KEYS from "../env/env";

function Forgetpass(){

  const navigate = useNavigate();

  const { register, formState: { errors },handleSubmit } = useForm();

  var forgetpass = (data) =>{
    console.log(data);
     var dataToPost = {
      users_email:data.emailid
     }

     fetch(KEYS.apiPath + 'client/forgetpass-action',{
      body: JSON.stringify(dataToPost),
      method:'POST',
      headers:{
          "Content-Type":"application/json",
          }
        })
        .then(response=>response.json())
        .then(val =>{
            // console.log(val);
          if(val.status == true)
          {
              localStorage.setItem('users_email',data.emailid);
              localStorage.setItem('verifyotp',val.token);
              navigate('/Verifyotp');
          }
          else
          {
              console.log(val);
          }
      })
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
                      <h3 className="text-center mb-2">Forget Password</h3>
                      <p>Enter your email address <br/>
                         Will send you the OTP to reset the password</p>
                     
                      <form onSubmit={handleSubmit(forgetpass)}>
                      
                          <input className="mt-4" type="email" name="email" placeholder="Email ID" {...register("emailid", {required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}/>
                          {errors.emailid?.type === "required" && (<span className="text-danger">Email is required.</span>)}
                          {errors.emailid?.type === "pattern" && (<span className="text-danger">Please enter valid email.</span>)}
                        <input className="submit" type="submit" value="Reset Password"  />
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

export default Forgetpass;