import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import './Login.css'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'


function Login({updateLogin}) {
    let navigate=useNavigate()
    


    const [isValid,updateIsValid]=useState({
        emailAddress:true,
        password:true,
        seePassword:false,
        emailError:"",
        passwordError:""

        
    })
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
    function validation(e){
        let newIsValid={...isValid}
        
        if(e.target.name=="emailAddress"){

           let isEmail=/[\@\.]/gi.test(e.target.value)
           
           if(isEmail){
            const regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                if(regex.test(e.target.value)){
                    newIsValid.emailAddress=e.target.value
                }
                else{
                    newIsValid.emailAddress=false
                    newIsValid.emailError="email not valid"
                }
            } 
            else{
                console.log(/[a-z0-9_?]/i.test(e.target.value))

                
            }

             

           
            const regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            let isTrue=regex.test(e.target.value)
            
            isTrue? newIsValid.emailAddress=e.target.value: newIsValid.emailAddress=false
        }
        else if(e.target.name==="password"){
            const regex= /(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&_*]{5,16}/g
            let isTrue=regex.test(e.target.value)
          
            isTrue? newIsValid.password=e.target.value: newIsValid.password=false
            
        }

        updateIsValid({...newIsValid})
        

    }

    function signIn(){
        // if(isValid.emailAddress==true || isValid.emailAddress==false ||
        //     isValid.password==true || isValid.password==false ) return
        console.log("signin")


        fetch('https://fakestoreapi.com/auth/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            username: isValid.emailAddress,
            password: isValid.password
           })
        })
        .then(res=>res.json())
        .then(json=>{
            if (!json){
                console.log("incorrect pass")
            }
            else if(json.token){
                console.log("correct pass")
                navigate('/')
                updateLogin(true)
                
                
            }
        })
        


      
        
        
        

    }
  return (
    <section>
        <div className="page-header">
            <h1>Login</h1>
        </div>
        <div className="container">
            <div className='login-form'>
            <label>Username or email address</label>
               <div className="input-container">
                    <input type="text" name='emailAddress' className={isValid.emailAddress? "":"email invalid"} onBlur={(e)=>validation(e)}/>
                    <div className={isValid.emailAddress? "error-message":"error-message display"}>
                                email or username not valid
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
                
               <button className='btn-primary' onClick={signIn}>Sign In</button>
               <Link to="/register" className='to-register'>OR CREATE AN ACCOUNT</Link>
            </div>
           

        </div>
    </section>
  )
}

export default Login