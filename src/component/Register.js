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
        seeConfirmPassword:false,
        emailAddressError:"",
        passwordError:"",
        confirmPasswordError:"" 
    })
  
    function validation(e){
        let newIsValid={...isValid}
        switch (e.target.name){
            case "emailAddress":{
               
                const regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                let isTrue=regex.test(e.target.value)
                if(isTrue){
                    newIsValid.emailAddress=e.target.value
                }
                else{
                    newIsValid.emailAddress=false
                    newIsValid.emailError="email not valid"
                }
            }
            break
            case "password":{
                const regex= /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}/g
                let isTrue=regex.test(e.target.value)
                if(isTrue){
                    newIsValid.password=e.target.value
                }
                else{
                    newIsValid.password=false
                    newIsValid.passwordError=" password must contain atleast 1 uppercase, lowercase and symbol"
                }
                
            }
            break
            case "confirmPassword":{
                if(e.target.value===isValid.password){
                    newIsValid.confirmPassword=e.target.value
                }
                else{
                    newIsValid.confirmPassword=false
                    newIsValid.confirmPasswordError="password not match"

                }
            }
            break
            
        }

        updateIsValid({...newIsValid})
        

    }
    function handlePassword(val){
        let newIsValid={...isValid}
        if(val==="password"){
            newIsValid.seePassword=!newIsValid.seePassword
        }
        else{
            newIsValid.seeConfirmPassword=!newIsValid.seeConfirmPassword
        }
        updateIsValid({...newIsValid})
    }
    function handleRegister(){
        let newIsValid={...isValid}
        Object.keys(newIsValid).map((item,index)=>{
            if(index<=2 && newIsValid[item]===true){
                newIsValid[item]=false
                let name=["Email address","Password","Password"]
                newIsValid[item+"Error"]=`${name[index]} cannot be empty`
            }


        })
        updateIsValid({...newIsValid})
       if( [isValid.emailAddress,isValid.password,isValid.confirmPassword].some(item=>item===false))return

       console.log(`register username: ${isValid.emailAddress} password:${isValid.password}`)
        
    }

  return (
    <section>
    <div className="page-header">
        <h1>Register</h1>
    </div>
    <div className="container">
        <div className='login-form'>
        <label>Email address</label>
          <div className="input-container">
               <input type="text" name='emailAddress' className={isValid.emailAddress? "":"email invalid"} onBlur={(e)=>validation(e)}/>
               <div className={isValid.emailAddress? "error-message":"error-message display"}>
                        {isValid.emailAddressError}
                </div>
          </div>
          


           <label >Password</label>
            <div className='input-container'>
                    <input type={isValid.seePassword?"text":"password"} name="password" className={isValid.password? "":"email invalid"} onBlur={(e)=>validation(e)}/>
                 <div className="password-icon">
                     {isValid.seePassword? <AiOutlineEye onClick={()=>handlePassword("password")}/>:<AiOutlineEyeInvisible onClick={()=>handlePassword("password")}/>}
                 </div>
                 <div className={isValid.password? "error-message":"error-message display"}>
                       {isValid.passwordError}
                </div>
           </div>


           <label >Confirm Password</label>
           <div className="input-container">
                 <input type={isValid.seeConfirmPassword?"text":"password"} name="confirmPassword" className={isValid.confirmPassword? "":"email invalid"} onBlur={(e)=>validation(e)}/>

                 <div className="password-icon">
                     {isValid.seeConfirmPassword? <AiOutlineEye onClick={()=>handlePassword("confirm")}/>:<AiOutlineEyeInvisible onClick={()=>handlePassword("confirm")}/>}
                 </div>

                 <div className={isValid.confirmPassword? "error-message":"error-message display"}>
                        {isValid.confirmPasswordError}
                </div>
           </div>
           <button className='btn-primary' onClick={handleRegister}>Register</button>
           
           <Link to="/login" className='to-register'>OR LOGIN</Link>
        </div>
       

    </div>
</section>
)
  
}

export default Register