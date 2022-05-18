import { createSlice } from "@reduxjs/toolkit"

export const authSlice=createSlice({
    name:"cart",
    initialState:{
        currentUser:{
            id:""
        },
        isAuthorized:false

    },
    reducers:{
       
        login:(state,actions)=>{
            state.isAuthorized=true
            state.currentUser.id=actions.payload.id
        },
        logout:(state,actions)=>{
            state.isAuthorized=false
            state.currentUser.id=""

        }

        
        
    }

})
export const{setAuth,login,logout}=authSlice.actions
export default authSlice.reducer