import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Cart.css'


function Cart({user,updateUser}) {
  let navigate=useNavigate()

  useEffect(()=>{
    updateUser(user=>{
      let newUser={...user}
      newUser.cart.forEach(item=>item.isChecked=false)
      return({...newUser})
    })
  
  },[])


  
  
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
      <div className="cart-container">
        <h2>please add item in your cart</h2>
        
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
                    <div className="list-item-img">
                      <img src={item.image} alt="" />
                    </div>
                    <p>{item.title}</p>
                  </div>
                  <p>{item.price}</p>
                  <p>{item.quantity}</p>
                  <p>{item.price*item.quantity}</p>
              </div>
            )
          })}
          
        </div>
        <div className="cart-total">
          <div>
          <input type="checkbox" name='selectAll' onChange={()=>handleCheckbox("all") } checked={isAllSelected}/>
          <label htmlFor="selectAll" className='mr-1'>Select all</label>
          <div onClick={deleteItem} className="mr-1">Delete</div>
          <div className='mr-1'>Move to Like</div>
          </div>
          <div>
            <p>Total : <span>RM{total}</span></p>
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