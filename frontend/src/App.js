import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import StarIcon from '@mui/icons-material/Star';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import RoomIcon from '@mui/icons-material/Room';
import Map,{ Popup,Marker } from 'react-map-gl';
import axios from "axios";
import { format, render, cancel, register } from 'timeago.js';
 import Register from "./components/Register";
 import PersonPinIcon from '@mui/icons-material/PersonPin';
function App() 
{ 
  const myStorage=window.localStorage;
  const[showRegister,setRegister]=React.useState(false);
  const[showLogin,setLogin]=React.useState(false);
  const [currentUser,setUser]=React.useState(myStorage.getItem("user"));
  const[title,setTitle]=React.useState(null);
  const[desc,setDesc]=React.useState(null);
  const[rating,setRating]=React.useState(0);
  const[pins,setPins]=React.useState([]);
  const[showPopup,setShowPopup] = React.useState(true)
  const[newPlace,setNewPlace]=React.useState(null);
  const[currentPlace,setCurrentPlace]=React.useState(null);
  const [viewport,setViewport] = React.useState({
    longitude: 17,
    latitude: 46,
    zoom: 3.5,
    width:"100vw",
    height:"100vh",
  })
  React.useEffect(()=>
  { 
    const getPins=async()=>
    {
    try
    {
    const res=await axios.get("/api/pins");
    setPins(res.data);
}catch(err)
  {
    console.log(err);
  }
}
getPins();
},[]);
const handledbClick=(e)=>
{ 

  const lat=e.lngLat.lat;
  const long=e.lngLat.lng;
  setNewPlace({
    lat,
    long,
  });
}
const handleMarkerClick=(id,lat,long)=>
{  
   setCurrentPlace(id);
  setViewport({...viewport,latitude:lat,longitude:long});
}
const handleSubmit=async(e)=>{ 
  e.preventDefault();
  console.log(e);
 const newPin=
 {
   username:currentUser,
   title,
   desc,
   rating,
   lat:newPlace.lat,
   long:newPlace.long,
 };
try
{
const res= await axios.post("/api/pins",newPin);
console.log(res.data);
setPins([...pins,res.data]);
setNewPlace(null);

console.log("successfull");
}catch(err)
{
  console.log(err);
}
}
const handleLogout=async()=>
{
  myStorage.removeItem("user")
  setUser(null);
}
  return ( 
  <Map style={{width:"100vw",height:"100vh"}}
  mapStyle="mapbox://styles/mapbox/streets-v11"
    mapboxAccessToken='pk.eyJ1IjoiajJhc29uMiIsImEiOiJjbDFjZzRqY3MwMDNjM2pvYjN3YzR1YW5zIn0.dWEPQmxMOkoFL6-LHerWzw'
    onViewPortChange={(nextViewport)=>setViewport(nextViewport)}
    onDblClick={handledbClick}
    >
      {pins.map(p=>(
       <>
       <Marker 
        longitude={p.long} 
        latitude={p.lat} 
        anchor="top" 
        offSetLeft={-20}
        offSetTop={-10}    
        >
      <RoomIcon  onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}  style={{fontSize:viewport.zoom*15,color:p.username===currentUser?"blue":"tomato",cursor:"pointer"}} />
    </Marker>
    {p._id=== currentPlace && 
    <Popup longitude={p.long} latitude={p.lat} closeButton={true} closeOnClick={()=>setCurrentPlace(null)} onClose={()=>setNewPlace(null)}
    anchor="left" style={{fontFamily: "Poppins, sans-serif"}}>
       <div className='card'>
       <label>Place</label>
       <h1>{p.title}</h1> 
       <label>Review</label>
       <p className='desc'>{p.desc}</p>
       <label>Rating</label>
       <div className='stars'>
       {Array(p.rating).fill(<StarIcon className='star'/>)}
       </div>
       <label>Information</label>
       <span className="creatorname">Created by <b>{p.username}</b></span>
       <span className="date">{format(p.Created)}</span>
      </div>
      </Popup>
      }
      </> 
      ))} 
     {newPlace && (

       <Popup 
       longitude={newPlace.long} 
       latitude={newPlace.lat} 
       closeButton={true} 
       closeOnClick={false}
       onClose={()=>setNewPlace(null)}
       anchor="left" 
       style={{fontFamily:"Poppins,sans-serif"}}
       >
       <div>
       <form onSubmit={handleSubmit}>
         <label>Title</label>
         <input placeholder="Enter Title Here" onChange={(e)=>setTitle(e.target.value)}/>
         <label>Review</label>
         <textarea placeholder='Say something about this place' onChange={(e)=>setDesc(e.target.value)}/>
         <label>Rating</label>
         <select onChange={(e)=>setRating(e.target.value)}>
          <option value="1">1</option> 
          <option value="2">2</option> 
          <option value="3">3</option> 
          <option value="4">4</option> 
          <option value="5">5</option> 
          </select>
         <button className='submitButton' type="submit" >Add Pin</button>
         </form>  
       </div>
       </Popup> 
    )}
    { currentUser?( <div style={{position:"absolute"}}><button className="buttonLogout" onClick={handleLogout}>Log out</button></div>):( <div className='buttons'>
      <button className="buttonLogin" onClick={()=>setLogin(true)}>Login</button>
      <button className="buttonRegister" onClick={()=>setRegister(true)}>Register</button>
      </div>)}
      {showRegister && <Register setRegister={setRegister}/>}
      {showLogin && <Login setLogin={setLogin} myStorage={myStorage} setUser={setUser}/>}
      </Map>
      
      )};
     export default App;
