import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav">
        <a href="/" className="logo">JEE/NEET Platform</a>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#tests">Upcoming Tests</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
