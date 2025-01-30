
import './App.css'
import Registration from './components/Registration'
import Login from './components/Login'
import {BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from './components/Home';
import Tests from './components/Tests';
import Testdisplaypage from './components/Testdisplaypage';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Result from './components/Result';
import Performance from './components/Performance';
import Bookmark from './components/Bookmark';
import AddTest from './components/AddTest';
import Logout from './components/Logout';
import { useState } from 'react';
import ContactUs from './components/ContactUs';
import Testcalender from './components/Testcalender';


function App() {
  const [modalOpen,setmodalOpen]=useState(false);
  
  
  return (
    <div>
    
<Navbar setmodalOpen={setmodalOpen} />
    
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/tests" element={<Tests/>} />
      <Route path="/register" element={<Registration />} />
      <Route path="/test/:id" element={<Testdisplaypage />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/results/:id" element={<Result/>}/>
      <Route path="/performance" element={<Performance />}/>
      <Route path="/bookmark/:id" element={<Bookmark />} />
      <Route path="/createtests" element={<AddTest />}/>
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/upcomingtests" element={<Testcalender />}/>
      </Routes>
      
      {modalOpen && <Logout setmodalOpen={setmodalOpen}/>}
  
    </div>
  )
}

export default App
