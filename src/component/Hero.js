import React from 'react'
import { useState } from 'react'


function Hero() {
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
                  <img src='https://img.freepik.com/free-psd/ramadan-kareem-sale-banner-template-with-3d-online-shopping-mobile-applications_106244-1476.jpg?w=996&t=st=1649579115~exp=1649579715~hmac=58c0914b869e0a58dd0971a9f9f5fbcce60d9f52cf60dba1859039c04583e509' alt="photo" />
                  <div className="hero-img-title">
                     <h2>hallo</h2>
                  </div>
               </div>
               <div className="hero-img">
                   <img src="https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-jeans-clothes-fashion-man_158538-5024.jpg?w=996" alt="" />
                   <div className="hero-img-title">
                      <h2>new trend 2022</h2>
                      <h1>Men's <span className='col-primary'>Collection</span></h1>
                      <button className='hero-img-btn mt-1'>dfsfdsdf</button>

                   </div>
               </div>
               <div className="hero-img">
                  <img src="https://img.freepik.com/free-photo/black-leather-bag-casual-jacket-jeans-hang-decorative-leather-with-copy-space-fashion_603656-256.jpg?w=1060" alt="" />
                  <div className="hero-img-title">
                     <h2>hallo</h2>
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