import '../App.css';
import Addspot from './add_spot';
import UserIcon from "../assets/user-icon.png"
import { useContext } from 'react';
import { LoginContext } from '../Helpers/LoginContext';

export default function Header(props){
const {loggedIn,setLoggedIn}=useContext(LoginContext)

function post(){
  props.changeAddSpotVisibility(true)

props.setComponent(<Addspot  setVisibility={ props.changeAddSpotVisibility}/>)

}

    
    return(
       <div className='header-container'>
          <h2 className='header-title'>Kite</h2>

          <span className='header-right-side'>
            <button onClick={post}  
              className='blue-button  header-button'>ADD SPOT</button>
            <img src={UserIcon} width={40} alt="unavailable " className='user-icon'></img>
          </span>
          <button className='logout-button' onClick={()=>{setLoggedIn(false)}}> Logout</button>
        </div> 
    )
}