import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import toast from 'react-hot-toast';


const Header = () => {
    const navigate=useNavigate()
    const dispatched = useDispatch();
 
  const handleChange = (e) => {
    dispatched(setSearchTerm(e.target.value));
  };
    const [showmenu,setshowmenu]=useState(false);
    const userData=useSelector((state)=>state.user)
    console.log(userData.email);
 const dispatch=useDispatch()

    const handlelogout=()=>{
      dispatch(logoutRedux())
      toast("logout successfully")
    }
    const handleshowmenu=()=>{
        setshowmenu(prev=>!prev)
      }

      const cartItemsNumber=useSelector((state)=>state.product.cartItem)

      const handleSearch = (e)=>{
        const { value } = e.target
        // setSearch(value)
    
        if(value){
          navigate(`/search?q=${value}`)
        }
        else{
          navigate("/search")
        }
      }
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
           <Link to={'/'} className='font-bold text-1xl'>BOOKSTORE</Link>
        </div>

        <div className='hidden lg:flex items-center w-full  justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                <input type='text' placeholder='What are you looking for?' className='w-full outline-none px-2' onClick={handleSearch} />
                <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                  <IoSearch />
                 
                </div>
          </div>

          <div className="flex items-center gap-5 md:gap-10">
        <div className='text-2xl text-slate-600 relative'>
          <Link to={'cart'}>
        <IoCart />
        <div className='absolute -top-1 -right-1 text-white bg-red-600 h-4 w-4 rounded-full m-0 text-sm text-center '>{cartItemsNumber.length}</div>
        </Link>
        </div>
        <div className="text-2x1 text-slate-600 pt-3" onClick={handleshowmenu}>
          <div className='text-3xl cursor-pointer w-10 h-10  rounnded overflow-hidden'>
         
        {userData.image?<img src={userData.image} className='h-full w-full'/>:<FaRegUserCircle />
        }
         </div>
         {
          
          showmenu &&  <div className='absolute right-2 bg-white px-2 py-1 shadow drop-shadow-mg flex flex-col'>
          {
            userData.email===`sai@gmail.com`&& <Link  to={"newproduct"}className='whitespace-nowrap cursor-pointer'>New product</Link>
          }
  
          
     { userData.image ? <p className="cursor-pointer text-white bg-red-600"onClick={handlelogout}>Logout({userData.firstName})</p>: <Link to={"login"} className='whitespace-nowrap cursor-pointer'>Login</Link>} 
         </div>
         }
        
        </div>
     </div>

      </div>
    </header>
  )
}

export default Header
