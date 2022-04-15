import React from 'react'
import {GrDeliver} from 'react-icons/gr'
import{AiOutlineCreditCard} from 'react-icons/ai'
import {BiSupport} from 'react-icons/bi'
import {BsArrowLeftRight} from 'react-icons/bs'
import {BiHeart} from 'react-icons/bi'
import {useState} from 'react'
import Hero from './Hero'
import Itemlist from './Itemlist'


function Home({data,user,updateUser}) {
    const [currentslide,updateSlide]=useState("newArrival")

    function changeCarousel(val){

        if(val=="newArrival"){
            document.documentElement.style.setProperty("--home-slider",0)
            document.documentElement.style.setProperty("--featured-slide",0)
            updateSlide("newArrival")
        }
        else if(val=="featuredItem"){
            document.documentElement.style.setProperty("--home-slider","-100%")
            document.documentElement.style.setProperty("--featured-slide","100%")
            updateSlide("featuredItem")
        }
        else if(val=="saleItem"){
            document.documentElement.style.setProperty("--home-slider","-200%")
            document.documentElement.style.setProperty("--featured-slide","200%")
            updateSlide("saleItem")
        }
    }
   
  




  return (
    <>
        <Hero/>
        <section>
            <div className="container">
            <div className="home-promise">
            <div>
            <GrDeliver className='promise-icon'/>
            <div className="icon-label">
                <h4>Free Delivery</h4>
            <p>For Order Over 99$</p>
 
            </div>
           
            </div>
            <div>
            <BsArrowLeftRight className='promise-icon'/>
            <div className="icon-label">
                   <h4>30 Days Return</h4>
            <p>If Goods Have Problem</p>
            </div>
         

            </div>
            <div>
            <AiOutlineCreditCard className='promise-icon'/>
            <div className="icon-label">
                <h4>Secure Payment</h4>
                <p>100% Secure Payment</p>
            </div>
            </div>
            <div>
            <BiSupport className='promise-icon'/>
            <div className="icon-label">
            <h4 >24/7</h4>
            <p>Dedicated Support</p>
            </div>

            </div>

            
            

        </div>
        <div className="featured-product">
            <div className="featured-button-container">
                <div className={currentslide=="newArrival"?"featured-btn active":"featured-btn"} onClick={()=>changeCarousel("newArrival")}>New Arrival</div>
                <div className={currentslide=="featuredItem"?"featured-btn active":"featured-btn"} onClick={()=>changeCarousel("featuredItem")}>Featured Item</div>
                <div className={currentslide=="saleItem"?"featured-btn active":"featured-btn"} onClick={()=>changeCarousel("saleItem")}>Sale Item</div>
                <span></span>
            </div>
            <div className="featured-group">
                <Itemlist data={data} updateUser={updateUser} user={user} />
                <Itemlist data={data} updateUser={updateUser} user={user}/>
                <Itemlist data={data} updateUser={updateUser} user={user}/>
                
            </div>
            <div className="shop-button">
                <div className="btn go-to-btn">Go to Shop</div>
            </div>
            <div className="promo">
                <div className="promo1" >
                    <h2>Mid season<br></br>up to 50% off</h2>
                    <a href="">Shop Now</a>
                </div>
                <div className="promo1" style={{background:"url('https://img.freepik.com/free-psd/bag-mockup_58466-17102.jpg?t=st=1649584392~exp=1649584992~hmac=f65206636cbff15e439a0ed6731be0eb74448bb385ab5e261a94c9503b70fdf6&w=996') center",backgroundSize:"cover"}}>
                    <h2>HandBag<br></br>up to 30% off</h2>
                    <a href="">Shop Now</a>
                </div>
            </div>
            <div className="newsletter">
                <h2>Subscribe To our Newsletter</h2>
                <p className='mt-1'>Subscribe to our Newsletter and get 10% off on your first purchase</p>
                <form action="" className='newsletter-form'>
                    <input type="email" placeholder='Your Email'/>
                    <button type="submit">Subscribe</button>
                </form>
                
           </div>
            
        </div>
            </div>
        
        </section>
       




    </>
  )
}

export default Home