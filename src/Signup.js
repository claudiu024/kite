import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField"
import { useState,useEffect} from 'react';
import axios from 'axios';
export default function Signup() {
const [username,setUsername]=useState("")
const [password,setPassword]=useState("")
const [email,setEmail]=useState("")
const [confirmpassword,setConfirPassword]=useState("")
const navigate=useNavigate();
const url="https://626d12135267c14d5677baf4.mockapi.io/user"
var name_array ;
var email_array;
const [eror_component,setComponentError]=useState();
const [error,setError]=useState("");
useEffect(()=>{ 
  function add_component(){ setComponentError(<span className="field-error">{error}</span>)}
  add_component();

},[error])


async function sendGetRequest (){
try {
  const res = await axios.get(url);
  name_array=res.data.map((user)=>{return user.name}) 
  
  email_array=res.data.map((user)=>{return user.email}) 
} catch (err) {

  console.error(err);
}}
async function register(e){
  e.preventDefault();
  await sendGetRequest();

  if(name_array.includes(username)) {setError("Invalid User "); }
   else if (email_array.includes(email) ){ setError("Invalid Email ") ;}
   else if(password!==confirmpassword){setError("Password doesn't match") ;
  }
    else {
    const  user={
        "name":username,
        "email":email,
        "password":password

      }
      axios.post(url,user)
      navigate('/')
    console.log("insert succesfull")

   
  } 

}
return(
  <form onSubmit={register}>
    <div className="main-container">
    <h1 className='login-title'>Kite</h1>
      <div>
   
        <p>E-mail</p>   
        <TextField className='login-input'
                type={"text"}
                    required
                    variant="outlined"  
                    onChange={(e)=>{setEmail(e.target.value)}}/>
        
        <p>Username</p>
        <TextField className='login-input'
                type={"texy"}
                    required
                    variant="outlined"  
                    onChange={(e)=>{setUsername(e.target.value)}}/>
       
        <p>Password</p>  
        <TextField className='login-input'
                type={"password"}
                    required
                    variant="outlined"  
                    onChange={(e)=>{setPassword(e.target.value)}}/>
      
        <p>Confirm Password</p>  
        <TextField className='login-input'
                    type={"password"}
                    required
                    variant="outlined"  
                    onChange={(e)=>{setConfirPassword(e.target.value)}}/>
      </div>

      <div>{eror_component}</div>
     
     <button type="submit"  className='blue-button login-button' >Register</button>
     
</div>
</form>)
}