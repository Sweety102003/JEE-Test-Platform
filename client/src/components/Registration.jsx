import React from 'react'
import "./register.css"
function Registration() {
  return (
    <div className='container'>
        <h1> Register
        </h1>
        <h3>To enroll for tests and build your carrer </h3>
<div className="form">
    <input type="text" id="text" placeholder='Enter your name '/>
    <input type="email" id="email" placeholder="Enter your email " />
    <input type="password" id="password"  placeholder='Enter your password'  />
    <label><input type='checkbox' /> Admin </label>
    <button className='btn' > Register Now</button>

</div>
    </div>
  )
}

export default Registration
