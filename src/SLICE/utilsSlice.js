import { createSlice } from "@reduxjs/toolkit"

export const utilsSlice=createSlice({
    name:"utils",
    initialState:{
        modal:{
            isActive:false,
            text:"",
        },
        theme:"dark"
    },
    reducers:{
        updateTheme:(state)=>{
            state.theme=state.theme==="dark"?"light":"dark"
        },
        updateModal:(state,actions)=>{
           state.modal=actions.payload
          
        }

    }

})
export const{updateTheme,updateModal}=utilsSlice.actions
export default utilsSlice.reducer