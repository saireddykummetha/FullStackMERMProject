import React, { useState } from 'react'
import login from '../../assets/login-animation.gif'
import { BiShow,BiHide } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../../redux/userSlice';



const Login = () => {
   const [showpassword,setshowpassword]=useState(false);
 
   const [data,setdata]=useState({
   email:"",
   password:"",
  
  });
  console.log(data); 
   const handlepassword=()=>{
    setshowpassword(prev=>!prev)
   }
  
   const handleOnchange=(e)=>{
     const{name,value}=e.target
     setdata((prev)=>{
      return{
        ...prev,
        [name]:value
      }
     })
   }
   const navigate=useNavigate()
   const userData=useSelector(state=>state)
   
   const dispatch=useDispatch()
   
  const handleSubmit=async(e)=>{
  e.preventDefault();
  const {email,password}=data
  if(email && password ){
    const fetchData = await fetch('https://fullstackmermproject.onrender.com/login',{
      method : "post",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    const dataApi=await fetchData.json();
    console.log(dataApi);
    
    toast(dataApi.message)
    
   if(dataApi.alert){
    dispatch(loginRedux(dataApi));
     navigate("/");
   }
      console.log(userData)
  }
 
  else{
    alert("please enter required field")
  }
  }
  return (
    <div className="p-3 md:p-4">
       <div className="max-full max-w-sm bg-white m-auto  flex-col p-4">
           {/* <h1 className='text-center text-2xl font-bold'>signup</h1>   */}
           <div className='w-16 overflow-hidden rounded-full drop-shadow-md m-auto shadow-md'>
            <img src={login} className='w-full'/>
           </div>
           <form className="w-full py-3 flex flex-col"onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='email' id="email" name='email' className='w-full mb-2 mt-1 border-none focus-within:outline-blue-300 bg-slate-200 p-1 px-2 py-1 rounded'
            value={data.email}onChange={handleOnchange} required></input>
            <label htmlFor='password'>Password</label>
            <div className="flex p-1 px-2 py-1 rounded bg-slate-200  mb-2 mt-1 focus-within:outline focus-within:outline-blue-300">
            <input type={showpassword ? "type":'password'}id="password" name='password' className='w-full outline-none  bg-slate-200 '
            value={data.password}onChange={handleOnchange} required></input>         
           <span className='flex text-xl cursor-pointer' onClick={handlepassword}>{showpassword ?<BiShow/> : < BiHide/>}</span>
           </div>
          
           <button className='bg-red-600 cursor-pointer px-3 mt-4 max-w-[150px] m-auto w-full py-2 hover:bg-red-700 text-white rounded-full'>Login</button>
           </form>
           <p className="text-sm ">Don't have account ?<Link to={"/signup"} className='text-red-600 underline'>Signup</Link></p>
       </div>
    </div>
  )
}

export default Login;
