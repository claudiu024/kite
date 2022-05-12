import { useState } from 'react';
import '../App.css';
import TextField from "@mui/material/TextField"
export default function MapSection(props){
 const [Country,searchCountry]=useState("")
 const [WindProb,searchWindProb]=useState("")
 function APPLY_FILTER(e){
    e.preventDefault();

    props.searchCountry(Country)
    props.searchWindProb(WindProb)
    props.changeVisibility("closed")
 }
     return(
        
         <div className='filter-pop-up'>
             <TextField
                        margin="normal"
                        type="text"
                        variant="standard"
                        label="Country"
                       
                    
                        onChange={(event)=>{
                        searchCountry(event.target.value);

                        }}
            /> 
             <div>
            <TextField
                        margin="normal"
                        type="text"
                        variant="standard"
                        label="Wind Probability"
                      
                        onChange={(event)=>{
                        searchWindProb(event.target.value);

                        }}
            /> 
            </div>
            <button className="white-button" onClick={APPLY_FILTER}>APPLY FILTER</button>


         </div>
     )
}

