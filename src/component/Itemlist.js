import React from 'react'
import {FaHeart,FaRegHeart} from 'react-icons/fa'
import { useState } from 'react'
import Modal from './Modal'
import {useNavigate} from 'react-router-dom'

function Itemlist({data,updateUser,user}) {
   const [modal,updateModal]=useState([false,"liked","added"])

    function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
   }

    function updateUserCart(val){
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
    <div className=" grid">
        {data.map(item=>(
            <div key={item.id} className="card" onClick={()=>{navigate(`/product/${item.id}`)}} >
                <div className="card-img">
                    <img src={item.image} alt="" />
                    <div className="img-hover">
                        {isLiked(item)}
                        <button className='btn' onClick={()=>updateUserCart(item)}>ADD TO CART</button>
                    </div>
                </div>
                <p className="card-title">{item.title}</p>
                <p className="card-price">RM {item.price}</p>
            </div>

            )
        )}
        <Modal open={modal[0]}>{modal}</Modal>
        
    </div>
  )
}

export default Itemlist