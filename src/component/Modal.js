import React from 'react'
import { createPortal } from 'react-dom'

import { useDispatch,useSelector } from 'react-redux';
import { updateModal } from '../SLICE/utilsSlice';

import './Modal.css'

function Modal() {
  
 const dispatch=useDispatch()
 const modal=useSelector(state=>state.utilsState.modal)
 

  if(modal.text!==""){
    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
     }
    
    if(modal.isActive){
    
      delay(1000).then(()=> dispatch(updateModal({
        text:"",
        isActive:false
      })))
    }
    

    
  }
  if(!modal.isActive)return null
  
  
  
 
  return createPortal (
    <>
    {modal.text!=="" && (
      <div className='modal'>
      <p>{modal.text}</p>
      </div>

    ) }
    { modal.text==="" && (
      <div className="modal loading-modal">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        
      </div>


    )

    }
    
    </>,
    
    document.getElementById("root")
  )
}

export default Modal