import React from 'react'
import { useState,useRef,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {GrFormNext} from'react-icons/gr'
import './Hero.css'


function Hero() {
   let navigate=useNavigate()
     const [currentHero,updateHero]=useState(0)

     
  const timeoutRef = useRef(null)

  function resetTimeout() {
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current)}
           
   }

   useEffect(() => {
      resetTimeout()
      timeoutRef.current = setTimeout(()=>
         updateHero((prevIndex) =>
            prevIndex === 2 ? 0 : prevIndex + 1
         ),6000
         
      )
      changeHero(currentHero)
      document.documentElement.style.setProperty('--hero-transition','transform 1s ease-in-out')

      return () => {
         resetTimeout()
      }
   }, [currentHero])
    

  
     function changeHero(index){
         updateHero(index)
         document.documentElement.style.setProperty('--hero-slider',`-${index*100}%`)
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
                <button className={currentHero==0? "hero-btn active":"hero-btn"} onClick={()=>changeHero(0)}>01<span></span></button>
                <button className={currentHero==1? "hero-btn active":"hero-btn"} onClick={()=>changeHero(1)}>02<span></span></button>
                <button className={currentHero==2? "hero-btn active":"hero-btn"} onClick={()=>changeHero(2)}>03<span></span></button>
                </div>
             
            </div>
           
    </div>
  )
}

export default Hero