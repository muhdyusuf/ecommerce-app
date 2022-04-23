import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {GoAlert} from 'react-icons/go'

function ErrorPage(isLogIn) {
 let navigate=useNavigate

 
  return (
    <section>
      <div className="container">
        <div className="error-container">
        <GoAlert style={{fontSize:"4rem",color:"red"}}/>
        <h1 className='fs2 mt-1'>Page not found</h1>
        <h2 className='mt-1'>Please go back a previous page or {<Link to="/">Homepage</Link>}</h2>

        </div>
       

      </div>
    </section>
  )
}

export default ErrorPage