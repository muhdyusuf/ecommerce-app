import { useState } from "react"
import React from 'react'


function Newsletter() {
    const [isValid,updateIsValid]=useState({
        emailAddress:true
    })
    function validation(e){
        let newIsValid={...isValid}
        
        if(e.target.name=="emailAddress"){
            console.log("hjkhjk")
            const regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            let isTrue=regex.test(e.target.value)
            isTrue? newIsValid.emailAddress=e.target.value: newIsValid.emailAddress=false
        }
      

        updateIsValid({...newIsValid})
        

    }
  return (
    <div className="newsletter">
        <h2>Subscribe To our Newsletter</h2>
        <p className='mt-1'>Subscribe to our Newsletter and get 10% off on your first purchase</p>
        <form action="" className='newsletter-form'>
            <div className="input-container">
                <input type="text" name='emailAddress' className={isValid.emailAddress? "":"email invalid"} onBlur={(e)=>validation(e)} placeholder="Email address"/>
                <div className={isValid.emailAddress? "error-message":"error-message display"}>
                            email not valid
                </div>
            </div>
            <button type="submit">Subscribe</button>
        </form>
    
    </div>
  )
}

export default Newsletter