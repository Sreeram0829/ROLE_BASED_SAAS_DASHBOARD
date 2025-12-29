import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError(null);

     if(!email || !password){
      setError("Email and Password are required");
      return;     
    }
    try{
      await login(email, password);
      navigate("/dashboard");
    }catch(err){
      setError(err.response?.data?.message || "Login Failed");
    }
  }

  if(showRegister){
    return navigate('/register');
  }

  return(
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email: </label>
          <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <br/><br/>
          <label>Password: </label>
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <br/><br/>
          <button type="submit">Login</button>
          <button onClick={()=> setShowRegister(true)}>Don't have an account?Register</button>
        </form>
    </div>
  )
}

export default Login;


