import React from 'react'
import Itemlist from './Itemlist'
import { useSearchParams,useParams } from 'react-router-dom'
import './SHOP.css'
import { useEffect,useState,useContext } from 'react'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import Newsletter from './Newsletter'
import Promise from './Promise'
import {LoginContext,UserContext} from './UserContext'


function Shop() {
  
  const {user,updateUser}=useContext(UserContext)
  const {isLogIn}=useContext(LoginContext)



   const [search,setSearch]=useSearchParams()
   const [dataProps,setdataProps]=useState(["all"])
   const [filterActive,setFilterActive]=useState(false)
   
    if(search.get('search') && search.get('search')!==dataProps[1]){
      let newdata=["search",search.get('search')]
      setdataProps([...newdata])
      console.log(dataProps)
      
    }
    else if(search.get('category') && search.get('category')!==dataProps[1]){
      let newdata=["category",search.get("category")]
      setdataProps([...newdata])
    }
   
    const [shopFilter,updateFilter]=useState({
      min:"",
      max:"",
      category:[],
      rating:"",
      sorter:"relevance"
    })
   
   const [category,setCategory]=useState([])
    useEffect(()=>{
      fetch('https://fakestoreapi.com/products/categories')
      .then(res=>res.json())
      .then(json=>{setCategory([...json])})
    
     },[])
   
    // const getCategory=()=>{
    //   let category=shopItem.map(item=>{
    //     return item.category
    //   })
    //   category=[...new Set(category)]
    //   return category

    // } 
    
    


 

  function setSorter(val){
    let newFilter={...shopFilter}

    if(shopFilter.sorter==val){
      newFilter.sorter="relevance"
    }
    else if(val=="highToLow"){
      newFilter.sorter=val
    }
    else if(val=="lowToHigh"){
      newFilter.sorter=val
    }
    updateFilter({...newFilter})

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
        console.log(val)
        if(val){
           val=parseInt(val.join(""))
        }
        else if(!val){
          val=""
        }
        const newPrice=price

        if(e.target.name=="min"){

          e.target.value=val
          newPrice.min=val
        }
        else if(e.target.name=="max"){
          e.target.value=val
          newPrice.max=val
          
        }
        updatePrice({...newPrice})
        

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
    function resetFilter(){
      const newFilter={
        min:"",
        max:"",
        category:[],
        rating:""
      }
      const checkbox=document.querySelectorAll("#checkbox")
      checkbox.forEach(item=>{
        item.checked=false
      })
      document.getElementById("minPrice").value=null
      document.getElementById("maxPrice").value=null
      setRating(0)
      updateFilter({...newFilter})
    }
   
    
 
  return (
    <section className='shop'>
      <div className="page-header">
        <h1>Shop</h1>
      </div>
      <div className="container">
        <div className="shop-header">
          <p>Showing 1-20</p>
          <button className={filterActive? "filter-btn": "filter-btn active"}
          onClick={()=>setFilterActive(!filterActive)}>{filterActive? "x":"Filter"}</button>
        </div>
         <div className="shop-container">
           {filterActive? <div className="filter-background"></div>: "" }

          <div className={filterActive? "shop-category active":"shop-category"}>
               <h1>Filter</h1>
              <div className="sort-by filter-box">
                <p>Sort by</p>
                <div onClick={()=>setSorter("highToLow")} className={shopFilter.sorter=="highToLow"? "sorter-btn active": "sorter-btn"} >Price: High to Low</div>
                <div onClick={()=>setSorter("lowToHigh")} className={shopFilter.sorter=="lowToHigh"? "sorter-btn active": "sorter-btn"}>Price: Low to High</div>
              </div>
              <div className="price-range filter-box">
                <p>Price</p>
                  <input type="text" placeholder='Min' onChange={(e)=>setPriceRange(e)} id="minPrice" name='min'/>
                  <input type="text" placeholder='Max' 
                  onChange={(e)=>setPriceRange(e)} id="maxPrice" name='max'/>
                  <p className={isPriceValid? "price-alert":"price-alert active"}>Please enter valid price range</p>

                  <button onClick={setPrice}>Apply</button>
              </div>
              <div className="by-category filter-box">
                <p>Category</p>
                {category.map(item=>{
                  return(
                    <div className="category-item" key={item}>
                      <input type="checkbox" value={item} onChange={(e)=>updateCategory(e)} id="checkbox"/>
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

                <div className="filter-box reset">
                <button onClick={resetFilter}>Reset filter</button>
                </div>
              
            

          </div>

          <div className="shop-right">
            
           <div className="shop-item">
           <Itemlist  dataProps={dataProps}  updateFilter={updateFilter} shopFilter={shopFilter} />
          </div>
           </div>
           
         </div>
         <Newsletter/>
         <Promise/>

     
      </div>

    </section>
  )
  
}

export default Shop