import React from 'react'
import("./login.css")
function Login() {
  return (
    <>
    <div className="container">

<h1> Login 
        </h1>
        <h3>By login to our app ,you will be able to give tests and analyze your performance </h3>
<div className="form">
    <input type="text" id="text" placeholder='Enter your name '/>
    <input type="email" id="email" placeholder="Enter your email " />
    <button className='btn' > Login </button>

    </div>
    <input type="checkbox">
    </input>
    <h2>
        By signing in ,you are accepting our cookies policy 
    </h2>
    </div>
    
    </>
  )
}

export default Login