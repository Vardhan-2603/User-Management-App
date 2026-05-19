import React, { useState,useEffect } from 'react'
// import useEffect,useState,useNavigate,useLocation
import {useNavigate} from 'react-router';

function UsersList() {
  // define the state
  let [user,setUser]=useState([]);
  let [loading,setLoading]=useState(false);
  let [error,setError]=useState(null);
  const Navigate=useNavigate();
  // function to modify the state
  useEffect(()=>{
    setLoading(true);
    async function getUsers(){
      try{
        let res=await fetch("https://user-management-app-nfdh.onrender.com/user-api/users");
        if(res.status===200){
          let user=await res.json();
          console.log(user);
          setUser(user.payload);
        }else{
          throw new Error("unable to fetch the users");
        }
      }catch(err){
        setError(err);
      }
      finally{
        setLoading(false);
      }
    }

    getUsers();
  },[])

  // function to navigate to particular user
  const  gotoUser=(userObj)=>{
    Navigate("/user",{state:{user:userObj}})
  }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5 mb-3'>
      {user.map((userObj)=>
      <div className='shadow-md p-5 rounded-4xl' key={userObj._id} onClick={()=>gotoUser(userObj)}>
        <p >{userObj.name}</p>
        <p >{userObj.email}</p>
      </div>
      )}
    </div>
  )
}

export default UsersList