import React, {useContext} from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
  const {token} = useContext(AuthContext);

   // If not logged in, redirect to login
  if(!token){
    return <Navigate to='/login'/>;
  }

  // If logged in, allow access
  return children;
}

export default ProtectedRoute;



