import React, { useContext } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {LoginContext} from "./Helpers/LoginContext"
export default function Login() {

  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [eror_component,setComponent]=useState("")
  const {loggedIn,setLoggedIn}=useContext(LoginContext)
  const navigate=useNavigate();
  const login_url="https://626d12135267c14d5677baf4.mockapi.io/login"
  const user_url="https://626d12135267c14d5677baf4.mockapi.io/user"
  var users;
  function add_component(){ setComponent(<span className="field-error">Invalid user or password</span>)}
  
async function sendGetRequest (){
  try {
    const res = await axios.get(user_url);
    users=res.data.filter((user)=>{
      if((user.name===username)&&(user.password===password)){
        return user;
      }
      else 
      return 0

    }).map((user)=>{return user.name}) 

  
  } catch (err) {
    
    console.error(err);
  }}
 
async function log(e){
  e.preventDefault();
  await sendGetRequest()
console.log(users,username)
if(users == username){console.log(users)

  const user={
    "username":username,
    "password":password
  }

  setLoggedIn(true)
  axios.post(login_url,user).then(navigate('/dashboard'))
}
else add_component()
}
 
    return (
    <div className="main-container">
        <h1 className='login-title'>Kite</h1>
        <form onSubmit={log}>
            <div>
          
              <p>Username</p>
             
              <TextField
                required
                variant="outlined"
               className='login-input'
               onChange={(e)=>{setUsername(e.target.value)}}/>
             
              <p>Password</p>  
              
              <TextField className='login-input'
              type={"password"}
              required
              variant="outlined"  
              onChange={(e)=>{setPassword(e.target.value)}}/>
              
              <div>{eror_component}</div>
             
            </div>

            <Link to ="/Signup" className="sign-up-link">Not registred? Signup</Link>
            <button type="submit"  className='blue-button login-button' >Login</button>


        </form>
      </div>
      
        
    )

  }

