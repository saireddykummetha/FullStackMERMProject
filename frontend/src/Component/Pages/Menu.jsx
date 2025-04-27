import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addCartItem } from '../../redux/productSlice'

const Menu = () => {
    const {filterby}=useParams()
    
    const productData=useSelector(state=>state.product.productList)
    const productDisplay=productData.filter(el=>el._id===filterby)[0]
    console.log(productDisplay)
 const dispatch=useDispatch()
    const handlecartproduct=(e)=>{
        // e.stopPropagation()
        dispatch(addCartItem(productDisplay) )
      }
  return (
    <div>
     <div className='w-full max-w-3xl mt-10 m-auto bg-white bg-slate-300 flex md:flex md:auto'>
      <div className='w-1/2 shadow overflow-hidden '>
        <img src={productDisplay.image} className='hover:scale-105 transform-all'/>
        
      </div>
      <div>
      <h3 className='font-semibold text-slate-600 capitalize text-lg mt-3 text-2xl md:text-3xl px-5'>{productDisplay.name}</h3>
    <p className=' text-slate-500 font-medium px-5 pt-3'>{productDisplay.category}</p>
    <p className=" font-bold px-3"><span className="text-red-600 px-3">₹</span>{productDisplay.price}</p>
    
    <div className='px-5 text-medium'>
        Description:
        <p className='text-slate-500'>{productDisplay.description}</p>
     </div>
    <div className='text-center py-5 px-30'>
    <button className='bg-yellow-400 hover:bg-yellow-500 w-25 cursor-pointer h-8 rounded-full'onClick={handlecartproduct}>Addcart</button>    
     </div>
     
     </div>
     </div>
    </div>
  )
}

export default Menu
