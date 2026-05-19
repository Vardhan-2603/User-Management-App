import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { useNavigate } from 'react-router';

function AddUser() {
    let {register,handleSubmit}=useForm();
    let [loading,setLoading]=useState(false);
    let [error,setError]=useState(null);

    let navigate=useNavigate();

  // function that will be passed to handleSubmit
  const onUserCreate=async(obj)=>{
    // console.log(obj);
    setLoading(true);
    try{
      let res=await fetch("https://user-management-app-nfdh.onrender.com/user-api/users",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(obj),
      })
      if(res.status===201){
        navigate("/users-list");
      }else{
        throw new Error("Error Occured")
      }
    }catch(err){
      setError(err);
    }
    finally{
      setLoading(false);
    }
  }
  if(loading){
    <p className='bg-yellow-200'>Loading...</p>
  }
  if(error){
    <p className='bg-red-600'>error.message</p>
  }
  return (
    <div className='m-auto mt-10 text-center max-w-100 max-h-400 border text-2xl'>
        <p>Add Users</p>
        <form onSubmit={handleSubmit(onUserCreate)}>
        <input className='border mb-3' type="text" {...register("name")} placeholder='Enter your name' /><br/>
        <input className='border mb-3' type="text" {...register("email")} placeholder='Enter your email' /><br/>
        <input className='border mb-3' type="date" {...register("dateofBirth")} placeholder='Entre your DateofBirth' /><br/>
        <input className='border mb-3' type="text" {...register("mobileNumber")} placeholder='Enter your MobileNumber'/><br/>
        <button className='border' type='submit'>Add</button>
        </form>
        
    </div>
  )
}

export default AddUser