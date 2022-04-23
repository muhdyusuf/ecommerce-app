import { React,useState,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {HiOutlineShoppingCart} from 'react-icons/hi'
import {BiHeart,BiSearch} from 'react-icons/bi'
import './Navbar.css'
import {LoginContext,UserContext} from './UserContext'

function Navbar() {
  let navigate=useNavigate()
  const {user}=useContext(UserContext)
  const {isLogIn,updateLogin}=useContext(LoginContext)
  const {updateModal}=useContext(UserContext)
 

   const [userHover,updateHover]=useState(false)

    function userLogin(){
        if(isLogIn){
            return(
                <div className='user-nav' onClick={()=>updateHover(!userHover)}>
                    <p>hi {user.name}</p>
                    <div className={userHover? "user-nav-hover active":"user-nav-hover"} onMouseOut={()=>updateHover(!userHover)}>
                        <div className='user-nav-btn' onClick={()=>{
                            updateModal([true,"User Logged out"])
                            updateLogin(false)
                            navigate('/')
                        }}>Log out</div>
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
          if(isLogIn && user.cart)return user.cart.length
          else{
              return 0
          }
      }
      else if(icon=="liked"){

        if(isLogIn && user.liked)return user.liked.length
        else{
            return 0
        }
    }

  }
  function handleSearch(e){
      
      if(e.keyCode==13){
          let search=e.target.value
          navigate(`/shop/?search=${e.target.value}`)
         
          
          
      }



  }
  const [searchbar,openSearch]=useState(false)
  

  return (
    <nav >
        <div className="nav-upper">
            
            <div className="log-input">
                {userLogin()}
            </div>
            
            
        </div>
        <div className="nav-lower">
            <div className="nav-brand" onClick={()=>navigate('/')}>
            E-shop<span className='col-primary'>.</span>
            </div >
        <div className="nav-link">
           <Link to="/">HOME</Link>
           <Link to="/shop">SHOP</Link>
           <Link to="/blog">BLOG</Link>
            
        </div>
        <div className="nav-nav">
          
            <div className="nav-searchbar" >
                <input type="text" onKeyDown={(e)=>handleSearch(e)} className={searchbar? "searchbar active":"searchbar"} />
                <BiSearch className='nav-icon' onClick={()=>openSearch(!searchbar)}/>
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