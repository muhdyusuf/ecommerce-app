import React from 'react'
import { createPortal } from 'react-dom'

function Modal({open,children}) {
 if(!open)return null
 
  return createPortal (
    <div className='modal'>
        <p>{children}</p>
    </div>,
    document.getElementById("root")
  )
}

export default Modal