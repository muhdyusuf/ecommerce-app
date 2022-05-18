import { createSlice } from "@reduxjs/toolkit"

export const likedSlice=createSlice({
    name:"liked",
    initialState:[

    ],
    reducers:{
        setLiked:(state,action)=>{
            return action.payload
        },
        addLiked:(state,action)=>{
            return action.payload.concat(state)
        },
        deleteLiked:(state,action)=>{
            return state.filter(item=>item.id!==action.payload.id)
        }
  
       
        
        
    }

})
export const{addLiked,deleteLiked,setLiked}=likedSlice.actions
export default likedSlice.reducer