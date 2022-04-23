import React, { useState,useContext} from 'react'
import { Link,useNavigate} from 'react-router-dom'
import './Login.css'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import {UserContext,LoginContext} from './UserContext'


function Login() {


    const {updateUser}=useContext(UserContext)
    const {updateLogin}=useContext(LoginContext)

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
                if(/^[a-z]+_?[0-9a-z]*$/i.test(e.target.value)){
                    newIsValid.emailAddress=e.target.value
                }
                else{
                    newIsValid.emailAddress=false
                    newIsValid.emailError="username should start with letter and end with letter or number,only one underscore allowed"
                }

                
            }
            updateIsValid({...newIsValid})

             

           
           
        }
        else if(e.target.name==="password"){
            const regex= /(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&_*]{5,16}/g
            let isTrue=regex.test(e.target.value)
          
            isTrue? newIsValid.password=e.target.value: newIsValid.password=false
            
        }

        updateIsValid({...newIsValid})
        

    }
    const {modal,updateModal}=useContext(UserContext)

    function signIn(){
        updateModal([true,"",""])
        if(isValid.emailAddress==true || isValid.emailAddress==false ||
            isValid.password==true || isValid.password==false ) {
                let newIsValid=isValid
                if(newIsValid.emailAddress==true){
                    newIsValid.emailAddress=false
                    newIsValid.emailError="Input cannot be empty"
                }
                if(newIsValid.password==true){
                    newIsValid.password=false
                    newIsValid.passwordError="Input cannot be empty"
                }
                updateIsValid({...newIsValid})
                updateModal([false])
                return
                
            }
            else{
                updateModal([true,"",[]])
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
                        updateModal([false])
                        updateModal([true,"Invalid Email/Username or Password"])
                    }
                    else if(json.token){
                        console.log("correct pass")
                        navigate('/')
                        updateLogin(true)
                        updateUser({
                            id:"aasdasd",
                            name:"lorem",
                            address:{
                              phone:"012338432",
                              lot:"lot 3 aras 20",
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
                        )
                        updateModal([false])
                        updateModal([true,"Succesfully Log In"])
                        
                        
                    }
                })
                .catch(error=>{
                    console.log(error)
                    
                    updateModal([true,"Check internet connnection"])

                }

                )
            }

        


        
        


      
        
        
        

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
                                {isValid.emailError}
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
                
               <button className='btn-primary' onClick={signIn}>Sign In</button>
               <Link to="/register" className='to-register' >OR CREATE AN ACCOUNT</Link>
            </div>
           

        </div>
    </section>
  )
}

export default Login