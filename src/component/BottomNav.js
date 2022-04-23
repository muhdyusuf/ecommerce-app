import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {IoReaderOutline} from 'react-icons/io5'
import {FiUser} from 'react-icons/fi'
import {AiOutlineHome,AiOutlineShop} from 'react-icons/ai'
import './BottomNav.css'

function BottomNav() {
  const [selected,setSelected]=useState("home")
  let navigate=useNavigate()

  function handleNavigate(val){
   
    setSelected(val)
    switch(val){
      case "home":{
        navigate('/')
      }
      break
      case "shop":{
        navigate('/shop')
      }
      break
      case "blog":{
        navigate('/blog')
      }
      break
      case "user":{
        navigate('/user')
      }
      break
      default:{
        navigate('/error')
      }
    }



  }

  return (
    <div className='bottom-nav'>
      <div className={selected=="home"? "bottom-nav-icon active":"bottom-nav-icon"} onClick={()=>handleNavigate("home")}>
        <AiOutlineHome/>
        <p>home</p>
      </div>
      <div className={selected=="shop"? "bottom-nav-icon active":"bottom-nav-icon"} onClick={()=>handleNavigate("shop")}>
        <AiOutlineShop/>
        <p>shop</p>
      </div>
      <div className={selected=="blog"? "bottom-nav-icon active":"bottom-nav-icon"} onClick={()=>handleNavigate("blog")}>
        <IoReaderOutline/>
        <p>blog</p>
      </div>
      <div className={selected=="user"? "bottom-nav-icon active":"bottom-nav-icon"} onClick={()=>handleNavigate("user")}>
        <FiUser/>
        <p>user</p>
      </div>


    </div>
  )
}

export default BottomNav