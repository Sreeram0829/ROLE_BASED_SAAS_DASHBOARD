import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Users.css';

function Users(){
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: ""
  });

    const fetchUsers = async()=>{
      setLoad(true);
    try{
    const res = await axios.get("http://localhost:5000/users", {
     headers: {Authorization: `Bearer ${token}`},
    params: {page,limit}
    });
    setUsers(res.data.data);
    setError(null);
  }catch(err){
    setError(err.response?.data?.message || "Failed to Load the data");
  } finally{
    setLoad(false);
  }
}

useEffect(()=>{
fetchUsers();
  }, [page, token, limit]);

  const startEdit = (user) => {
    setEditUserId(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setEditForm({name: "", email:"", role:""});
  };
  
  const saveEdit = async(id) =>{
     try{
        await axios.put(`http://localhost:5000/users/${id}`, 
          editForm,
          {headers: {Authorization : `Bearer ${token}`}}
        );
        cancelEdit();
        fetchUsers()
     }catch(err){
      alert("Failed to update user");
     }
  };

  const deleteUser = async(id) => {
    const confirm = window.confirm("Are you sure, you want to delete this user");
    if(!confirm) return;
    try{
      await axios.delete(`http://localhost:5000/users/${id}`, 
        {headers : {Authorization : `Bearer ${token}`}}
      );
      fetchUsers();
    }catch(err){
      alert("Failed to delete the User");
    }
  }

  if(load) return <h1>Loading...</h1>

  return(
    <div className='users-page container'> 
      <h1>Users Page</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                {editUserId === user._id ? (
                <>
                <td>
                  <input
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </td>
                <td>
                  <input
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm,email: e.target.value})}
                  />
                </td>
                <td>
                  <input
                  value={editForm.role}
                  onChange={(e)=> setEditForm({...editForm,role: e.target.value})}
                  />
                </td>
                <td>
                  <button onClick={()=>saveEdit(user._id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </td>
                </>
                ):(
                  <>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={()=> startEdit(user)}>Edit</button>
                    <button className="btn-danger" onClick={()=> deleteUser(user._id)}>Delete</button>
                  </td>
                
                  </>
                )
              }
              </tr>
            ))}
          </tbody>
      </table>
      <div className='pagination'>
      <button onClick={()=> setPage((p)=> Math.max(1, p-1))}  disabled={page === 1}>Previous</button>
          <span>Page {page}</span>
          <button onClick={()=> setPage((p)=>  p+1)} disabled={users.length < limit}>Next</button>
          <button onClick={()=> navigate('/dashboard')}>Back to Dashboard</button>
          </div>
    </div>
  )
}

export default Users;


