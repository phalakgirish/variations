import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router, Link,useNavigate  } from "react-router-dom";
import titleimg from '../assets/img/Layer_1-2.svg'
import Google from '../assets/img/google.png'
import Varient from '../assets/img/varient.png'
import { useForm } from 'react-hook-form';
import KEYS from "../env/env";



function Signup(){
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { register, formState: { errors },handleSubmit } = useForm();

  var sign_up = (data)=>{
      // console.log(data);

      var dataToPost = {
        emailid: data.emailid,
        password: data.password,
        confirmpass:data.confirmpass
      }

      fetch(KEYS.apiPath + 'client/signup-action',{
        body: JSON.stringify(dataToPost),
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        }
      })
      .then(response=>response.json())
      .then(val =>{
          console.log(val);
        if(val.status == true)
        {
            // localStorage.removeItem('token');
            navigate('/login');
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
                      <h3 className="text-center">Sign Up</h3>
                      <p>Welcome back! Please enter your details</p>
                      <button>
                        <img src={Google} alt="google" />
                        Signup with Google
                      </button>
                      <p className="or-text">or</p>
                      <form onSubmit={handleSubmit(sign_up)}>
                      
                          <input type="email" name="email" placeholder="Email" {...register("emailid", {required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}/>
                          {errors.emailid?.type === "required" && (<span className="text-danger">Email is required.</span>)}
                          {errors.emailid?.type === "pattern" && (<span className="text-danger">Please enter valid email.</span>)}
                          <div style={{ position: 'relative'}}>
                          <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              placeholder="Password"
                              style={{ paddingRight: '30px'}} {...register("password", {required:true})} 
                            />
                            {errors.password?.type === "required" && (<span className="text-danger">Password is required.</span>)}
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                              onClick={togglePasswordVisibility}
                              style={{ position: 'absolute', top: '40%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                          />
                          </div>

                          <div style={{ position: 'relative', marginBottom: '20px'}}>
                          <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              placeholder="Confirm Password"
                              style={{ paddingRight: '30px'}} {...register("confirmpass", {required:true})}
                            />
                            {errors.confirmpass?.type === "required" && (<span className="text-danger">Confirm password is required.</span>)}
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                              onClick={togglePasswordVisibility}
                              style={{ position: 'absolute', top: '40%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                          />
                          </div>
                            {/* <p className="">{message}</p> */}
                            <input className="submit" type="submit" value="Sign Up" />
                      </form>
                      
                      <p>Already have account? <a href="/Login" className="login-a mx-2">Login</a></p>
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

export default Signup;