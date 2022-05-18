import { createSlice } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"


export const ACTION_TYPE={
    ADDCARTQUANTITY:"addCartQuantity",
    REDUCECARTQUANTITY:"reduceCartQuantity",
    MERGECARTQUANTITY:"mergeCartQuantity"

}


export const cartSlice=createSlice({
    name:"cart",
    initialState:[

    ],
    reducers:{
        setCart:(state,action)=>{
            return action.payload
        },
        addCart:(state,action)=>{
         
           return action.payload.concat(state)
        },
        deleteCart:(state,action)=>{
            state=state.filter(item=>item.id!==action.payload.id)
        },
        addCartQuantity:(state,action)=>{
           
            return state.map(item=>{
                if(item.id===action.payload.id){
                let quantity=item.quantity
                   if(item.quantity===30){
                       quantity=30
                   }
                   else{
                       quantity+=1
                   }
                   return {...item,quantity:quantity}
                 
                }
                else{
                    return item
                }
            })

          
        },
        reduceCartQuantity:(state,action)=>{
        
            return state.map(item=>{
                if(item.id===action.payload.id){
                let quantity=item.quantity
                   if(item.quantity===1){
                       quantity=1
                   }
                   else{
                       quantity-=1
                   }
                   return {...item,quantity:quantity}
                 
                }
                else{
                    return item
                }
            })

          
        },
        mergeCartQuantity:(state,action)=>{
            console.log(action)
            state=state.map(item=>{
                if(item.id===action.payload.id){
                   return {...item,quantity:item.quantity+action.payload.quantity}
                }
                else{
                    return item
                }
            })

          
        },
       
       
        
        
    }

})
export const{addCart,deleteCart,addCartQuantity,reduceCartQuantity,mergeCartQuantity,setCart}=cartSlice.actions
export default cartSlice.reducer