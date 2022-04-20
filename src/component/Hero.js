import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {GrFormNext} from'react-icons/gr'


function Hero() {
   let navigate=useNavigate()
     const [currentHero,updateHero]=useState(1)
     
     function changeHero(index){
         if(index==1){
            updateHero(1)
            document.documentElement.style.setProperty('--hero-slider', '0');
         }
         else if(index==2){
            updateHero(2)
            document.documentElement.style.setProperty('--hero-slider', '-100%');
         }
         else if(index==3){
            updateHero(3)
            document.documentElement.style.setProperty('--hero-slider', '-200%');
         }

     }
   
  return (
    <div className="hero">
            <div className="hero-slider">
               <div className="hero-img"> 
                  <img src={process.env.PUBLIC_URL + '/img/mock2.png'} alt="photo" />
                  <div className="hero-img-title">
                      <h2>Shop Online Exclusive</h2>
                      <h1>Body <span className='col-primary'>HandBags</span></h1>
                      <button className='hero-img-btn mt-1'
                      onClick={(e)=>navigate("/shop/?search=bag")}>SHOP NOW <GrFormNext className='col-primary'/></button>

                   </div>
               </div>
               <div className="hero-img">
               <img src={process.env.PUBLIC_URL + '/img/mock1.jpg'} alt=""/>
                   <div className="hero-img-title">
                      <h2>NEW TREND 2022</h2>
                      <h1>Women's <span className='col-primary'>Collection</span></h1>
                      <button className='hero-img-btn mt-1'
                      onClick={(e)=>navigate("/shop/?category=women's clothing")}
                      >SHOP NOW <GrFormNext className='col-primary'/></button>

                   </div>
               </div>
               <div className="hero-img">
                  <img src={process.env.PUBLIC_URL + '/img/mock3.png'} alt="" />
                  <div className="hero-img-title">
                      <h2>NEW TREND 2022</h2>
                      <h1>Men's <span className='col-primary'>Collection</span></h1>
                      <button className='hero-img-btn mt-1' onClick={(e)=>navigate("/shop/?category=men's clothing")}>SHOP NOW <GrFormNext className='col-primary'/></button>

                   </div>
                  
               </div>
               
                
                

            </div>
            <div className="hero-container">
                <div className='hero-btn-container'>
                <button className={currentHero==1? "hero-btn active":"hero-btn"} onClick={()=>changeHero(1)}>01<span></span></button>
                <button className={currentHero==2? "hero-btn active":"hero-btn"} onClick={()=>changeHero(2)}>02<span></span></button>
                <button className={currentHero==3? "hero-btn active":"hero-btn"} onClick={()=>changeHero(3)}>03<span></span></button>
                </div>
             
            </div>
           
    </div>
  )
}

export default Hero