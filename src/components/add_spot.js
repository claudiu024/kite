import '../App.css';
import TextField from "@mui/material/TextField";
import {useState,Fragment}from "react";
import axios from "axios";
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import {MapContainer,TileLayer} from "react-leaflet";

export default function Add_spot(props){
  
    const [value, setValue] =useState([null, null]);
    const [name, setName] =useState("");
    const [Country, setCountry] =useState("");
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    const url="https://626d12135267c14d5677baf4.mockapi.io/spot"
  const addToAPI=(e)=>{e.preventDefault();
    var m=new Date(value[0]);
    const location={
      "name":name,
      "country":Country,
      "month":month[m.getMonth()]
    }
    axios.post(url,location)
    .then((location)=>{console.log(location);})
    .catch((err)=>{console.log(err)})
  
    props.setVisibility(false)
 
    }
 
    return(
        <div className='main-container add-spot-container'   >
          <div style={{margin:12}}>
            <form onSubmit={addToAPI}>
            <h2>Add Spot</h2>
              <div>
                <h3>Name</h3>
                <TextField  type="text"
                       variant="standard"
                    label="Name"
                    fullWidth
                    required
                    className=' login-input'
                    onChange={(e)=>{setName(e.target.value)}}
                    />
              </div>
              <div>
                <h3>Country</h3>
                <TextField  type="text"
                    variant="standard"
                    label="Country"
                    fullWidth
                    required
                    className=' login-input'
                    onChange={(e)=>{setCountry(e.target.value)}}
                 
                    />
                </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div>
          <Typography sx={{ mt: 2, mb: 1 }}><b>High Season</b></Typography>
          <DateRangePicker
                  startText="Start date"
                  endText="End date"
            calendars={1}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <Fragment>
                <TextField   required variant='standard' {...startProps} 
                />
        
                <TextField onChange={(e)=>{console.log(e.target.value)}} variant='standard' {...endProps } />
              </Fragment>

            )}
          /> </div>
          </LocalizationProvider>
            <MapContainer  id='mini-map' center={[0, 0]} zoom={2.5}  zoomControl={false}
            >
              <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                /> 
            </MapContainer>
            
            <div style={{textAlign:"right"}}>
              <button type="reset" className='cancel' onClick={()=>{props.setVisibility(false)}}>Cancel</button>
              <button type="submit" className='confirm' >Confirm</button>
            </div>
      </form>
    </div>
  </div>
      
    )
}