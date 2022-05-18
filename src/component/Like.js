import {React,useContext} from 'react'
import Cart from './Cart'
import './Like.css'
import {BsPlus} from 'react-icons/bs'

import {useSelector,useDispatch} from 'react-redux'

import {addCart,addCartQuantity} from '../SLICE/cartSlice'
import {addLiked,deleteLiked} from '../SLICE/likedSlice'
import {updateModal} from '../SLICE/utilsSlice'


function Like() {

  const dispatch=useDispatch()
  // selector
  const isLogIn=useSelector(state=>state.authState.isAuthorized)
  const cart=useSelector(state=>state.cartState)
  const liked=useSelector(state=>state.likedState)
  
  

  function updateUserCart(val){
    
    const isDuplicate=cart.findIndex(item=>item.id==val.id)
    
    if(isDuplicate<0){
        let newItem={...val}
        dispatch(addCart([{...newItem,quantity:1}]))
    }
    else if(isDuplicate>=0){
        dispatch(addCartQuantity(val))
        console.log(cart)
    }

    dispatch(updateModal({
      text:"Item added to cart",
      isActive:true
    }))
  
     
}


function updateUserLiked(val){
  
       dispatch(deleteLiked({id:val.id}))

       dispatch(updateModal({
        text:"Item removed from",
        isActive:true
      }))
    
    

 


    

     
  }
 let likedItem=()=>{
  
   if(liked.length==0 || !liked){
     return(
       <div className="liked-container no-item">
         <p>No item in your list</p>
       </div>
      
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
                      <img src={item.image} alt={item.name} />
                    </div>
                    <p >{item.title}</p>
                    <p className='cart-price'>RM {item.price}</p>
                    <button className='add-to-btn' onClick={()=>updateUserCart(item)}>Add to cart</button>
                    <BsPlus className='remove-btn' onClick={()=>updateUserLiked(item)}/>
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