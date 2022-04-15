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
import Cart from './component/Cart';
import Checkout from './component/Checkout';




function App() {
  const [data,setData]= useState([])
  const [user,updateUser]=useState(
    {
      isLoggedIn:true,
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
      checkout:[
        {
          "id": 1,
          "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          "price": 109.95,
          "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          "category": "men's clothing",
          "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          "quantity":1,
          "rating": {
          "rate": 3.9,
          "count": 120
          }
          },
          {
          "id": 2,
          "title": "Mens Casual Premium Slim Fit T-Shirts ",
          "price": 22.3,
          "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
          "category": "men's clothing",
          "quantity":1,
          "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          "rating": {
          "rate": 4.1,
          "count": 259
          }
          }

        ],
      cart:[],
      liked:[{
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "quantity":1,
        "rating": {
        "rate": 3.9,
        "count": 120
        }
        },
        {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "quantity":1,
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
        "rate": 4.1,
        "count": 259
        }
        },
        {
        "id": 3,
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "quantity":1,
        "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "rating": {
        "rate": 4.7,
        "count": 500
        }
        }]
    
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

        <Route path="/product/:productId" element={<Product  data={data} user={user} updateUser={updateUser}/>}/>

        <Route path="/shoppingCart" element={<Cart
        user={user} updateUser={updateUser}/>}/>

        <Route path="/liked" element={<Like
         user={user} updateUser={updateUser}/>}/>

         <Route path="/checkout" element={<Checkout
         user={user} updateUser={updateUser}/>}/>
      </Routes>
       <Footer/>
    </Router>
   

    </>
  );
}

export default App;
