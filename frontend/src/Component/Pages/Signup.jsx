import React, { useState } from 'react'
import { BiShow,BiHide } from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom';
import login from '../../assets/login-animation.gif'
import  { toast} from 'react-hot-toast';
import { imageToBase64 } from '../../utility/imageTobase64';
const Signup = () => {
  const navigate=useNavigate(true);
   const [showpassword,setshowpassword]=useState(false);
   const [showconfirmpassword,setconfirmpassword]=useState(false);
   const [data,setdata]=useState({
   firstName:"",
   lastName:"",
   email:"",
   password:"",
   confirmpassword:"",
   image:""
  });
  console.log(data);
   const handlepassword=()=>{
    setshowpassword(prev=>!prev)
   }
   const handleconfirmpassword=()=>{
    setconfirmpassword(prev=>!prev)
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

   const handleuploadprofile=async(e)=>{   
    const data=await imageToBase64(e.target.files[0])
    console.log(data)
    setdata((prev)=>{
      return{
       ...prev,
        image:data
      }
    })
   }
  //  console.log(process.env.REACT_APP_SERVER)
  const handleSubmit=async(e)=>{
  e.preventDefault();
  const {firstName,email,password,confirmpassword}=data
  if(firstName && email && password && confirmpassword){
     if(password === confirmpassword){
      const fetchData = await fetch('https://fullstackmermproject.onrender.com/signup',{
        method : "post",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      const dataApi=await fetchData.json();
      console.log(dataApi);
        // alert(dataApi.message)
        toast(dataApi.message);
       
        if(dataApi.alert){
        navigate('/login')
        }
     }
     else{
      alert("password and confirm password not equal")
     }
  }
  }

  
  return (
    <div className="p-3 md:p-4">
       <div className="max-full max-w-sm bg-white m-auto  flex-col p-4">
           {/* <h1 className='text-center text-2xl font-bold'>signup</h1>   */}
           <div className='w-16 overflow-hidden rounded-full drop-shadow-md m-auto shadow-md relative'>
            
            <img src={data.image ? data.image : login} className='w-full h-ull'required/>
            <label htmlFor='profileImage'>
           <div className='absolute bottom-0 h-1/3 bg-slate-400 bg-opacity-20 w-full text-center cursor-pointer'>
            <p className='text-sm text-white'>Upload</p>
           </div>
           <input type={"file"} id="profileImage" accept="image/*" className='hidden'onChange={handleuploadprofile}/>
           </label>
           </div>
           <form className="w-full py-3 flex flex-col"onSubmit={handleSubmit}>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' id="firstName" name='firstName' className='w-full mb-2 mt-1 border-none focus-within:outline-blue-300 bg-slate-200 p-1 px-2 py-1 rounded'
            value={data.firstName} onChange={handleOnchange} required></input>
            <label htmlFor='lastName'>Last Name</label>
            <input type='text' id="lastName" name='lastName' className='w-full border-none focus-within:outline-blue-300 mb-2 mt-1 bg-slate-200 p-1 px-2 py-1 rounded'
            value={data.lastName} onChange={handleOnchange} required></input>
            <label htmlFor='lastName'>Email</label>
            <input type='email' id="email" name='email' className='w-full mb-2 mt-1 border-none focus-within:outline-blue-300 bg-slate-200 p-1 px-2 py-1 rounded'
            value={data.email}onChange={handleOnchange} required></input>
            <label htmlFor='password'>Password</label>
            <div className="flex p-1 px-2 py-1 rounded bg-slate-200  mb-2 mt-1 focus-within:outline focus-within:outline-blue-300">
            <input type={showpassword ? "type":'password'}id="password" name='password' className='w-full outline-none  bg-slate-200 '
            value={data.password}onChange={handleOnchange} required></input>         
           <span className='flex text-xl cursor-pointer' onClick={handlepassword}>{showpassword ?<BiShow/> : < BiHide/>}</span>
           </div>
           <label htmlFor='confirmpassword'>Confirm Password</label>
            <div className="flex p-1 px-2 py-1 rounded bg-slate-200  mb-2 mt-1 focus-within:outline border-none focus-within:outline-blue-300">
            <input type={showconfirmpassword ? "type":'password'}id="confirmpassword" name='confirmpassword' className='w-full outline-none  bg-slate-200 '
            value={data.confirmpassword}onChange={handleOnchange} required></input>         
           <span className='flex text-xl cursor-pointer' onClick={handleconfirmpassword}>{showconfirmpassword ?<BiShow/> : < BiHide/>}</span>
          
           </div>
           <button className='bg-red-600 cursor-pointer px-3 mt-4 max-w-[150px] m-auto w-full py-2 hover:bg-red-700 text-white rounded-full'>Signup</button>
           </form>
           <p className="text-sm ">Already have account ?<Link to={"/login"} className='text-red-600 underline'>Login</Link></p>
       </div>
    </div>
  )
}

export default Signup

