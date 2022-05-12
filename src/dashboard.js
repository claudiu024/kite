import './App.css';
import MapSection from './components/Map-Section';
import Header from './components/header';
import axios from 'axios'
import { useState,useEffect,useContext } from 'react';
import { LoginContext } from './Helpers/LoginContext';
import TableSection from './components/Table-Section';
import { useNavigate } from 'react-router-dom';
export default function Dashboard(props){
    const [spots,setSpot]=useState(null)
    const [Add_Spot_Component,setComponent]=useState("")
    const [favourite,setFavorite]=useState("")
    const spoturl='https://626d12135267c14d5677baf4.mockapi.io/spot'
    const [render,Tooglerender]=useState(false)
    const navigate=useNavigate();
    const {loggedIn,setLoggedIn}=useContext(LoginContext)
    const [AddSpotVisibility,changeAddSpotVisibility]=useState(false);
    useEffect(()=>{axios.get(spoturl)
        .then(res=>{setSpot(res.data)


    })},[spoturl])
    const favurl='https://626d12135267c14d5677baf4.mockapi.io/favourites'
    useEffect(()=>{axios.get(favurl)
        .then(res=>{
            console.log("render")
            if(JSON.stringify(favourite) !== JSON.stringify(res.data))
           {
                setFavorite(res.data)   
            
          }
          
    }).catch(err=>console.log(err))},[render])
  
   if(loggedIn){
    if(spots && favourite){
    return(
        <div>
     
            <Header changeAddSpotVisibility={changeAddSpotVisibility} setComponent={setComponent}/>
            <MapSection spots={spots} favourite={favourite} Tooglerender={Tooglerender} /> 
            { (AddSpotVisibility)? Add_Spot_Component: "" }
            <TableSection  spots={spots}/> 

        </div>
    )}else 

    return(
        <div>Page is loading</div>
    )
 
}else{navigate("/")
 return(<p>Not Logged in , redirect to login </p>)}

}