import React,  { useState } from "react";

// import { useHistory } from 'react-router-dom';/
import Sidebar from "../component/Sidebar";
import front from '../assets/img/homepage-first.png';
import back from '../assets/img/homepage-second.png';
// import { Dropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Link,useNavigate  } from "react-router-dom";
import { Form, InputGroup } from 'react-bootstrap';


function Home(){
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState(''); // Initialize the state
    localStorage.removeItem('bgImageDetails')
    localStorage.removeItem('playernamedetails')
    localStorage.removeItem('tshirtDetails')
    localStorage.removeItem('playernumberdetails')
    localStorage.removeItem('tshirtchangedetails')
    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
    
        // Redirect to the "Design" page with the updated selected value
         // Redirect to the "Design" page without changing the URL
    navigate('/Design', { state: { selectedValue: value,selectedImage:null } });
      };

      const handleBackSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
    
        // Redirect to the "Design" page with the updated selected value
         // Redirect to the "Design" page without changing the URL
    navigate('/DesignBkp', { state: { selectedValue: value } });
      };  
    return(
      <div id="main-container" className="container-fluid main">

        <Sidebar></Sidebar>
        <section className="home d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex home-content mb-3 text-center">
                <h5>Design.</h5>
                <h5>Variation.</h5>
                <h5>Export.</h5>
            </div>
            <div className="container home-inner">
                <div className="row home-col">
                    <div className="col-6 tsselect" onClick={()=>{navigate('/Design')}}>
                   
                        <img
                            src= {front}
                            className="img-fluid mx-auto d-block"
                            alt="Responsive image"
                        />  
                        
                        <p className="text-center text-dark">Tee Shirt Front Side</p>
                        {/* <Form.Select aria-label="Default select example" className="mb-2 custom-dropdown" onChange={handleSelectChange}
        value={selectedValue}>
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
                        
                  
                    </div>
                    <div className="col-6 tsselect">
                    <Link to="/TshirtFront" className="custom-link">

                        <img
                            src= {back}
                            className="img-fluid mx-auto d-block"
                            alt="Responsive image"
                        />   
                          </Link> 
                        <p className="text-center text-dark">Tee Shirt Front Side</p>
                        {/* <Form.Select aria-label="Default select example" className="mb-2 custom-dropdown" onChange={handleBackSelectChange} value={selectedValue}>
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
                      
                    </div>
                </div>
            </div>
            
        </section>
    </div>
    );
}

export default Home;