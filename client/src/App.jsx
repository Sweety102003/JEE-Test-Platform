
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


function App() {

  return (
    <div>
    
<Navbar />
    
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/tests" element={<Tests/>} />
      <Route path="/register" element={<Registration />} />
      <Route path="/test/:id" element={<Testdisplaypage />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/results/:id" element={<Result/>}/>
      </Routes>
  
  
    </div>
  )
}

export default App
