import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useState,useEffect } from 'react';
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







function App() {
 
  

  const [user,updateUser]=useState(
    {
      id:"aasdasd",
      name:"lorem",
      address:{
        phone:"012338432",
        lot:"lot 3 aras 20",
        poscode:"90000",
        city:"sandakan",
        state:"Sabah",
        country:"Malaysia",
      },
      checkout:[],
      cart:[],
      liked:[]
    
    })
  const [isLogIn,updateLogin]=useState(true)

  useEffect(()=>{
    const isLogIn=localStorage.getItem("isLogin")
    JSON.parse(isLogIn) ? updateLogin(true):updateLogin(false)
    console.log(isLogIn)

  },[])

  useEffect(()=>{
    console.log(isLogIn)
    localStorage.setItem("isLogin",isLogIn)
  },[isLogIn])




  return (
    <>
  
    <Router>
      <Navbar isLogIn={isLogIn} updateLogin={updateLogin} user={user} />
     
      
      <Routes>
        <Route path='/' element={<Home isLogIn={isLogIn} user={user} updateUser={updateUser}/>}/>
        <Route exact path="/shop" element={<Shop isLogIn={isLogIn}  user={user} updateUser={updateUser}/>}/>
        <Route path="/shop/:search" element={<Shop isLogIn={isLogIn}  user={user} updateUser={updateUser}/>}/>
        <Route path="/product/:productId" element={<Product isLogIn={isLogIn}  user={user} updateUser={updateUser}/>}/>

        {isLogIn && (
          <>
          <Route path="/cart" element={<Cart
             user={user} updateUser={updateUser}/>}/>
           <Route path="/liked" element={<Like
             user={user} updateUser={updateUser}/>}/>
           <Route path="/checkout" element={<Checkout
             user={user} updateUser={updateUser}/>}/>
            <Route path="*" element={<ErrorPage isLogIn={isLogIn}/>}/>
         </>

        )}
        {!isLogIn && (
          <>
            <Route path="/login" element={<Login updateLogin={updateLogin} />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="*" element={<Login updateLogin={updateLogin}/>}/>
          
          </>


        )}
        
        
        
        


      </Routes>
       <Footer/>
    </Router>
   

    </>
  );
}

export default App;
