import React from 'react'
// import Navbar from './Navbar'
import photo1 from "../images/4.jpg"
import photo2 from "../images/1.jpg"
import photo3 from "../images/2.jpg"
import photo4 from "../images/3.svg"

import "./css files/home.css"
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Tests from './Tests'
import ContactUs from './ContactUs'
function Home() {
  const navigate=useNavigate();
  return (
    <div className='main' style={{backgroundColor:"#cdd3d8" }}>
    <div className="component">
      <div>
      <h1 > Edge for IIT </h1>
    <h2 >Exclusively for Students</h2>
    <p > Turn your dreams into reality- prepare ,practice and succeed with confidence!</p>
    <button  className='btn5'onClick={()=>{
      navigate("/register")
    }}>Enroll now</button>
    </div>
    <div >
      <img  id="imge" src={photo1} />
    </div></div>
    <div className="vite"> 
      <h2 > Only the best for you </h2>
      <p style={{textAlign:"center"}}>With access to real exam level mock tests crafted by best faculities and personalized score improvement reports,
        your best score is just a click away!

      </p></div>
      <div className="items">
        <div>
          <img src={photo2}/>
          <h2>Advanced Analytics </h2>

          </div>
          <div>
          <img src={photo3}/>
          <h2>  Real Time,Personalized Reports </h2>


          </div>
          <div>
          <img src={photo4}/>
          <h2>Real Exam Level Mock tests</h2>

          </div>
          
    
    

    </div>
    <Tests />
    <div className='contacto'>
      <ContactUs />

    </div>
   
    <p style={{fontSize:"2rem" ,textAlign:'center',color:"#2c3e50" }}>© 2025 JEE Test Platform. All rights reserved.</p>
       
    <p style={{fontSize:"1rem" ,color:"#2c3e50" }}> For any queries , contact @myjeeplatform.com </p>
    </div>
  )
}

export default Home