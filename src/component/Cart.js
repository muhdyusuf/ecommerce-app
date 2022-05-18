import React, { useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import './Cart.css'

import{TiMinus,TiPlus} from 'react-icons/ti'

// selector
import {useSelector,useDispatch} from 'react-redux'
import { addCart,deleteCart,addCartQuantity,reduceCartQuantity, setCart} from '../SLICE/cartSlice'
import {addLiked,deleteLiked} from '../SLICE/likedSlice'
import {addCheckout} from '../SLICE/checkoutSlice'
import {updateModal} from '../SLICE/utilsSlice'

import {round} from '../global-function/function'




function Cart() {


 
  const dispatch=useDispatch()

  const checkout=useSelector(state=>state.checkoutState)
  const cart=useSelector(state=>state.cartState)
  const _user=useSelector(state=>state.userState)
  const liked=useSelector(state=>state.likedState)

  



  let navigate=useNavigate()

  useEffect(()=>{
    
    let newCart=cart.map(item=>{
      if(!item.hasOwnProperty("isChecked")){
        return{...item,isChecked:false}

      }
      else{
        return item
      }
    })
    dispatch(setCart(newCart))
 
  },[])

  
  const isAllSelected=cart.every(item=>item.isChecked==true)

  const isChecked=(id)=>{
    const itemIndex=cart.findIndex(item=>item.id==id)
    return cart[itemIndex].isChecked
  }
 

 function deleteItem(){
   let newCart=cart.filter(item=>!item.isChecked)
   dispatch(setCart(newCart))
   
 }


 function handleCheckbox(id){
   let newCart=[...cart]

   if(id==="all"){

     if(isAllSelected){
       console.log("all selected")
      newCart=cart.map(item=>{
        return {...item,isChecked:false}
      })
     }
     else{
      console.log(id)
      newCart=cart.map(item=>{
        return {...item,isChecked:true}
      })
     }
     dispatch(setCart(newCart))
     
   }
 
   else{
    
    newCart=cart.map(item=>{
      
      if(item.id===id){
        return {...item,isChecked:!item.isChecked}
      }
      else{  
        return item
      }
    })
    dispatch(setCart(newCart))
  }
    
   
   
 }

  function setQuantity(operator,id){
   
    let index=cart.findIndex(item=>item.id===id)
    if(operator==="minus"){
      dispatch( reduceCartQuantity({id}))
    }
    else if(operator==="plus"){
      dispatch(addCartQuantity({id}))

      
    }
    

  }

function handleCheckOut(){
  const selectedItem=cart.filter(item=>item.isChecked)
  if(selectedItem.length==0){
    dispatch(updateModal({
      text:"Select some item",
      isActive:true
    }))
    
  }
  else{
    dispatch(addCheckout(selectedItem))
    navigate('/checkout')
  

  }

}





 const cartItem=()=>{
  function moveToLiked(){
    
    let likedList=cart.filter(item=>{
      if(item.isChecked && liked.every(liked=>liked.id!==item.id)){
        return true
      }
      else{
        return false
      }
    
    
    
    
    })
        dispatch(addLiked(likedList))
    
    
  
  }
  
   let total=cart.reduce((total,item)=>{
      if(item.isChecked){
       return item.price*item.quantity+total
      }
      else{
       return 0+total
      }
     }
   ,0)
  
   total=round(total)

   if (cart.length==0 || !cart){
     return(
      <div className="cart-container no-item">
        <p>please add item in your cart</p>
        
        
      </div>
    
      
     )
   }
   else{
     return(
      <div className="cart-container">
        <div className="list">
          <div className="list-header">
            <span></span>
            <p>Product</p>
            <p>Unit Price </p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
          {cart.map(item=>{
            return(
              <div className="cart-list-item" key={item.id}>

                  <input type="checkbox" onChange={()=>handleCheckbox(item.id)} checked={isChecked(item.id)} />
                  <div>
                    <div className="list-item-img" onClick={()=>
                    navigate(`/product/${item.id}`)}>
                      <img src={item.image} alt="" />
                    </div>
                    <p>{item.title}</p>
                  </div>
                  <p className='unit-price'>{item.price}</p>
                  <div className="cart-item-quantity">
                    <TiMinus onClick={()=>setQuantity("minus",item.id)}/>
                    <p>{item.quantity}</p>
                    <TiPlus onClick={()=>setQuantity("plus",item.id)}/>
                  </div>
                 
                  <p>RM {round(item.price*item.quantity)}</p>
              </div>
            )
            })}
          
        </div>

        <div className="cart-total">
          <div>
          <input type="checkbox" name='selectAll' onChange={()=>handleCheckbox("all") } checked={isAllSelected}/>
          <label htmlFor="selectAll" className='mr-1'>Select all</label>
          <div  className="mr-1" onClick={deleteItem}>Delete</div>
          <div className='mr-1' onClick={moveToLiked}>Move to Like</div>
          </div>

          <p>Total : <span>RM{total}</span></p>
         
          <div>
           
            <button onClick={handleCheckOut}>Check Out</button>
          </div>
          

        </div>
      </div>
     )
   }

 }
  return (
    <section>
      <div className="page-header">
       <h1>Shopping cart</h1>
      </div>
      <div className="container">
       
        {cartItem()}
        

      </div>
    </section>
  )
}

export default Cart