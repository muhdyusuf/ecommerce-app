import { createSlice } from "@reduxjs/toolkit"

export const checkoutSlice=createSlice({
    name:"checkout",
    initialState:[],
    reducers:{
       
        addCheckout:(state,actions)=>{
            return state=actions.payload
        },
        deleteCheckout:(state,actions)=>{
            return []

        }

    }

})
export const{addCheckout,deleteCheckout}=checkoutSlice.actions
export default checkoutSlice.reducer