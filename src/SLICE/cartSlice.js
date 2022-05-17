import { createSlice } from "@reduxjs/toolkit"

const ACTION_TYPE={
    ADDCARTQUANTITY:"addCartQuantity",
    REDUCECARTQUANTITY:"reduceCartQuantity",
    MERGECARTQUANTITY:"mergeCartQuantity"

}

export const cartSlice=createSlice({
    name:"cart",
    initialState:[

    ],
    reducers:{
        addCart:(state,action)=>{
            state.push(action.payload)
        },
        deleteCart:(state,action)=>{
            state=state.filter(item=>item.id!==action.payload.id)
        },
        updateCart:(state,action)=>{
            let newcart=[...state].map(item=>{
                if(item.id===action.payload.id){
                    if(action.type===ACTION_TYPE.ADDCARTQUANTITY){
                        return {...item,quantity:item.quantity++}
                    }
                    else if(ACTION_TYPE.REDUCEITEMQUANTITY){
                        if(action.type===ACTION_TYPE.REDUCECARTQUANTITY){
                            return {...item,quantity:item.quantity--}
                        }
                    }
                    else if(action.type===ACTION_TYPE.MERGECARTQUANTITY ){
                        return {...item,quantity:item.quantity+action.payload.quantity}
                    }
                    
                }
                else{
                    return item
                }
            })

            state=newcart
        },
       
        
        
    }

})
export const{addCart,deleteCart,updateCart}=cartSlice.actions
export default cartSlice.reducer