import React, { useContext } from 'react'
import './Register.css'
import {FAKEUSERAPI} from '../FAKEFETCHUSER'




import { Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'

import { useDispatch,useSelector} from 'react-redux'
import {login} from '../SLICE/authSlice'
import {setUser} from '../SLICE/userSlice'








  



function Register() {
    const user=useSelector(state=>state.userState)
    let navigate=useNavigate()

    const dispatch=useDispatch()
    
    
    // const{updateUser}=useContext(UserContext)
    // const{updateLogin}=useContext(LoginContext)
    
    const [isRegister,updateRegister]=useState(false)
    // const {modal,updateModal}=useContext(UserContext)

    const [isValid,updateIsValid]=useState({
        emailAddress:true,
        password:true,
        confirmPassword:true,
        userName:true,
        seePassword:false,
        seeConfirmPassword:false,
        emailAddressError:"",
        passwordError:"",
        confirmPasswordError:"" ,
        userNameError:""
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
            case "username":{
                if(/^[a-z]+_?[0-9a-z]*$/i.test(e.target.value)){
                    newIsValid.userName=e.target.value
                }
                else{
                    newIsValid.userNameError="username should start with letter and end with letter or number,only one underscore allowed"
                    newIsValid.userName=false
                }

            }
            
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
       if( [isValid.emailAddress,isValid.password,isValid.confirmPassword].some(item=>item===false || item===true))return
       else{
           updateRegister(true)
       }
        
    }

    function registerUser(){
        if(isValid.userName === true || isValid.userName ===false)
        return
        // updateModal([true,"",[]])
        
        console.log(isValid.userName)

        // FAKEUSERAPI.then(res=>{
        //     user={...res,name:isValid.userName,emailAddress:isValid.emailAddress}
        //     return user
        // }).then(user=>{
        // console.log(user)
            //  updateModal([false])
            //  updateModal([true,"User Registered"])
            
            //})

        dispatch(login({
            id:"1111"
        }))
        dispatch(setUser({
            id:"",
            userName:isValid.userName,
            phone:"",
            emailAddress:isValid.emailAddress,
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
        }))
        console.log("user",user)
        navigate('/')
        updateRegister(false)


       

    }

  return (
    <section>
        {!isRegister && (
        <>
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
       </>)}

        {isRegister && (
            <div className="container set-username">
            <div className="username-card">
                <FaRegUserCircle/>
                <label >Set Username</label>
                <div className="input-container">
                    <input type="text" name="username" className={isValid.userName? "":"username-invalid"} onBlur={(e)=>validation(e)}/>
                    <div className={isValid.userName? "error-message":"error-message display"}>
                                {isValid.userNameError}
                    </div>
                </div>
                <button className="btn-primary" onClick={registerUser}>
                    register
                </button>
            </div>

        </div>
        )}
</section>
)
  
}

export default Register