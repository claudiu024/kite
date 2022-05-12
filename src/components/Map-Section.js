import '../App.css';
import axios from 'axios';
import {MapContainer,Marker,Popup,TileLayer} from "react-leaflet"
import StarON from "../assets/star-on.png" 
import StarOFF from "../assets/star-off.png" 
import Filter from "../assets/filter.png"
import { useState} from 'react';
import Filters from "./filters"
import L from "leaflet"

export default function MapSection(props){
  const [component,setComponent]=useState("")
  const [Country,searchCountry]=useState("")
 const [WindProb,searchWindProb]=useState("")
 const [visibility,changeVisibility]=useState("closed")



var defaultIcon=L.icon({
    iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize:[25,41]
})
var favIcon=L.icon({
    iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
    iconSize:[25,41]
})
const url='https://626d12135267c14d5677baf4.mockapi.io/favourites'

    
var fav_id_array=props.favourite.map((fav)=>{return fav.id}) 
var fav_spot_array=props.favourite.map((fav)=>{return fav.spot}) 


var icon;


function checkfav(spot){

    if (fav_spot_array.includes(spot.id)){
        return true;
       
    }else
    return false
}

function FavoriteToogle(spot){ 
    if(checkfav(spot))
    {
       var index=fav_spot_array.indexOf(spot.id)
       var new_fav=fav_id_array[index]
    
    axios.delete(url+"/"+new_fav).then(()=>{ props.Tooglerender(v=>!v) ;console.log("delete")}).catch((err)=>{console.log(err)});}
   else{
   
        axios.post(url,{spot:spot.id})
        .then((spot)=>{
         
            console.log("insert",spot);
            props.Tooglerender(v=>!v)
        })
        .catch((err)=>{console.log(err)})

       }

       
   };
   
   

   function addfilters(){

    changeVisibility("open")
       
                
                    setComponent( <Filters
                      
                        changeVisibility={changeVisibility}
                        searchCountry={ searchCountry}
                        searchWindProb={searchWindProb}
                        />
         )}

         if(props.favourite){
    return(
       
        <div style={{marginTop:70}}> 
          {(visibility==="closed")?  
            <div className='filter-container' onClick={addfilters}>
                
            <img className='filter-image' src={Filter} alt="filter"/>
            <p className='filter'>FILTERS</p>
           
            </div>
        :"" }
      
      {(visibility==="open")?component:""}
        <MapContainer center={[48.1351, 11.5820]} zoom={3.5} > 
       
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        /> 

        {props.spots

        .filter((spot)=>{
            
            if((WindProb==="" )&& (spot.country.toLowerCase().includes(Country.toLowerCase())))
            return spot
            else
            if((spot.country.toLowerCase().includes(Country.toLowerCase()))&&(spot.probability===WindProb))
            {
               

        return spot } else return 0})
        .map((spot) =>(
            <Marker 
                { ... 
                    (checkfav(spot)) ? icon=favIcon: icon=defaultIcon} 
                    icon={icon}
                    key={spot.id}
                    position={[spot.lat,spot.long]} 
                    >
                    <Popup>
   
                        <h3 className='popup-country'>{spot.name}  
                        {(checkfav(spot)) ?
                        <img width={20} src={StarON} alt={"unavailable"}/>: 
                        <img width={20} src={StarOFF} alt={"unavailable"}/> } 
                       
                        </h3>

                        <h4 >{spot.country}</h4>
                        <h4>Wind Probability:</h4>
                        {spot.probability}%
                        <h4>Latitude:</h4>
                        {spot.lat}
                        <h4>Longitude:</h4>
                        {spot.long}
                        <h4>When to go: </h4>
                        {spot.month}
                        { 
                        (checkfav(spot)) ?
                        <button className='popup-button remove-favorite-button' onClick={()=>FavoriteToogle(spot)}>-  REMOVE FROM FAVORITES</button> : 
                        <button className='popup-button' onClick={()=>FavoriteToogle(spot)}>+ ADD TO FAVORITES</button> 
                    
                        }

                    </Popup>
            </Marker>))
}

    </MapContainer>
</div>

    )}
else
    return(  <div>Page is loading</div>)

}