import React from 'react'

const Homecard = ({name,image,category,price,loading}) => {
  return (
    <div className="  bg-white p-3 rounded h-80 min-w-[200px] max-w-[200px] overflow-none">
     {
        name ? (
        <>
    <div className='w-40 '>
       <img src={image} className='h-40 flex felx-col justify-center items-center'/>
     </div>
     <h3 className='mt-3 font-semibold text-slate-600 grid capitalize text-sm'>{name}</h3>
    <p className='  mt-1 text-slate-700 font-medium'>{category}</p>
    <p className=" mt-1 font-bold"><span className="text-red-600">₹</span>{price}</p>
    
    </>
    ):
    <div className='flex justify-center items-center h-full'>
    <p>{loading}</p>
    </div>
     }
    </div>
  )
}


export default Homecard
