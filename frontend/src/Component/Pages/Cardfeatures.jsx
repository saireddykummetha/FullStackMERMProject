import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem } from '../../redux/productSlice'
import { useDispatch } from 'react-redux'
const Cardfeatures = ({name,image,category,price,loading,id}) => {
  const dispatch=useDispatch()
  const handlecartproduct=(e)=>{
    // e.stopPropagation()
    dispatch(addCartItem({
      _id:id,
      name:name,
      price:price,
      category:category,
      image:image,
    }) )
  }

 
  return (
    <div className=' min-w-[200px] max-w-[200px] bg-white drop-shadow-lg hover:shadow-lg cursor-pointer p-4 py-5 px-4'>
    {
       image ? <>
       <Link to={`menu/${id}`}>
      <div className='h-40 flex felx-col justify-center items-center'>
       <img src={image} className='h-full'/>
     </div>
     <h3 className='font-semibold text-slate-600 capitalize text-sm mt-3'>{name}</h3>
    <p className=' text-slate-500 mt-1 font-medium'>{category}</p>
    <p className=" font-bold mt-1"><span className="text-red-600 mt-1">₹</span>{price}</p>
    </Link>
    <div className='text-center py-4'>
    <button className='bg-yellow-400 hover:bg-yellow-500 w-25 cursor-pointer h-8 rounded-full'
    onClick={handlecartproduct}>Addcart</button>
    </div>
    
    </>
    :
    <div className='min-h-[150px] flex justify-center items-center'>
    <p>{loading}</p>
    </div>
    } 
    </div>
  )
}

export default Cardfeatures
