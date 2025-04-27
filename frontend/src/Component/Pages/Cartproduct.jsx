import React from 'react'
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { useDispatch } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { deleteCartItem ,increaqty,decreaqty} from '../../redux/productSlice'
const Cartproduct = ({id,name,price,image,category,total,qty,description}) => {
  
  const dispatch=useDispatch();
  return (
    <div className='bg-slate-200 p-2 flex gap-4 rounded border border-slate-300'>
      <div className='bg-white rounded overflow-hidden'>
       <img src={image}className='h-50 w-80  object-cover'/>
      </div>

      <div className='flex flex-col gap-1 w-full'>
        <div className='flex justify-between '>
      <h3 className='font-semibold text-slate-600 capitalize text-lg mt-3 text-2xl md:text-3xl px-5'>{name}</h3>
      <div className='cursor-pointer py-4 text-slate-700 hover:text-red-700'onClick={()=>dispatch(deleteCartItem(id))}>
         <MdDelete/>
      </div>
      </div>
    <p className=' text-slate-500 font-medium px-5 pt-3'>{category}</p>
    <p className=" font-bold px-3"><span className="text-red-600 px-3">₹</span>{price}</p>
    
    <div className='px-5 text-medium'>
        Description:
        <p className='text-slate-500'>{description}</p>
     </div>
     <div className='flex justify-between '>
    <div className='flex gap-3 px-5 pt-2'>
    <button onClick={()=>dispatch(increaqty(id))}className='bg-slate-400 hover:bg-slate-500  p-1 cursor-pointer rounded'><GoPlus/></button> 
    <p className='font-semi'>{qty}</p>   
    <button onClick={()=>dispatch(decreaqty(id))} className='bg-slate-400 hover:bg-slate-500 p-1 cursor-pointer rounded'><LuMinus/></button>    
     </div>
     
     <div className='flex items-center gap-2 font-bold text-slate-700'>
      <p>Total:</p>
      <p><span className="text-red-600 gap-2">₹</span>{total}</p>
     </div>
     </div>
     </div>
    </div>
  )
}

export default Cartproduct
