import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

import { BrowserRouter as Router, Link,useNavigate  } from "react-router-dom";
import titleimg from '../assets/img/Layer_1-2.svg'
import Google from '../assets/img/google.png'
import Varient from '../assets/img/varient.png'
import { useForm } from 'react-hook-form';
import KEYS from "../env/env";

function Login(){
  const [showPassword, setShowPassword] = useState(false);
  const [errmsg,setErrorMsg] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);

    
  };

  const navigate = useNavigate();

  const { register, formState: { errors },handleSubmit } = useForm();

  var login = (data)=>{
      var dataToPost = {
        emailid: data.emailid,
        password: data.password
      }

      fetch(KEYS.apiPath + 'client/login-action',{
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
            // localStorage.removeItem('token');
            navigate('/Home');
            setErrorMsg(null);
        }
        else
        {
            console.log(val);
            setErrorMsg(val['msg']);
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
                      <h3 className="text-center">Login</h3>
                      <p>Welcome back! Please enter your details</p>
                      <button>
                        <img src={Google} alt="google" />
                        Login with Google
                      </button>
                      <p className="or-text">or</p>
                      <form onSubmit={handleSubmit(login)}>
                      
                          <input type="email" name="email" placeholder="Email" {...register("emailid", {required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} />
                          {errors.emailid?.type === "required" && (<span className="text-danger">Email is required.</span>)}
                          {errors.emailid?.type === "pattern" && (<span className="text-danger">Please enter valid email.</span>)}
                          <div style={{ position: 'relative', marginBottom: '20px'}}>
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
                         
                          <input type="checkbox" name="" value="" style={{width: '5%'}} /> Remember for 30 days
                          <br /><p className="text-danger">{(errmsg != null)? errmsg:''}</p>
                        <input className="submit" type="submit" value="Login"  />
                      </form>
                      <div className="text-center mb-3">
                        <a href="/Forgetpass" className="login-a">Forget Password?</a>
                      </div>
                      <p>Don't have account? <a href="/Signup" className="login-a mx-2">Sign up for free</a></p>
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

export default Login;
