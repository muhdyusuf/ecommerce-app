import {React,useEffect} from 'react'

import {FaHeart,FaRegHeart} from 'react-icons/fa'
import { useState } from 'react'
import Modal from './Modal'
import {useNavigate} from 'react-router-dom'
import './Itemlist.css'

function Itemlist({dataProps,isLogIn,updateUser,user,shopFilter,length}) {
  function capitalize(str)
  {
    return str[0].toUpperCase() + str.slice(1);
  }
    const filteredItem=()=>{
        let filteredItem=[...data]
       
        if(!shopFilter) return filteredItem
        if(shopFilter.min!==""){
          filteredItem=filteredItem.filter(item=>{
            if(item.price>=shopFilter.min && item.price<=shopFilter.max) return true
            else{
                return false
            }
          })
        }
        
        if(shopFilter.category.length>0){
          filteredItem=filteredItem.filter(item=>{
            let isTrue=shopFilter.category.some(filter=>item.category==filter)
            if(isTrue)return true
            return false

          })
        }
  
        if(shopFilter.rating){
          filteredItem=filteredItem.filter(item=>{
            if(item.rating.rate>=shopFilter.rating) return true
            return false
          })
        }
        if(shopFilter.sorter=="lowToHigh"){
          filteredItem=filteredItem.sort((a,b)=>a.price-b.price)
        }
        if(shopFilter.sorter=="highToLow"){
          filteredItem=filteredItem.sort((a,b)=>b.price-a.price)
        }
   
     
       return filteredItem
  
      }

   const [modal,updateModal]=useState([false,""])
   const [data,updateData]=useState(null)

   useEffect(()=>{
     updateData(null)
       if(dataProps[0]=="all"){
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>updateData(json))
       }
       else if(dataProps[0]=="category"){
        fetch(`https://fakestoreapi.com/products/category/${dataProps[1]}`)
        .then(res=>res.json())
        .then(json=>{
          console.log(json)

          if (length && json.length>length){
            json.splice(length)
            console.log(json)
          }
          
          updateData(json)})

       }
       else if(dataProps[0]=="search"){
        let search
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>{
          search=json
          
          search=search.filter(item=>{
            const obj=Object.values(item)
            let regex=new RegExp(dataProps[1],'gi')
            let isTrue=obj.some(item=>regex.test(item))
            if(isTrue)return true
            return false
          })
          console.log(search)
          if(search.length==0){
            updateData([])
          }
          else{
            updateData([...search])
          }


        })

       }
       

   },dataProps)

   const skeleton=()=>{
     if(data===null|| !data){
      let skeleton=[]
      let skeletonLength=length? length : 20
      for(let i=0;i<skeletonLength;i++){
          skeleton.push(
            <div key={i} className="card"  >
                <div className="card-img skeleton">

                </div>
                <p className="card-title skeleton"></p>
                <p className="card-price skeleton"></p>
             </div>
          )
      }
      return (
        <div className='grid'>
          {skeleton}
        </div>
      )
     }
     else if(data.length===0){
       if(dataProps[0]==="search"){
         return(
           <div>
             <p>No item for keyword '{dataProps[1]}'</p>
           </div>
         )
       }
     }
     else{
       
       return(
         <>{filteredItem().length>0 ? (
          <div className=" grid">
       
          {
               filteredItem().map(item=>(
                   <div key={item.id} className="card"  >
                       <div className="card-img">
                           <img src={item.image} alt="" onClick={()=>{navigate(`/product/${item.id}`)}} />
                           <div className="img-hover" >
                               {isLiked(item)}
                               <button className='btn' onClick={()=>updateUserCart(item)}>ADD TO CART</button>
                           </div>
                       </div>
                       <p className="card-title">{item.title.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}</p>
                       <p className="card-price">RM {item.price}</p>
                   </div>
       
                   )
               )
          }
          
   
   
   
          
           <Modal open={modal[0]}>{modal[1]}</Modal>
           
           
       </div>
         ) :
         (
           <div>
             <p>no item match filter</p>
           </div>
         )}
         </>
         
         
        

       )
     }
    
   }
   

    function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
   }

    function updateUserCart(val){
        if(!isLogIn){
            navigate(`/login`)
            console.log(isLogIn)
            return
        }
        const newUser=user
        
        const isDuplicate=newUser.cart.findIndex(item=>item.id==val.id)
        console.log(isDuplicate)
        if(isDuplicate<0){
            val.quantity=1
            newUser.cart=newUser.cart.concat(val)
            
            
        }
        else if(isDuplicate>=0){
            newUser.cart[isDuplicate].quantity+=1
            

        }

        console.log(newUser)
        updateUser({...newUser})
        updateModal([true,"Item added to cart"])
        delay(1000).then(()=>updateModal([false,"Item added to cart"]))
         
    }


    function updateUserLiked(val){
        if(!isLogIn){
            navigate(`/login`)
            return
        }
        else{
            const newUser=user
        const isDuplicate=newUser.liked.findIndex(item=>item.id==val.id)
        if(isDuplicate<0){
            val.quantity=1
            newUser.liked=newUser.liked.concat(val)
            updateModal([true,"Item added to liked"])
            delay(1000).then(()=>updateModal([false,"Item added to liked"]))
            
        }
        else if(isDuplicate>=0){
            newUser.liked.splice(isDuplicate,1)
            updateModal([true,"Item removed from liked"])
        delay(1000).then(()=>updateModal([false,"Item removed from liked"]))
            
        }
       
        updateUser({...newUser})
        


        }

         
      }


     const isLiked=(val)=>{
        const isDuplicate=user.liked.findIndex(item=>item.id==val.id)
        if(isDuplicate<0){
            return (
                <FaRegHeart onClick={()=>updateUserLiked(val)}/>
            )
        }
        else if(isDuplicate>=0){
            return(
                <FaHeart onClick={()=>updateUserLiked(val)} className="liked-icon-fill"/>
            )
        }

    }
    let navigate=useNavigate()
   
   

  return (
    <>
    {skeleton()}
    
    </>
    
  )
}

export default Itemlist
