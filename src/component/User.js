import React, { useState,useContext } from 'react'
import Input from './Input'
import {BsPerson} from 'react-icons/bs' 
import {FiEdit} from 'react-icons/fi' 
import './user.scss'
import {INPUTTYPE} from '../global-function/formValidation'

import {useSelector} from 'react-redux'

// import { useContext } from 'react'

function User() {

  
 const user=useSelector(state=>state.userState)

 const [readOnly,setReadState]=useState(true)
 const [userDetail,setUserDetail]=useState({
   
    userName:{
        name:"userName",
        value:user.userName,
        isValid:true,
        validationType:INPUTTYPE.USERNAME,
        label:"User Name",
        
    },
    emailAddress:{
        name:"emailAddress",
        value:user.emailAddress,
        isValid:true,
        validationType:INPUTTYPE.EMAILADDRESS,
        label:"Email Address",

        
    },
    phone:{
        name:"phone",
        value:user.phone,
        isValid:true,
        validationType:INPUTTYPE.PHONE,
        label:"Phone",
        
    },

 })

 function cancel(){
     setUserDetail({
        userName:{
            name:"userName",
            value:user.name,
            isValid:true,
            validationType:INPUTTYPE.USERNAME,
            label:"User Name",
            
        },
        emailAddress:{
            name:"emailAddress",
            value:user.emailAddress,
            isValid:true,
            validationType:INPUTTYPE.EMAILADDRESS,
            label:"Email Address",
    
            
        },
        phone:{
            name:"phone",
            value:user.phone,
            isValid:true,
            validationType:INPUTTYPE.PHONE,
            label:"Phone",
            
        },

     })
     setReadState(true)
 }

  return (
    <section className='user'>
        <div className="page-header user"
         style={{background:`url("https://i.pinimg.com/originals/db/04/00/db0400868e5aac451726ad8bb0f9a8f2.gif") cover center`}}
        >
            <h1>Lorem.</h1>
        </div>
        <div className='profile-picture'>
            <BsPerson/>
        </div>
        




        <div className="container">
            
            {/* <div className="input-detail">
                {Object.values(userDetail).map(item=>{
                   
                    return(
                        <Input 
                        initialState={item.value} 
                        validationType={item.validationType} 
                        inputLabel={item.label}
                        readOnly={readOnly}
                        />
                    )
                })}
                
         
            </div> 
            <div className="edit-user">
            {readOnly?
                <button onClick={()=>setReadState(false)}>
                <span>edit</span>
                <FiEdit/>
                </button>
                :
                <>
                <button>
                    save
                </button>
                <button onClick={cancel}>
                    cancel
                </button>
                
                
                </>
                
            
            }
        
        </div> */}
        <div className="user-detail">
            <div className="name">
                <p>Username</p>
                <p>{user.userName}</p>

            </div>
            <div className="email">
                <p>Email</p>
                <p>{user.emailAddress}</p>
            </div>
            <div className="phone">
                <p>Phone</p>
                <p>{user.phone.length===0?"set phone number":user.phone}</p>
            </div>


        </div>
       
        

        </div>
        
    </section>
  )
}

export default User