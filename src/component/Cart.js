import React, { useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import './Cart.css'
import {addToLiked} from '../CRUD/CREATE.JS'
import {LoginContext,UserContext} from './UserContext'
import{TiMinus,TiPlus} from 'react-icons/ti'




function Cart() {


  const {user,updateUser}=useContext(UserContext)
  const {modal,updateModal}=useContext(UserContext)

  




  let navigate=useNavigate()

  useEffect(()=>{
    updateUser(user=>{
      let newUser={...user}
      newUser.cart.forEach(item=>item.isChecked=false)
      return({...newUser})
    })
  
  },[])

  function addLiked(){
    let likedList=user.cart.filter(item=>item.isChecked)
    console.log(likedList)
    function addToLiked(item){
      let newUser={...user}

      let userLiked=newUser.liked
      item.map(item=>{
          let index=userLiked.findIndex(liked=>liked.id===item.id)
          if(index===-1){
              userLiked.push(item)
          }
          
      })
      console.log(newUser.liked)
      updateUser({...newUser})
      deleteItem()
  
    }
    addToLiked(likedList)
    updateModal([true,"All item added to like"])
   

    
    

  }
  


  
  
  const isAllSelected=user.cart.every(item=>item.isChecked==true)

  const isChecked=(id)=>{
    const itemIndex=user.cart.findIndex(item=>item.id==id)
    return user.cart[itemIndex].isChecked


  }
 

 function deleteItem(){
   let newUser={...user}
   newUser.cart=newUser.cart.filter(item=>!item.isChecked)
   updateUser({...newUser})

 }
 function handleCheckbox(id){
  let newUser={...user}

   if(id=="all"){
     if(isAllSelected){
      newUser.cart.forEach(item=>item.isChecked=false)
     }
     else{
      newUser.cart.forEach(item=>item.isChecked=true)
     
  
     }
     
  
   }
 
   else{
    
    const itemIndex=newUser.cart.findIndex(item=>item.id==id)
   
    newUser.cart[itemIndex].isChecked=!newUser.cart[itemIndex].isChecked
    
   }
    
   console.log(newUser)
    updateUser({...newUser})
   
   
   
 }

function setQuantity(operator,id){
  let newUser={...user}
  let index=user.cart.findIndex(item=>item.id===id)
  if(operator==="minus" && user.cart[index].quantity >1){
    newUser.cart[index].quantity-=1
  }
  else if(operator==="plus"){
    newUser.cart[index].quantity+=1

  }
  
  updateUser({...newUser})
  

  

}

function handleCheckOut(){
  const selectedItem=user.cart.filter(item=>item.isChecked)
  if(selectedItem.length==0){
    return
  }
  else{
    navigate('/checkout')
    let newUser={...user}
    newUser.checkout=selectedItem
    updateUser({...newUser})
    

  }

}



 const cartItem=()=>{
   const total=user.cart.reduce((total,item)=>{
      if(item.isChecked){
       return item.price*item.quantity+total
      }
      else{
       return 0+total
      }
     }
   ,0)

   if (user.cart.length==0 || !user.cart){
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
          {user.cart.map(item=>{
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
                  <p>{item.price}</p>
                  <div className="cart-item-quantity">
                    <TiMinus onClick={()=>setQuantity("minus",item.id)}/>
                    <p>{item.quantity}</p>
                    <TiPlus onClick={()=>setQuantity("plus",item.id)}/>
                  </div>
                 
                  <p>RM {item.price*item.quantity}</p>
              </div>
            )
          })}
          
        </div>
        <div className="cart-total">
          <div>
          <input type="checkbox" name='selectAll' onChange={()=>handleCheckbox("all") } checked={isAllSelected}/>
          <label htmlFor="selectAll" className='mr-1'>Select all</label>
          <div onClick={deleteItem} className="mr-1">Delete</div>
          <div className='mr-1' onClick={addLiked}>Move to Like</div>
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