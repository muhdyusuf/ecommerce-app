import React from 'react'
import {useState,useContext} from 'react'
import Hero from './Hero'
import Itemlist from './Itemlist'
import Newsletter from './Newsletter';
import Promise from './Promise'
import {LoginContext,UserContext} from './UserContext'



function Home() {

    const {user,updateUser}=useContext(UserContext)
    const {isLogIn,updateLogin}=useContext(LoginContext)

    


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
        <div className="promo">
                
                
                <div  style={{background:`url(${process.env.PUBLIC_URL + '/img/home.png'}) center/cover no-repeat`}}>
                    <div>
                    <h3>Mid Season<br/>Sale Up To <br/> 50% Off</h3>
                    <button className='promo-btn'>Shop Now</button>
                    </div>
                </div>
                <div  style={{background:`url(${process.env.PUBLIC_URL + '/img/home2.png'}) center/cover no-repeat`}}>
                   <div>
                   <h3>20% Of<br/>All Accesories</h3>
                    <button className='promo-btn'>Shop Now</button>
                   </div>
                </div>
                <div  style={{background:`url(${process.env.PUBLIC_URL + '/img/home3.png'}) center/cover no-repeat`}}>
                    <div>
                    <h3>Summer<br/>Fashion Sale<br/>Up To 30% Off</h3>
                    <button className='promo-btn'>Shop Now</button>
                    </div>
                    
                </div>
                
                
            </div>
        <section>
            <div className="container">
            
           
        <div className="featured-product">
            <div className="featured-button-container">
                <div className={currentslide=="newArrival"?"featured-btn active":"featured-btn"} onClick={()=>changeCarousel("newArrival")}>New Arrival</div>
                <div className={currentslide=="featuredItem"?"featured-btn active":"featured-btn"} onClick={()=>changeCarousel("featuredItem")}>Featured Item</div>
                <div className={currentslide=="saleItem"?"featured-btn active":"featured-btn"} onClick={()=>changeCarousel("saleItem")}>Sale Item</div>
                <span></span>
            </div>
            <div className="featured-group">
                <Itemlist  dataProps={["category","men's clothing"]} length={4}/>
                <Itemlist  dataProps={["category","women's clothing"]} length={4}/>
                <Itemlist  dataProps={["category","jewelery"]}  length={4}/>
                
            </div>
            <div className="shop-button">
                <div className="btn go-to-btn">Go to Shop</div>
            </div>
            <Promise/>
            
           <Newsletter/>
          
            
        </div>
            </div>
        
        </section>
       




    </>
  )
}

export default Home