import { createSlice } from "@reduxjs/toolkit"

export const userSlice=createSlice({
    name:"user",
    initialState:{

        id:"",
        userName:"",
        phone:"",
        emailAddress:"",
        address:[
        {
            firstName:"",
            lastName:"",
            address:"",
            city:"",
            state:"",
            country:"",
            id:""
        }
        ],
        wallet:100,
        
    },
    reducers:{
        setUser:(state,action)=>{
            state=action.payload

        },
        setId:(state)=>{
            state.id="aadasdasd"
        },
        updateUserName:(state,action)=>{
            state.userName=action.payload.userName
        },
        updatePhone:(state,action)=>{
            state.phone=action.payload.phone
        },
        updateEmailAddress:(state,action)=>{
            state.emailAddress=action.payload
        },
        updateWallet:(state,action)=>{
            if(action.type==="deduct"){
              state.wallet-=action.payload.value
            }
            else{
                state.wallet+=action.payload.value
            }
            
        },
        addAddress:(state,action)=>{
            state.address.push(action.payload)
        },
        deleteAddress:(state,action)=>{
            let newAddress=[...state.address]
            state.address=newAddress.filter(item=>item.id!==action.payload.id)

        },
        updateAddress:(state,action)=>{
            let newAddress=[...state.address]
            state.address=newAddress.map(item=>{
                if(item.id===action.payload.id){
                    return {...action.payload}
                }
                else{
                    return item
                }
            })

        }
        

       
        
        
    }

})
export const{setId,updateUserName,updateEmailAddress,updatePhone,updateAddress,deleteAddress,addAddress,updateWallet}=userSlice.actions
export default userSlice.reducer