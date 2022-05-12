import '../App.css';
import { useEffect, useState } from 'react';
import React  from "react";
import TextField from "@mui/material/TextField"
import orderBy from "lodash/orderBy"


export default function TableSection(props){
    const [sort,sortby]=useState("id")
    const [OrderDirection,setOrderDirection]=useState("asc")
    const [searchTerm,setSearchTerm]=useState("")

    const spot_array=props.spots.map((s)=>{return s})

    

useEffect(()=>{ 
    spot_array.forEach(element => {
        var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

     element.lat=parseFloat(element.lat);   
     element.long=parseFloat(element.long);
     element.date=months.indexOf(element.month)

    });},[spot_array])
   
   
 function reverse_order(){
    if(OrderDirection==="asc") setOrderDirection("desc"); else setOrderDirection("asc") ;
 }
   return(
<div className='table-section'>
<h1>Locations</h1>

<TextField
    style={{width:400}}
    type="text"
    variant="outlined"
    label="Search"
 
    id="margin-normal"
    margin="normal"
    onChange={(event)=>{
        setSearchTerm(event.target.value);
        console.log(searchTerm)
    }}
/> 

<table>
    <thead>
<tr>

    <th  onClick={()=>{
        if(sort==="name"){reverse_order()}
        else sortby("name")}}>Name</th>

    <th  onClick={()=>{
            if(sort==="country"){reverse_order()}
            else sortby("country")}}>Country</th>

    <th  onClick={()=>{
        if(sort==="lat") {reverse_order()}
        else sortby("lat")}}>Latitude</th>

    <th onClick={()=>{
        if(sort==="long") {reverse_order()}
        else sortby("long")}}>Longitude</th>


    <th onClick={()=>{
        if(sort==="probability") {reverse_order()}
        else sortby("probability")}}> Wind Prob.</th>

    <th onClick={()=>{if(sort==="date") {reverse_order()}
        sortby("date")}}>When to go</th>
</tr>
</thead>
{
orderBy(spot_array,[sort],OrderDirection)
.filter((spot)=>{

if(spot.name.toLowerCase().includes(searchTerm.toLowerCase())){

    return spot
}else return 0
}).map((spot,key) =>{
  
    return( <tbody  key={key}>
<tr>
    <td>{spot.name}</td>
    <td>{spot.country}</td>
    <td>{spot.lat}</td>
    <td>{spot.long}</td>
    <td>{spot.probability}</td>
    <td>{spot.month}</td>
</tr>
</tbody>)}
)
    }
</table>

</div>) }