import React from 'react'
import './Product.css'
import{useParams,useNavigate} from "react-router-dom"
import { useEffect,useState,useContext } from 'react'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import{TiMinus,TiPlus} from 'react-icons/ti'
import Modal from './Modal'
import {FaHeart,FaRegHeart} from 'react-icons/fa'
import Itemlist from './Itemlist'
import Newsletter from './Newsletter'
import Promise from './Promise'

import {useSelector,useDispatch} from "react-redux"

import {addCart,addCartQuantity,mergeCartQuantity} from '../SLICE/cartSlice'
import {addLiked, addliked,deleteLiked} from '../SLICE/likedSlice'
import {addCheckout} from '../SLICE/checkoutSlice'
import {updateModal} from '../SLICE/utilsSlice'



function Product() {
    const dispatch=useDispatch()
    const liked=useSelector(state=>state.likedState)
    const cart=useSelector(state=>state.cartState)
    const isLogIn=useSelector(state=>state.authState.isAuthorized)
    


    let navigate=useNavigate()
    const {productId}=useParams()
    const [productData,updateProductData]=useState(null)



useEffect(()=>{
    if(productData===null || productData && productData.id !== productId){
        updateProductData(null)
        fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res=>res.json())
        .then(json=>{
            if(json==null){
                updateProductData(undefined)
                console.log(productData)
            
            }
            else{
                json.quantity=1
                updateProductData({...json})
            }
        
    })
    }
    
    
  
   },[productId])


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



 function updateCart(val){
    const isDuplicate=cart.findIndex(item=>item.id===val.id)
    console.log(isLogIn)
    if(!isLogIn){
        navigate('/login')
    }
   
    else if(isDuplicate<0){
        dispatch(addCart(val))
        
    }
    else if(isDuplicate>=0){
        dispatch(mergeCartQuantity(val))

    }
    dispatch(updateModal({
        text:"Item added to liked",
        isActive:true
      }))

}


function updateLiked(val){

    const isDuplicate=liked.findIndex(item=>item.id===val.id)
    if(!isLogIn){
        navigate('/login')
    }
    else if(isDuplicate<0){
        dispatch(addLiked(val))
        dispatch(updateModal({
            text:"Item added to liked",
            isActive:true
          }))
            
        
    }
    else if(isDuplicate>=0){
        dispatch(deleteLiked({id:val.id}))
        dispatch(updateModal({
            text:"Item removed to liked",
            isActive:true
          }))
            
        
    }
    

     
  }
 function updateQuantity(val){
     if(val==="plus"){
         let newData={...productData}
         newData.quantity+=1
         updateProductData({...newData})
     }
     else if(val==="minus" && productData.quantity >1){
        let newData={...productData}
        newData.quantity-=1
        updateProductData({...newData})
    }
 }


 const isLiked=(val)=>{
    const isDuplicate=liked.findIndex(item=>item.id==val.id)
    if(isDuplicate<0){
        return (
            <FaRegHeart onClick={()=>updateLiked(val)}/>
        )
    }
    else if(isDuplicate>=0){
        return(
            <FaHeart onClick={()=>updateLiked(val)} className="liked-icon-fill"/>
        )
    }

}
function buyNow(){
   
    dispatch(addCheckout(productData))
    navigate('/checkout')
    

}



  return (
    <section className='product'>
        <div className="page-header">
            <h1>Product</h1>
        </div>
        <div className="container">
            {(function (){
                if(productData===undefined){
                    return(
                        <div className='product-not-exist'>
                         <p className='fs15'>Product not Exist</p>
                         <button onClick={()=>navigate('/shop')}>Browse other product</button>
                        
                        </div>
                    )
                }
                else if(productData===null){
                    return(
                        <div className="product-card">
                            <div className="product-img ">
                               
                            </div>
                            <div className="product-detail">
                                <h3 className='border-bottom skeleton'></h3>
                                <div className='product-rating skeleton'>
                                
                                </div>
        
                                <p className='border-bottom product-desc skeleton'></p>
                                <p className='border-bottom product-desc skeleton'></p>
                                <p className='border-bottom product-desc skeleton'></p>

                                <h2 className='skeleton product-price'></h2>
                                <div className="product-btn">
                                 <div className="product-quantity skeleton">
                                   
                                 </div>
                                 <button className='skeleton'></button>
                                 <button className='skeleton'></button>
                            
                                </div>
                            </div>
                            
                        </div>
                    )
                }
                else{
                return(
                   <>
                     <div className="product-card border-bottom">
                            <div className="product-img ">
                                <img src={productData.image} alt="" />
                            </div>
                            
                            <div className="product-detail">
                                <h3 className='border-bottom'>{productData.title}</h3>
                                <div className='product-rating'>
                                    {productRating()}
                                    <span>{productData.rating.count} Reviews</span>
                                
                                </div>
                                <p className='border-bottom product-desc'>{productData.description}</p>
                                <h2 >RM{productData.price}</h2>
                                <div className="product-btn">
                                 <div className="product-quantity">
                                     <button className='quantity-btn add' onClick={()=>updateQuantity("minus")}><TiMinus/></button>
                                     <span className='quantity'>{productData.quantity}</span>
                                     <button className='quantity-btn add' onClick={()=>updateQuantity("plus")}><TiPlus/></button>
                                 </div>
                                 <button onClick={()=>updateCart(productData)}>Add to cart</button>
                                 <button onClick={buyNow}>Buy Now</button>
                                 {isLiked(productData)}
                                </div>
                            </div>
                            
                        </div>
                        <div className="related-product border-bottom">
                            <h1 className='fs2'>Related Product</h1>
                            <Itemlist  dataProps={["category",productData.category]} length={4}/>
                        </div>
                        
                        <Newsletter/>
                        <Promise/>
                    
                    </>
                )
            }
            })()}
            
            
        </div>
        
    </section>
  )
}

export default Product