import React, { useEffect, useState } from 'react'
import Homecard from './Homecard'
import { useSelector } from 'react-redux'
import Cardfeatures from './Cardfeatures'

import Filterproduct from './Filterproduct';


const Home = () => {
  const productData=useSelector((state)=>state.product.productList)
 
  const homeproductcartlist=productData.slice(1,50)
  const homeproductcartlistcartlist=productData.filter(el=>el.category==='Mythologybook',[1])
 
  const loadingArray=new Array(8).fill(null)
  const loadingArrayFeature=new Array(10).fill(null)
  
  const categoryList=[...new Set(productData.map(el=>el.category))]
 

 
  const [datafilter,setdatafilter]=useState([])

useEffect(()=>{
  setdatafilter(productData)
},[productData])
  const handlefilterproduct=(category)=>{
    const filter=productData.filter(el=>el.category.toLowerCase()===category.toLowerCase())
    setdatafilter(()=>{
   return[
      ...filter
     ]
    })
  }
  return (
    <div className="p-2 md:p-4">

<div className='my-3'>
      <h2 className='font-bold text-ms px-5 text-slate-800'>FILTER YOUR BOOK</h2>
    </div>
    <div className='flex gap-10 justify-center '>
      {
        categoryList[0] && categoryList.map(el=>{
          return(
            <Filterproduct category={el} onClick={()=>handlefilterproduct(el)}/>
          )
        })
      }
    
    </div>
     
     <div className='flex flex-wrap justify-center gap-4 py-5'> 
      {
        datafilter.map(el=>{
          return(
            <Cardfeatures
                 key={el._id}
                 id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
            />
          )
        })
      }
     </div>
   
   <div className="py-3 justify-center align-center  grid">
        <div className='flex items-center'>
        <h2 className='font-bold text-ms text-slate-800 '>POPULAR SELLING BOOKS</h2>
    
        </div>
        
          <div className='flex gap-2 py-5 overflow-hidden' >
            {
              homeproductcartlistcartlist[0]? homeproductcartlistcartlist.map(el=>{
                return(
                  <Cardfeatures
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                  />
                );
              })
              :loadingArrayFeature.map((el,index)=>{
                return(
                 <Homecard
                 key={index}
                 loading={"Loading..."}
                 />
                )
              })
            }      
        </div>
     </div>

      <div className=" py-5">
      <h2 className="text-1xl font-bold p-10">Popular Categories in <span className='text-blue-700'>books</span></h2>
      </div>
      <div className='flex flex-wrap cursor-pointer gap-5 justify-center align-center px-10'>
      {
        homeproductcartlist[0] ? homeproductcartlist.map(el=>{
          return(
            <Homecard
            key={el._id}
            id={el._id}
            image={el.image}
            name={el.name}
            price={el.price}
            category={el.category}
            />
          )
        })
        :loadingArray.map((el,index)=>{
          return(
           <Homecard
           key={index}
           loading={"Loading..."}
           />
          )
        })
      }
     </div>

  
    </div>
  )
}

export default Home
