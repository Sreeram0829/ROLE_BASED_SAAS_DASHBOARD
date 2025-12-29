import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar(){
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = () =>{
    logout();
    navigate('/login');
  }

  const handleUsers=()=>{
    navigate('/users');
  }

  return (
      <nav className="navbar">
      <div className="navbar-left">
         <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      </div>
      
      <div className='navbar-middle'>
          <button onClick={handleUsers}>Users</button>
      </div>

      <div className='navbar-right'>
          <button onClick={handleLogout}>Logout</button>
      </div>
      </nav>
  )
}

export default Navbar;
