import React from 'react'
import './Product.css'
import{useParams} from "react-router-dom"
import { useEffect,useState } from 'react'

function Product() {
const {productId}=useParams()
const [productData,updateProductData]=useState()
console.log(productData)
useEffect(()=>{
    fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res=>res.json())
    .then(json=>updateProductData(json))
  
   },[])




  return (
    <section className='product'>
        <div className="container">
            {(function (){
                if(!productData){
                    return(
                        <div>product not exist</div>
                    )
                }
                else{
                return(
                    <div className="product-card">
                            <div className="product-img">
                                <img src={productData.image} alt="" />
                            </div>
                            <div className="product-detail">
                                <h2>{productData.title}</h2>
                                <p>{productData.description}</p>
                                <p>category:{productData.category}</p>
                                <h2>RM{productData.price}</h2>
                            </div>
                        </div>
                )
            }
            })()}
            
            
        </div>
    </section>
  )
}

export default Product