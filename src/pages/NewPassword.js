import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import { BrowserRouter as Router, Link,useNavigate  } from "react-router-dom";
import titleimg from '../assets/img/Layer_1-2.svg'
import Varient from '../assets/img/varient.png'
import { useForm } from 'react-hook-form';
import KEYS from "../env/env";

export default function NewPassword() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  
      
    };

  const navigate = useNavigate();

  const { register, formState: { errors },handleSubmit,getValues } = useForm();

  var new_password = (data)=>{
        var users_email = localStorage.getItem('users_email')
        var dataToPost = {
            users_email:users_email,
            password:data.password,
            confirmpass:data.confirmpass
        }

        fetch(KEYS.apiPath + 'client/newpass-action',{
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
                    console.log(val);
                    localStorage.removeItem('users_email');
                    localStorage.removeItem('verifyotp');
                    navigate('/login');
                }
                else
                {
                    console.log(val);
                }
            })
  }

  return (
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
                      <h3 className="text-center mb-2">Set new password</h3>
                      <p>Enter your email address <br/>
                         Will send you the OTP to reset the password</p>
                     
                      <form onSubmit={handleSubmit(new_password)}>
                          <span className="mb-5 ps-3"><b>New Password</b></span><br />
                          <div style={{ position: 'relative', marginBottom: '20px'}}>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              placeholder="Password"
                              style={{ paddingRight: '30px'}} {...register("password", {required:true,minLength:8})} 
                            />
                             {errors.password?.type === "required" && (<span className="text-danger">Password is required.</span>)}
                             {errors.password?.type === 'minLength' && (<span className="text-danger">Must be at least 8 character</span>)}
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                              onClick={togglePasswordVisibility}
                              style={{ position: 'absolute', top: '40%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                            />
                          </div>
                          <span className="mb-3 ps-3"><b>Confirm New Password</b></span><br />
                          <div style={{ position: 'relative', marginBottom: '20px'}}>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              placeholder="Password"
                              style={{ paddingRight: '30px'}} {...register("confirmpassword", {required:true,minLength:8,validate:()=>getValues("password")==getValues("confirmpassword")})} 
                            />
                             {errors.confirmpassword?.type === "required" && (<span className="text-danger">Confirm Password is required.</span>)}
                             {errors.confirmpassword?.type === 'minLength' && (<span className="text-danger">Must be at least 8 character</span>)}
                             {errors.confirmpassword?.type === 'validate' && <span className="text-danger">Password & Confirm Password should be same</span>}
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                              onClick={togglePasswordVisibility}
                              style={{ position: 'absolute', top: '40%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                            />
                          </div>
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
  )
}
