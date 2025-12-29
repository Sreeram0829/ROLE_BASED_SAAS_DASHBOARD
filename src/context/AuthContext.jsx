import React, {useState, createContext} from "react";
import axios from 'axios';

export const AuthContext = createContext();

function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login =async(email, password)=>{
    const res = await axios.post("http://localhost:5000/auth/login",{
      email,
      password,
    });

    //Logged-in state = token exists
    const {token} = res.data;

    setToken(token);
    setUser({email});

    //Token is saved in localStorage
    localStorage.setItem("token", token);
  }

  const logout = ()=>{
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{user, token, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
