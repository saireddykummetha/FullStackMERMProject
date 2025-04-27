import React from 'react'
import { useSelector } from 'react-redux'
import Cartproduct from './Cartproduct'

const Cart = () => {
    const productcart=useSelector((state)=>state.product.cartItem)
    console.log(productcart)
  return (
    <div className='p-1 md:p-4'>
      <h2 className='text-lg md:text-2xl font-bold text-slate-600'>Your Cart Item</h2>
       <div className='my-4'>
        <div className='w-full max-w-2xl'>
           {
            productcart.map(el=>{
              return(
               <Cartproduct
               key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              price={el.price}
              category={el.category}
              qty={el.qty}
              total={el.total}
               />
              )
            })
           }
        </div>
       </div>
    </div>
  )
}

export default Cart
