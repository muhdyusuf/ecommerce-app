import { createSlice } from "@reduxjs/toolkit"

export const likedSlice=createSlice({
    name:"liked",
    initialState:[

    ],
    reducers:{
        addLiked:(state,action)=>{
            state.push(action.payload)
        },
        deleteLiked:(state,action)=>{
            state=state.filter(item=>item.id!==action.payload.id)
        }
  
       
        
        
    }

})
export const{addLiked,deleteLiked}=likedSlice.actions
export default likedSlice.reducer