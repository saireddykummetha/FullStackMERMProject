import React from 'react'
import { FaBookOpen } from "react-icons/fa6";
const Filterproduct = ({category,onClick}) => {
  return (
    <>
    <div onClick={onClick} >
       <div className='text-4xl flex p-5 w-20 h-20 bg-yellow-500 rounded-full cursor-pointer'>
              <FaBookOpen />
        </div>
        <p className='text-center font-medium my-1 '>{category}</p>
    </div>
    </>
  )
}

export default Filterproduct
