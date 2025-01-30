import React from "react";
import {Link} from "react-router-dom"
import "./css files/navbar.css"
const Navbar = ({setmodalOpen}) => {
  return (
    <div className="navbar">
      
      
        <div className="logo">
        <h2 style={{color:"white"}}>JEE Test Platform</h2>
        </div>
        <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tests">Tests</Link></li>
        <li> <Link to ="/profile">Profile</Link></li>
        <li><Link to="/performance">Performance</Link></li>
        <li><Link to="/bookmark/:id"> Bookmarks</Link> </li>
        <li> <Link to="/createtests">Add Test</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li> <Link to="/upcomingtests">Upcoming tests</Link></li>
        
       <li onClick={()=>
        setmodalOpen(true)}><Link to={"/"}> 
       Log Out</Link></li> 

        
        <li><Link to="/login">Login </Link></li>


      </ul>
    
    
    </div>
  );
};

export default Navbar;
