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
import {LoginContext,UserContext} from './UserContext'


function Product() {

    const {user,updateUser}=useContext(UserContext)
    const {modal,updateModal}=useContext(UserContext)
    const {isLogIn}=useContext(LoginContext)

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
    
    
  
   },productId)


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
    
     
}


function updateUserLiked(val){
    const newUser=user
    const isDuplicate=newUser.liked.findIndex(item=>item.id==val.id)
    if(isDuplicate<0){
        val.quantity=1
        newUser.liked=newUser.liked.concat(val)
        updateModal([true,"Item added to liked"])
        
        
    }
    else if(isDuplicate>=0){
        newUser.liked.splice(isDuplicate,1)
        updateModal([true,"Item removed from liked"])
   
        
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
function buyNow(){
   
    let newUser={...user}
    newUser.checkout=[productData]
    updateUser({...newUser})
    navigate('/checkout')
    
   


}



  return (
    <section className='product'>
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
                                 <button onClick={()=>updateUserCart(productData)}>Add to cart</button>
                                 <button onClick={buyNow}>Buy Now</button>
                                 {isLiked(productData)}
                                </div>
                            </div>
                            
                        </div>
                        <div className="related-product border-bottom">
                            <h1 className='fs2'>Related Product</h1>
                            <Itemlist isLogIn={isLogIn}  dataProps={["category",productData.category]} updateUser={updateUser} user={user} length={4}/>
                        </div>
                        
                        <Newsletter/>
                        <Promise/>
                    
                    </>
                )
            }
            })()}
            
            
        </div>
        <Modal open={modal[0]}>{modal[1]}</Modal>
    </section>
  )
}

export default Product