import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './context/authContext';

//auth
import Login from './auth/Login';
import Register from './auth/Register';
//pages
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

//styles
import './App.css';

function App(){
 
  return(
   
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path='/users' element={<ProtectedRoute><Users /></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

