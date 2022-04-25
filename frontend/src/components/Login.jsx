import CancelIcon from '@mui/icons-material/Cancel';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import  React,{useRef,useState} from "react"; 
import axios from "axios";
import "./Login.css";
export default function Login({setLogin,myStorage,setUser})
{   const userRef=useRef();
    const passRef=useRef();
    const[error,setError]=useState(false);
const handleSubmit= async(e)=>
{
    e.preventDefault();
    const user=
    {
       username:userRef.current.value,
        password:passRef.current.value,
    };
try
{
 const res=await axios.post("/api/user/login",user);
 myStorage.setItem("user",res.data.username);
 setUser(res.data.username);
 setLogin(false);
 setError(false);
}catch(err)
{
    setError(true);
}
}
return (
<div className="loginContainer">
    <div className="logo">
      <PersonPinIcon/>
      MAPO  
    </div>
   <form onSubmit={handleSubmit}>
    <input type="text" placeholder='Enter Username' ref={userRef} />
    <input type="password"  placeholder="Enter Password" ref={passRef} />
    <button type="submit" className="loginBtn">Login</button>
     { error &&
     <span className="failure">Something went Wrong!!</span>
     }
   </form>
   <CancelIcon className="loginCancel" onClick={()=>setLogin(false)}/>
</div>
);
}