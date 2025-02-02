import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css files/navbar.css";
import { FiAlignJustify } from "react-icons/fi";

const Navbar = ({ setmodalOpen }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="logo">
        <h2 style={{ color: "white" }}>JEE Test Platform</h2>
      </div>

    
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FiAlignJustify size={30} color="white" />
      </div>

    
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {token ? (
          <>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/">Home</Link></li>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/tests">Tests</Link></li>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/profile">Profile</Link></li>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/performance">Performance</Link></li>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/bookmark/:id">Bookmarks</Link></li>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/createtests">Add Test</Link></li>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/admindashboard">Admin Dashboard</Link></li>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/contact">Contact Us</Link></li>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/upcomingtests">Upcoming Tests</Link></li>
            <li onClick={() =>{setmodalOpen(true);
            setMenuOpen(false);
            }
            } style={{ cursor: "pointer" }}>Log Out</li>
          </>
        ) : (
          <>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/">Home</Link></li>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/tests">Tests</Link></li>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/contact">Contact Us</Link></li>
            <li onClick={()=>{setMenuOpen(false)}}><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
