import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Sidebar from "./component/Sidebar";
import Home from "./pages/Home";
import TshirtFront from "./pages/TshirtFront";
import Variation from "./component/Variation";
import Export from "./component/Export";
import Design from "./component/Design";
import DesignBkp from "./component/DesignBkp";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgetpass from "./pages/Forgetpass";
import Verifyotp from "./pages/Verifyotp";
import NewPassword from "./pages/NewPassword";
import Design1 from "./component/Design1";
import EditDesign from "./component/EditDesign";
import '../src/index.css';


function App() {
  return (
    <Router>
    <div className="App">
      {/* <Sidebar /> */}
      <Routes>
      <Route path="*" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Forgetpass" element={<Forgetpass />} />
        <Route path="/Verifyotp" element={<Verifyotp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/TshirtFront" element={<TshirtFront />} />
        <Route path="/Design" element={<Design />} /> 
        <Route path="/Design1" element={<Design1 />} /> 
        <Route path="/DesignBkp" element={<DesignBkp />} /> 
        <Route path="/Variation" element={<Variation />} /> 
        <Route path="/Export" element={<Export />} /> 
        <Route path="/new-password" element={<NewPassword />} /> 
        <Route path="/EditDesign" element={<EditDesign />} /> 



        {/* <Route path="/Theme" component={Theme} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Feedback" component={Feedback} /> */}
      </Routes>
    </div>
  </Router>
      // <div id="main-container" className="container-fluid main">
        
      //   <Home />

      // </div>
  );
}

export default App;
