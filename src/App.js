
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home'
import Like from './component/Like'
import Footer from './component/Footer'
import Shop from './component/Shop';
import Product from './component/Product';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import Login from './component/Login';
import Register from './component/Register';
import ErrorPage from './component/ErrorPage';
import BottomNav from './component/BottomNav';


import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useState,useEffect,useContext } from 'react';
import Modal from './component/Modal';
import User from './component/User';
import Input from './component/Input';

import {useSelector,useDispatch} from 'react-redux'
import {setCart} from './SLICE/cartSlice'
import {setLiked} from './SLICE/likedSlice'
import {setUser} from './SLICE/userSlice'
import {login,logout} from './SLICE/authSlice'





function App() {

 

  const _user=useSelector(state=>state.userState)
  const _cart=useSelector(state=>state.cartState)
  const _liked=useSelector(state=>state.likedState)
  const _auth=useSelector(state=>state.authState)
  const isLogin=useSelector(state=>state.authState.isAuthorized)


//dispatch
  const  dispatch=useDispatch()
  

  useEffect(()=>{

    const loginData=localStorage.getItem("AUTH_STATE")
    const user=localStorage.getItem('USER_STATE')
    const cart=localStorage.getItem('CART_STATE')
    const liked=localStorage.getItem('LIKED_STATE')

   const newUser=JSON.parse(user)
   const newCart=JSON.parse(cart)
   const newLiked=JSON.parse(liked)
   


   if( JSON.parse(loginData)){
    
      dispatch(login({
      currentUser:{
        id:User.id
      },
      isAuthorized:true
      }))
      dispatch(setUser({...newUser}))
      dispatch(setLiked(newLiked))
      dispatch(setCart(newCart))
   

    }
      
    

  },[])

  useEffect(()=>{
    if(isLogin){
      localStorage.setItem("AUTH_STATE",JSON.stringify(isLogin))
    }
  
    
    
  },[isLogin])

  useEffect(()=>{
    localStorage.setItem("USER_STATE",JSON.stringify(_user))
  },[_user])
  useEffect(()=>{
    
    localStorage.setItem("CART_STATE",JSON.stringify(_cart))
  
  },[_cart])

  useEffect(()=>{
    localStorage.setItem("LIKED_STATE",JSON.stringify(_liked))
   
  },[_liked])


 



  return (
    <>
   
    <Router>
      <Navbar />
     
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path="/shop" element={<Shop/>}/>
        <Route path="/shop/:search" element={<Shop/>}/>
        <Route path="/product/:productId" element={<Product/>}/>

        {_auth.isAuthorized && (
          <>
          <Route path="/cart" element={<Cart/>}/>
           <Route path="/liked" element={<Like/>}/>
           <Route path="/checkout" element={<Checkout/>}/>
           <Route path='/user' element={<User/>}/>
          {/* <Route path="*" element={<ErrorPage isLogIn={_auth.isAuthorized}/>}/> */}
         </>

        )}
        {!_auth.isAuthorized && (
          <>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="*" element={<Login/>}/>
          
          </>


        )}

        
        
        
        
        


      </Routes>
       <Footer/>
       <BottomNav/>
    </Router>
    <Modal/>
  
  
  
    </>
  );
}

export default App;
