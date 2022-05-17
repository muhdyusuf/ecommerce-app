
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
import {LoginContext,UserContext} from './component/UserContext'
import Modal from './component/Modal';
import User from './component/User';
import Input from './component/Input';

import {useSelector,useDispatch} from 'react-redux'
import {addCart} from './SLICE/cartSlice'
import {setUser} from './SLICE/userSlice'



function App() {

 const [isLogIn,updateLogin]=useState(true)
 const [user,updateUser]=useState({

    id:"123456789",
    userName:"",
    name:"",
    phone:"",
    emailAddress:"",
    address:{
      firstName:"",
      lastName:"",
      address:"",
      city:"",
      state:"",
      country:"",
    },
    wallet:100,
    checkout:[],
    cart:[],
    liked:[]
               
})

const _user=useSelector(state=>state.userState)
const _cart=useSelector(state=>state.cartState)

//dispatch
const  dispatch=useDispatch()





console.log(_cart)



console.log()
 const [modal,updateModal]=useState([false,"asdasd"])


  useEffect(()=>{
    const loginData=localStorage.getItem("isLogin")
    const newUser=localStorage.getItem('USER_DATA')
    
    JSON.parse(loginData) && isLogIn ? updateLogin(true):updateLogin(false)
    if(isLogIn && JSON.parse(newUser)){
      const newUser=localStorage.getItem("USER_DATA")
      updateUser({...JSON.parse(newUser)})
      
    }
    

  },[])

  useEffect(()=>{
    localStorage.setItem("isLogin",isLogIn)
    const loginData=localStorage.getItem("isLogin")
    
    
  },[isLogIn])

  useEffect(()=>{
    let newUser={...user}
    localStorage.setItem("USER_DATA",JSON.stringify(newUser))
  },[user])




  return (
    <>
    <UserContext.Provider value={{updateUser,user,modal,updateModal}}>
    <LoginContext.Provider value={{isLogIn,updateLogin}}>
    <Router>
      <Navbar />
     
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path="/shop" element={<Shop/>}/>
        <Route path="/shop/:search" element={<Shop/>}/>
        <Route path="/product/:productId" element={<Product/>}/>

        {isLogIn && (
          <>
          <Route path="/cart" element={<Cart/>}/>
           <Route path="/liked" element={<Like/>}/>
           <Route path="/checkout" element={<Checkout/>}/>
           <Route path='/user' element={<User/>}/>
          <Route path="*" element={<ErrorPage isLogIn={isLogIn}/>}/>
         </>

        )}
        {!isLogIn && (
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
    </LoginContext.Provider>
    </UserContext.Provider>
  
    <button onClick={()=>dispatch(addCart({
      id:"111111",
    }))}>add</button>

    </>
  );
}

export default App;
