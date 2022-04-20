import React from 'react'
import Login from './Login'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'

function Register() {
    const [isValid,updateIsValid]=useState({
        emailAddress:true,
        password:true,
        confirmPassword:true,
        seePassword:false,
        seeConfirmPassword:false  
    })
  
    function validation(e){
        let newIsValid={...isValid}
        switch (e.target.name){
            case "emailAddress":{
                console.log("hjkhjk")
                const regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                let isTrue=regex.test(e.target.value)
                isTrue? newIsValid.emailAddress=e.target.value: newIsValid.emailAddress=false
            }
            break
            case "password":{
                const regex= /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}/g
                let isTrue=regex.test(e.target.value)
                isTrue? newIsValid.password=e.target.value: newIsValid.password=false
                
            }
            break
            case "confirmPassword":{
                if(e.target.value===isValid.password){
                    newIsValid.confirmPassword=true
                }
                else{
                    newIsValid.confirmPassword=false

                }
            }
            break
            
        }

        updateIsValid({...newIsValid})
        

    }
    function handlePassword(val){
        let newIsValid={...isValid}
        if(val=="password"){
            newIsValid.seePassword=!newIsValid.seePassword
        }
        else{
            newIsValid.seeConfirmPassword=!newIsValid.seeConfirmPassword
        }
        updateIsValid({...newIsValid})
    }

  return (
    <section>
    <div className="page-header">
        <h1>Register</h1>
    </div>
    <div className="container">
        <form action="" className='login-form'>
        <label>Email address</label>
          <div className="input-container">
               <input type="text" name='emailAddress' className={isValid.emailAddress? "":"email invalid"} onBlur={(e)=>validation(e)}/>
               <div className={isValid.emailAddress? "error-message":"error-message display"}>
                        email not valid
                </div>
          </div>
          


           <label >Password</label>
            <div className='input-container'>
                    <input type={isValid.seePassword?"text":"password"} name="password" className={isValid.password? "":"email invalid"} onBlur={(e)=>validation(e)}/>
                 <div className="password-icon">
                     {isValid.seePassword? <AiOutlineEye onClick={()=>handlePassword("password")}/>:<AiOutlineEyeInvisible onClick={()=>handlePassword("password")}/>}
                 </div>
                 <div className={isValid.password? "error-message":"error-message display"}>
                        password must contain atleast 1 uppercase, lowercase and symbol
                </div>
           </div>


           <label >Confirm Password</label>
           <div className="input-container">
                 <input type={isValid.seeConfirmPassword?"text":"password"} name="confirmPassword" className={isValid.confirmPassword? "":"email invalid"} onBlur={(e)=>validation(e)}/>

                 <div className="password-icon">
                     {isValid.seeConfirmPassword? <AiOutlineEye onClick={()=>handlePassword("confirm")}/>:<AiOutlineEyeInvisible onClick={()=>handlePassword("confirm")}/>}
                 </div>

                 <div className={isValid.confirmPassword? "error-message":"error-message display"}>
                        password not match
                </div>
           </div>
           <button className='btn-primary'>Register</button>
           
           <Link to="/login" className='to-register'>OR LOGIN</Link>
        </form>
       

    </div>
</section>
)
  
}

export default Register