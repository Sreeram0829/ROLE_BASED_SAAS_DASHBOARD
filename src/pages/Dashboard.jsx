import React, { useContext} from "react";
import { AuthContext } from "../context/authContext";
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import './Dashboard.css';


function Dashboard(){
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  
    return(
    <div className="dashboard container">
       <Navbar />
       <h1>Welcome to Sree Arts</h1>
       <p>Hi {user?.email}, welcome to dashboard</p>
       <p> Our app is currently under development. Please stay tuned for new features</p>
       <button onClick={() => navigate('/users')}>Go to Users</button>
    </div>
  )
}

export default Dashboard;



