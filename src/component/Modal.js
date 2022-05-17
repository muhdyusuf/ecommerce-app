import React from 'react'
import { createPortal } from 'react-dom'
import {useContext} from 'react'
import {UserContext} from './UserContext'
import './Modal.css'

function Modal() {
  

  const {modal,updateModal}=useContext(UserContext)


  
  if(!modal[2]){
    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
     }
     
    
    if(modal[0]){
      let newModal=[false,""]
      console.log(modal)
      delay(1000).then(()=> updateModal([...newModal]))
    }

    if(!modal[0])return null
  }
  
  
 
  return createPortal (
    <>
    { !modal[2] && (
      <div className='modal'>
      <p>{modal[1]}</p>
      </div>

    ) }
    { modal[2] && (
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