import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit =async(e)=>{
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if(!name){
      setError("Name is required");
      return;
    }
    if(!email || !email.includes("@")){
      setError("Valid Email is required");
      return;
    }
    if(password.length < 6){
      setError("Password must contain atleast 6 characters");
      return;
    }
     
    try{
     const res = await axios.post("http://localhost:5000/auth/register",{
      name, 
      email,
      password,
     });
     setError(null);
     setSuccess("Registered Successfully");

     // Redirect to login after short delay
     setTimeout(()=>{
       navigate('/login');
     }, 1000);

    }catch(err){
     setSuccess(null);
     setError(err.response?.data?.message || "Registration failed");
    }
  }
  return (
    <div>
      <h1>Register</h1>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

       <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <br/><br/>
        <label>Email: </label>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <br/><br/>
        <label>Create Password: </label>
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <br/><br/>
        <button type="submit">Register</button>
       </form>
    </div>
  )
}

export default Register;


