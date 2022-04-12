import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useState,useEffect } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home'
import Like from './component/Like'
import Footer from './component/Footer'
import ShoppingCart from './component/ShoppingCart'
import Shop from './component/Shop';
import Product from './component/Product';



function App() {
  const [data,setData]= useState([])
  const [user,updateUser]=useState(
    {
      isLoggedIn:true,
      id:"aasdasd",
      name:"lorem",
      cart:[],
      liked:[]
    
    })

 useEffect(()=>{
  fetch('https://fakestoreapi.com/products')
  .then(res=>res.json())
  .then(json=>setData(json))

 },[])


  return (
    <>
  
    <Router>
      <Navbar user={user} updateUser={updateUser}/>
      <div className="under-nav"></div>
      
      <Routes>
        <Route path='' element={<Home data={data} user={user} updateUser={updateUser}/>}/>
        <Route path="/shop" element={<Shop data={data} user={user} updateUser={updateUser}/>}/>
        <Route path="/product/:productId" element={<Product/>}/>
      </Routes>
       <Footer/>
    </Router>
   

    </>
  );
}

export default App;
