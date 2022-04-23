
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



function App() {

 const [isLogIn,updateLogin]=useState(true)
 const [user,updateUser]=useState({
  id:"aasdasd",
  userName:"lorem123",
  name:"lorem",
  address:{
    firstName:"",
    lastName:"",
    emailAddress:"lorem@ipsum.com",
    phone:"012338432",
    address:"lot 3 aras 20",
    poscode:"90000",
    city:"sandakan",
    state:"Sabah",
    country:"Malaysia",
  },
  wallet:100,
  checkout:[],
  cart:[],
  liked:[]
               
})
 const [modal,updateModal]=useState([false,"asdasd"])


  useEffect(()=>{
    const loginData=localStorage.getItem("isLogin")
    const newUser=localStorage.getItem('USER_DATA')
    console.log(JSON.parse(loginData))
    JSON.parse(loginData) && isLogIn ? updateLogin(true):updateLogin(false)
    if(isLogIn && JSON.parse(newUser)){
      const newUser=localStorage.getItem("USER_DATA")
      updateUser(JSON.parse(newUser))
    }
    console.log(JSON.parse(newUser))

    console.log(isLogIn)

  },[])

  useEffect(()=>{
    localStorage.setItem("isLogin",isLogIn)
    const loginData=localStorage.getItem("isLogin")
    console.log('login:',JSON.parse(loginData))
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
   

    </>
  );
}

export default App;
