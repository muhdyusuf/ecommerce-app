import React, { useRef } from 'react'
import Itemlist from './Itemlist'
import './SHOP.css'
import { useEffect,useState } from 'react'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'


function Shop({user,updateUser}) {
    
    const[shopItem,updateShopItem]=useState([])
    const [shopFilter,updateFilter]=useState({
      min:"",
      max:"",
      category:[],
      rating:""
    })

    useEffect(()=>{
      fetch('https://fakestoreapi.com/products')
      .then(res=>res.json())
      .then(json=>updateShopItem(json))
    
     },[])
   
    const getCategory=()=>{
      let category=shopItem.map(item=>{
        return item.category
      })
      category=[...new Set(category)]
      return category

    } 
    console.log(shopItem)
     
    const getShopItem=()=>{
      
      let filteredItem=shopItem
      if(shopFilter.min!==""){
        filteredItem=filteredItem.filter(item=>{
          if(item.price>=shopFilter.min && item.price<=shopFilter.max) return true
          return false
        })
      }
      
      if(shopFilter.category.length>0){
        filteredItem=filteredItem.filter(item=>{
          let isTrue=shopFilter.category.some(filter=>item.category==filter)
          if(isTrue)return true
          return false

        })
      }
      if(shopFilter.rating){
        filteredItem=filteredItem.filter(item=>{
          if(item.rating.rate>=shopFilter.rating) return true
          return false
        })
      }
     return filteredItem



    }
    function updateCategory(e){
      let newShopFilter=shopFilter
      if(e.target.checked){
        newShopFilter.category.push(e.target.value)

      }
      else if(!e.target.checked){
        const index=newShopFilter.category.indexOf(e.target.value)
        newShopFilter.category.splice(index,1)
      }
      updateFilter({...newShopFilter})
      console.log(shopFilter)

    }
    

    const [rating,setRating]=useState(0)

    function setRatingFilter(val){
      let newShopFilter=shopFilter
     
      
      if(rating==val){
        setRating(0)
        newShopFilter.rating=""
      } 
      else{
        setRating(val)
         newShopFilter.rating=val
      } 
     console.log(shopFilter)

     updateFilter({...newShopFilter})
      
    }
    const [price,updatePrice]=useState({min:"",max:""})

    function setPriceRange(e){
      
        let val=e.target.value.match(/[0-9]/g)
        if(val){
           val=parseInt(val.join(""))
        }
        else if(!val){
          val=""
        }
        const newPrice=price
        if(e.target.name=="min"){
          newPrice.min=e.target.value
          updatePrice({...newPrice})
        }
        else if(e.target.name=="max"){
          newPrice.max=e.target.value
          updatePrice({...newPrice})
        }
        

        
    

    }
   const [isPriceValid,setPriceValid]=useState(true)
    function setPrice(){
      console.log(price.min,price.max)
      if(price.min=="" && price.max==""){
        let newShopFilter=shopFilter
        newShopFilter.min=""
        newShopFilter.max=""
        updateFilter({...newShopFilter})
        setPriceValid(true)

      }
      else if(price.min >= price.max){
        setPriceValid(false)
      }
      else if(price.max>price.min){
        setPriceValid(true)
        let newShopFilter=shopFilter
        newShopFilter.min=price.min
        newShopFilter.max=price.max
        updateFilter({...newShopFilter})
      }
      

    }
   
    
 
  return (
    <section className='shop'>
      <div className="container">
         <div className="shop-container">
           <div className="shop-category">
               <h1>Filter</h1>
            <div className="price-range filter-box">
              <p>Price</p>
                <input type="text" placeholder='Min' name='min' onChange={(e)=>setPriceRange(e)} />
                <input type="text" placeholder='Max' name='max' 
                onChange={(e)=>setPriceRange(e)} />
                <p className={isPriceValid? "price-alert":"price-alert active"}>Please enter valid price range</p>

                <button onClick={setPrice}>Apply</button>
            </div>
            <div className="by-category filter-box">
              <p>Category</p>
              {getCategory().map(item=>{
                return(
                  <div className="category-item" key={item}>
                    <input type="checkbox" value={item} onChange={(e)=>updateCategory(e)}/>
                    <label>{item}</label>
                  </div>
                )
              })}

            </div>
            <div className="by-rating filter-box">
              <p>Rating</p>
              
              
                <div className={rating==5?"rating-item active":"rating-item"}onClick={()=>setRatingFilter(5) }>
                 
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                </div>
                <div className={rating==4?"rating-item active":"rating-item"} onClick={()=>setRatingFilter(4)}>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiOutlineStar/>
                </div>
                <div className={rating==3?"rating-item active":"rating-item"} onClick={()=>setRatingFilter(3)}>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiOutlineStar/>
                    <AiOutlineStar/>
                </div>
                <div className={rating==2?"rating-item active":"rating-item"} onClick={()=>setRatingFilter(2)}>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiOutlineStar/>
                    <AiOutlineStar/>
                    <AiOutlineStar/>
                </div>
                <div className={rating==1?"rating-item active":"rating-item"} onClick={()=>setRatingFilter(1)}>
                    <AiFillStar/>
                    <AiOutlineStar/>
                    <AiOutlineStar/>
                    <AiOutlineStar/>
                    <AiOutlineStar/>
                </div>
            </div>
            
            

           </div>
           <div className="shop-item">
           <Itemlist data={getShopItem()} updateUser={updateUser} user={user}/>
           </div>
           <button>reset</button>
         </div>

     
      </div>

    </section>
  )
  
}

export default Shop