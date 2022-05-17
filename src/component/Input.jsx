import React, { useState } from 'react'
import { formValidation,INPUTTYPE } from '../global-function/formValidation'
import './input.scss'

const Input = (props) => {

  const [state,setState]=useState({
      value:props.initialState,
      isValid:null,
      error:["asdsad"]
  })
 
  let isValid=state.isValid===null || state.isValid?true:false
  

  function setInput(e){  
    if(props.readOnly)return
    setState({...state,value:e.target.value})
    
  }
  function validate(){
    if(props.readOnly)return
      let newState=formValidation(props.validationType,state)
      console.log(newState)
      setState({...newState})

  }


  return (
    <div className={isValid? "input-cont":"input-cont invalid"}>
        <label>{props.inputLabel}</label>
        <div>
            <input 
                type={props.inputType} 
                name={props.validationType} 
                onBlur={validate}
                onChange={(e)=>setInput(e)}
                value={state.value}
                readOnly={props.readOnly}
            />
            <div className='error-cont'>
                <p className="error-text"> 
                {state.error.map((err,index)=>{
                    return (
                        <span key={index}>{err}</span>
                    )
                })}
                </p>
            </div>
        </div>
      
    
    </div>
  )
}

Input.defaultProps={
 validationType:INPUTTYPE.PHONE,
 inputType:"text",
 inputLabel:"Set Name",
 initialState:"",
 readOnly:false
}

export default Input