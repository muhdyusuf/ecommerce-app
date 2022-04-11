import React from 'react'
import {Link} from 'react-router-dom'
import ShoppingCart from './ShoppingCart'
import {HiOutlineShoppingCart} from 'react-icons/hi'
import {BiHeart,BiSearch} from 'react-icons/bi'
import { useState } from 'react'

function Navbar({user,updateUser}) {
   function updateLogin(){
       updateUser(user=>{
           const newState={...user}
           newState.isLoggedIn=false
           return newState
       })
   }

   const [userHover,updateHover]=useState(false)

    const userLog=(user)=>{
        if(user.isLoggedIn){
            return(
                <div className='user-nav' onClick={()=>updateHover(!userHover)}>
                    <p>{user.name}</p>
                    <div className={userHover? "user-nav-hover active":"user-nav-hover"} onMouseOut={()=>updateHover(!userHover)}>
                        <div className='user-nav-btn' onClick={updateLogin}>Log out</div>
                    </div>
                </div>
            )

        }
        else if(!user.isLoggedIn){
            return(
                <div className='login-register'>
                  <p>login/register</p>
                </div>
            )
        }

    }

  return (
    <nav >
        <div className="nav-upper">
            <p>Call Us : 12345678</p>
            <p>{'Shop Event & Save Up To'}<span> 65% Off</span></p>
            <div className="nav-upper-input">
                <div className="language-input">
                   <label for="language"></label>
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
                    {userLog(user)}
                    
            

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
            <div className="shopping-cart-icon nav-icon">
            <HiOutlineShoppingCart/>
            <span className={user.cart.length>0? "nav-label active cart-label":"nav-label cart-label"}>{user.cart.length}</span>
            </div>
            <div className="like-icon nav-icon">
            <BiHeart/>
            <span className={user.liked.length>0? "nav-label active liked-label":"nav-label liked-label"}>{user.liked.length}</span>

            </div>
            

            
            
      

        </div></div>

        
        

        
        <span></span>
    </nav>
  )
}

export default Navbar