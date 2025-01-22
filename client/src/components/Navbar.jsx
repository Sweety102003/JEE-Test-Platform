import React from "react";
import {Link} from "react-router-dom"
import "./navbar.css"
const Navbar = () => {
  return (
    <div className="navbar">
      
      
        <div className="logo">
        <h2>JEE Test Platform</h2>
        </div>
        <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tests">Tests</Link></li>
        <li><Link to="/performance">Performance</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
      <div className="navbar-user">
        <button className="user-button">Profile ▼</button>
        <div className="dropdown-menu">
          <Link to="/profile">My Profile</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
