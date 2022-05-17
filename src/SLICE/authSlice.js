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
        setUser:(state,actions)=>{
            state.currentUser.id=actions.payload.id
        },
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
export const{setUser,login,logout}=authSlice.actions
export default authSlice.reducer