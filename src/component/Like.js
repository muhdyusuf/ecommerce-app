import React from 'react'
import Cart from './Cart'
import './Like.css'
import {BsPlus} from 'react-icons/bs'

function Like({user,updateUser}) {
  function removeFromLiked(val){
    let newUser={...user}
    console.log(newUser)
    const itemIndex=newUser.liked.findIndex(item=>item.id==val.id)
    newUser.liked.splice(itemIndex,1)
    updateUser({...newUser})


     
  }
  function addToCart(val){
    let newUser={...user}
    const itemIndex=newUser.cart.findIndex(item=>item.id==val.id)
    console.log(itemIndex)
    if(itemIndex>=0){
      newUser.cart[itemIndex].quantity+=1
      

    }
    else{
      newUser.cart.push(val)
      console.log(newUser.cart)
    }
    const likedIndex=newUser.liked.findIndex(item=>item.id==val.id)
    newUser.liked.splice(likedIndex,1)
   
    updateUser({...newUser})
     
  }

 let likedItem=()=>{
   const liked=[...user.liked]
   console.log(liked)
   if(liked.length==0 || !liked){
     return(
      <p>No item in your list</p>
     )
   }

   else{
     return(
      <div className="liked-container">
        <div className="liked-container-header">
          <h3>Product</h3>
          <h3>Price</h3>
        </div>
            {
              liked.map(item=>{
                return(
                  <div className="liked-item" key={item.id}>
                    <div className="liked-img">
                      <img src={item.image} alt="" />
                    </div>
                    <p>{item.title}</p>
                    <p>RM {item.price}</p>
                    <button className='add-to-btn' onClick={()=>addToCart(item)}>Add to cart</button>
                    <BsPlus className='remove-btn' onClick={()=>removeFromLiked(item)}/>
                  </div>

                )
               }
              )
            }

          
      </div>
       
       
     )
   }
 }
  return (
    <section>
      <div className="page-header">
        <h1>Like</h1>
      </div>
      <div className="container">
        {likedItem()}
        
      </div>
    </section>
  )
}

export default Like