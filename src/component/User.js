import React, { useState } from 'react'
import {UserContext,LoginContext} from './UserContext'
import { useContext } from 'react'

function User() {

    // const{user,updateUser}=useContext(UserContext)
    let user={
        id:"aasdasd",
        userName:"",
        name:"lorem",
        address:{
          firstName:"",
          lastName:"",
          emailAddress:"lorem@ipsum.com",
          phone:"012338432",
          address:"lot 3 aras 20",
          poscode:"90000",
          city:"sandakan",
          state:"Sabah",
          country:"Malaysia",
        },
        wallet:100,
        checkout:[],
        cart:[],
        liked:[]
                     
      }
    const [readOnly,setReadOnly]=useState(true)

    let newUser={...user}
    
    function handleChange(e){
        console.log(e.target.value)
    }
function updateNewUser(){


}

  return (
    <section>
        <div className="page-header">
            <h1>{user.name}</h1>
        </div>
        <div className="container user">
            <img src="https://i.pinimg.com/originals/db/04/00/db0400868e5aac451726ad8bb0f9a8f2.gif" alt="" />
            {/* <div className="user-container">
                <div>
                    <label htmlFor="">Username</label>
                    <input type="text" readOnly={user.userName=="" && !readOnly ? false : true} value={user.userName}/>
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" readOnly value={user.emailAddress}/>
                </div>
                
                
                <div >
                    <label>Name</label>
                    <input type="text" readOnly={readOnly} value={readOnly? user.userName : newUser.userName}
                    onChange={(e)=>handleChange(e)}/>
                </div>
                <div className="user-edit">
                {readOnly && (
                    <button onClick={()=>setReadOnly(prev=>!prev)}>edit</button>
                )}
                {!readOnly && (
                    <>
                    <button onClick={updateNewUser}>save</button>
                    <button onClick={()=>setReadOnly(prev=>!prev)}>close</button>
                    </>
                )}
                </div>
                


            </div>









            <div className="wallet p1">
                <h3>Your Wallet</h3>
                <div>
                    <p>balance</p>
                    <p className="balance">RM{user.wallet}</p>
                </div>
                <button className='btn-primary mt-1'>Top up</button>
            </div> */}

        </div>
    </section>
  )
}

export default User