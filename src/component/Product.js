import React from 'react'
import './Product.css'
import{useParams} from "react-router-dom"
import { useEffect,useState } from 'react'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import{TiMinus,TiPlus} from 'react-icons/ti'
import Modal from './Modal'
import {FaHeart,FaRegHeart} from 'react-icons/fa'

function Product( {data,user,updateUser}) {
const {productId}=useParams()
const [productData,updateProductData]=useState()


useEffect(()=>{
    fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res=>res.json())
    .then(json=>{
        json.quantity=1
        updateProductData({...json})
        
    })
    
  
   },[])


const productRating=()=>{
    const rating=Math.round(productData.rating.rate)
    let arr=[]
    for(let i=0;i<5;i++){
        if(i<rating){
            arr.push(true)
        }
        else{
            arr.push(false)
        }

    }
   return (arr.map((item,index)=>{
        if (item){
            return(
                <AiFillStar key={`productstar${index}`}/>
            )
        }
        else{
            return(
                <AiOutlineStar key={`productstar${index}`}/>
            )
        }
    }))
}
const [modal,updateModal]=useState([false,""])

 function delay(time) {
 return new Promise(resolve => setTimeout(resolve, time));
 }
 
 function updateUserCart(val){
    const newUser=user
    
    const isDuplicate=newUser.cart.findIndex(item=>item.id==val.id)
    console.log(isDuplicate)
    if(isDuplicate<0){
        val.quantity=productData.quantity
        newUser.cart=newUser.cart.concat(val)
        
        
    }
    else if(isDuplicate>=0){
        newUser.cart[isDuplicate].quantity+=productData.quantity
        

    }

    console.log(newUser)
    updateUser({...newUser})
    updateModal([true,"Item added to cart"])
    delay(1000).then(()=>updateModal([false,"Item added to cart"]))
     
}


function updateUserLiked(val){
    const newUser=user
    const isDuplicate=newUser.liked.findIndex(item=>item.id==val.id)
    if(isDuplicate<0){
        val.quantity=1
        newUser.liked=newUser.liked.concat(val)
        updateModal([true,"Item added to liked"])
        delay(1000).then(()=>updateModal([false,"Item added to liked"]))
        
    }
    else if(isDuplicate>=0){
        newUser.liked.splice(isDuplicate,1)
        updateModal([true,"Item removed from liked"])
    delay(1000).then(()=>updateModal([false,"Item removed from liked"]))
        
    }
   
    updateUser({...newUser})
    

     
  }
 function updateQuantity(val){
     if(val=="plus"){
         let newData={...productData}
         newData.quantity+=1
         updateProductData({...newData})
     }
     else if(val=="minus" && productData.quantity >1){
        let newData={...productData}
        newData.quantity-=1
        updateProductData({...newData})
    }
 }


 const isLiked=(val)=>{
    const isDuplicate=user.liked.findIndex(item=>item.id==val.id)
    if(isDuplicate<0){
        return (
            <FaRegHeart onClick={()=>updateUserLiked(val)}/>
        )
    }
    else if(isDuplicate>=0){
        return(
            <FaHeart onClick={()=>updateUserLiked(val)} className="liked-icon-fill"/>
        )
    }

}



  return (
    <section className='product'>
        <div className="container">
            {(function (){
                if(!productData){
                    return(
                        <div className='product-not-exist'>product not exist</div>
                    )
                }
                else{
                return(
                    <div className="product-card">
                            <div className="product-img ">
                                <img src={productData.image} alt="" />
                            </div>
                            <div className="product-detail">
                                <h3 className='border-bottom'>{productData.title}</h3>
                                <div className='product-rating'>
                                    {productRating()}
                                    <span>{productData.rating.count} Reviews</span>
                                
                                </div>
        
                                <p className='border-bottom'>{productData.description}</p>
                                <h2 >RM{productData.price}</h2>
                                <div className="product-btn">
                                 <div className="product-quantity">
                                     <button className='quantity-btn add' onClick={()=>updateQuantity("minus")}><TiMinus/></button>
                                     <span className='quantity'>{productData.quantity}</span>
                                     <button className='quantity-btn add' onClick={()=>updateQuantity("plus")}><TiPlus/></button>
                                 </div>
                                 <button onClick={()=>updateUserCart(productData)}>Add to cart</button>
                                 <button >Buy Now</button>
                                 {isLiked(productData)}
                                </div>
                            </div>
                            
                        </div>
                )
            }
            })()}
            
            
        </div>
        <Modal open={modal[0]}>{modal[1]}</Modal>
    </section>
  )
}

export default Product