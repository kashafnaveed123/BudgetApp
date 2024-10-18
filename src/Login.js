
import React from 'react'

function Login() {
  return (
    <>
    <div class="main">
    <div class="content">
      <h1>Login</h1>
      <div class="main-content">
        <form>
          <div class="input1 input">
            <p>Name</p>
            <input type="text" placeholder="Enter Name" id="name" required/>
          </div>
          <div class="input2 input">
            <p>Email</p><input type="email" placeholder="Enter Email" id="email" required/>
          </div>
          <div class="input3 input">
            <p>Password</p><input type="text" placeholder="Enter Password"/>
          </div>
          <button  onclick="save()">login</button>
        </form>
      </div>
    </div>
  </div>
  </>
  )
}

export default Login