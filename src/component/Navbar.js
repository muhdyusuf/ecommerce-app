import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import ShoppingCart from './ShoppingCart'
import {HiOutlineShoppingCart} from 'react-icons/hi'
import {BiHeart,BiSearch} from 'react-icons/bi'
import { useState } from 'react'

function Navbar({isLogIn,updateLogin,user}) {
  let navigate=useNavigate()
  

   const [userHover,updateHover]=useState(false)

    function userLogin(){
        if(isLogIn){
            return(
                <div className='user-nav' onClick={()=>updateHover(!userHover)}>
                    <p>{user.name}</p>
                    <div className={userHover? "user-nav-hover active":"user-nav-hover"} onMouseOut={()=>updateHover(!userHover)}>
                        <div className='user-nav-btn' onClick={()=>updateLogin(false)}>Log out</div>
                    </div>
                </div>
            )

        }
        else if(!isLogIn){
            return(
                <div className='login-register'>
                    <Link to='/login'>Login</Link>
                    <span> | </span>
                    <Link to="/register">Register</Link>
                </div>
            )
        }

    }
  function handleNavigate(path){
      if(isLogIn){
          navigate(path)
        
      }
      else{
          navigate('/login')
      }
      
  }
  const navIconSpan=(icon)=>{
      if(icon=="cart"){
          if(isLogIn)return user.cart.length
          else{
              return 0
          }
      }
      else if(icon=="liked"){
        if(isLogIn)return user.liked.length
        else{
            return 0
        }
    }

  }
  

  return (
    <nav >
        <div className="nav-upper">
            <p>Call Us : 12345678</p>
            <p>{'Shop Event & Save Up To'}<span> 65% Off</span></p>
            <div className="nav-upper-input">
                <div className="language-input">
                   <label htmlFor="language"></label>
                   <select name="language" id="">
                    <option value="english">English</option>
                    </select> 
                </div>
                <div className="currency-input">
                    <select name="currency" id="">
                        <option value="usd">USD</option>
                    </select>
                </div>
                <div className="log-input">
                    {userLogin()}
                    
            

                </div>
                
            </div>
        </div>
        <div className="nav-lower"><div className="nav-brand">
            E-shop<span>.</span>

        </div>
        <div className="nav-link">
           <Link to="/">Home</Link>
           <Link to="/shop">Shop</Link>
           <Link to="/blog">Blog</Link>
            
        </div>
        <div className="nav-nav">
            <div className="nav-input">
                <input type="text" className='nav-searchbar' />
                
                <BiSearch className='nav-icon'/>

            </div>
            <div className="shopping-cart-icon nav-icon"
            onClick={()=>handleNavigate('/cart')} >
            <HiOutlineShoppingCart/>
            <span className={navIconSpan("cart")>0? "nav-label active cart-label":"nav-label cart-label"}>{navIconSpan('cart')}</span>
            </div>
            <div className="like-icon nav-icon"
            onClick={()=>handleNavigate('/liked')}>
            <BiHeart/>
            <span className={navIconSpan("liked")>0? "nav-label active liked-label":"nav-label liked-label"}>{navIconSpan('liked')}</span>

            </div>
            

            
            
      

        </div></div>

        
        

        
        <span></span>
    </nav>
  )
}

export default Navbar