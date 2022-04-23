import React, { useRef, useState } from "react";
import "./Register.css";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';
import PersonPinIcon from '@mui/icons-material/PersonPin';
export default function Register({setRegister})
{   const nameRef=useRef();
    const emailRef=useRef();
    const passRef=useRef();
    const[success,setSuccess]=useState(false);
    const[error,setError]=useState(false);
const handleSubmit= async(e)=>
{
    e.preventDefault();
    const newUser=
    {
        username:nameRef.current.value,
        email:emailRef.current.value,
        password:passRef.current.value,
    };
try
{
 await axios.post("/user/register",newUser);
  setSuccess(true);
}catch(err)
{
    setError(true)
}
}
return (
<div className="registerContainer">
    <div className="logo">
      <PersonPinIcon/>
      MAPO  
    </div>
   <form  onSubmit={handleSubmit}>
    <input type="text" name="" id="" placeholder="Username" ref={nameRef} />
    <input type="email" name="" id="" placeholder="Enter Email-ID" ref={emailRef} />   
    <input type="password" name="" id="" placeholder="Enter Password" ref={passRef} />
    <button type="submit" className="registerBtn">Register</button>
     {success && 
     <span className="success">Successfull.You can login now!</span>
     }
     { error &&
     <span className="failure">Something went Wrong!</span>
     }
   </form>
   <CancelIcon className="registerCancel" onClick={()=>setRegister(false)}/>
</div>
);
}