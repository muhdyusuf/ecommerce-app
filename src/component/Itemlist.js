import {React,useEffect,useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'


import {FaHeart,FaRegHeart} from 'react-icons/fa'



import Modal from './Modal'
import './Itemlist.css'



// selector

import {useDispatch,useSelector} from 'react-redux'
import { addCart,addCartQuantity,reduceCartQuantity,mergeCartQuantity} from '../SLICE/cartSlice'
import { addLiked,deleteLiked,updateLiked } from '../SLICE/likedSlice'
import {updateModal} from '../SLICE/utilsSlice'





function Itemlist({dataProps,shopFilter,length}) {

 
  const isLogIn=useSelector(state=>state.authState.isAuthorized)
  const dispatch=useDispatch()


  const cart=useSelector(state=>state.cartState)
  const liked=useSelector(state=>state.likedState)


    const filteredItem=()=>{
        let filteredItem=[...data]
       
        if(!shopFilter) return filteredItem
        if(shopFilter.min!==""){
          filteredItem=filteredItem.filter(item=>{
            if(item.price>=shopFilter.min && item.price<=shopFilter.max) return true
            else{
                return false
            }
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
        if(shopFilter.sorter=="lowToHigh"){
          filteredItem=filteredItem.sort((a,b)=>a.price-b.price)
        }
        if(shopFilter.sorter=="highToLow"){
          filteredItem=filteredItem.sort((a,b)=>b.price-a.price)
        }
   
     
       return filteredItem
  
      }

  
   const [data,updateData]=useState(null)

   useEffect(()=>{
     updateData(null)
       if(dataProps[0]=="all"){
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>updateData(json))
       }
       else if(dataProps[0]=="category"){
        fetch(`https://fakestoreapi.com/products/category/${dataProps[1]}`)
        .then(res=>res.json())
        .then(json=>{
          

          if (length && json.length>length){
            json.splice(length)
            
          }
          
          updateData(json)})

       }
       else if(dataProps[0]=="search"){
        let search
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>{
          search=json
          
          search=search.filter(item=>{
            const obj=Object.values(item)
            let regex=new RegExp(dataProps[1],'gi')
            let isTrue=obj.some(item=>regex.test(item))
            if(isTrue)return true
            return false
          })
          console.log(search)
          if(search.length==0){
            updateData([])
          }
          else{
            updateData([...search])
          }


        })

       }
       

   },dataProps)

   const skeleton=()=>{
     if(data===null|| !data){
      let skeleton=[]
      let skeletonLength=length? length : 20
      for(let i=0;i<skeletonLength;i++){
          skeleton.push(
            <div key={i} className="card"  >
                <div className="card-img skeleton">

                </div>
                <p className="card-title skeleton"></p>
                <p className="card-price skeleton"></p>
             </div>
          )
      }
      return (
        <div className='grid'>
          {skeleton}
        </div>
      )
     }
     else if(data.length===0){
       if(dataProps[0]==="search"){
         return(
           <div className='no-item'>
             <p>No item for keyword '{dataProps[1]}'</p>
           </div>
         )
       }
     }
     else{
       
       return(
         <>{filteredItem().length>0 ? (
          <div className=" grid">
       
          {
               filteredItem().map(item=>(
                   <div key={item.id} className="card"  >
                       <div className="card-img">
                           <img src={item.image} alt="" onClick={()=>{navigate(`/product/${item.id}`)}} />
                           <div className="img-hover" >
                               {isLiked(item)}
                               <button className='btn' onClick={()=>updateUserCart(item)}>ADD TO CART</button>
                           </div>
                       </div>
                       <p className="card-title">{item.title.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}</p>
                       <p className="card-price">RM {item.price}</p>
                   </div>
       
                   )
               )
          }
          
   
   
   
          
          
           
           
       </div>
         ) :
         (
           <div className='no-item'>
             <p>no item match filter</p>
           </div>
         )}
         </>
         
         
        

       )
     }
    
   }
   

  //  const {modal,updateModal}=useContext(UserContext)

    function updateUserCart(val){
        if(!isLogIn){
            navigate(`/login`)
            console.log(isLogIn)
            return
        }
        
        
        const isDuplicate=cart.findIndex(item=>item.id==val.id)
        
        if(isDuplicate<0){
            val.quantity=1
            dispatch(addCart([val]))
        }
        else if(isDuplicate>=0){
            dispatch(addCartQuantity(val))
          
        }

        
       dispatch(updateModal({
         text:"Item added to cart",
         isActive:true
       }))
      
         
    }


    function updateUserLiked(val){
        if(!isLogIn){
            navigate(`/login`)
            return
        }
        else{

        const isDuplicate=liked.findIndex(item=>item.id==val.id)
        if(isDuplicate==-1){
           dispatch(addLiked([val]))
           dispatch(updateModal({
            text:"Item added to liked",
            isActive:true
          }))
           
            
        }
        else if(isDuplicate>=0){
           dispatch(deleteLiked({id:val.id}))

          dispatch(updateModal({
            text:"Item added to liked",
            isActive:true
          }))
            
        }
       
     


        }

         
      }


     const isLiked=(val)=>{
        
       if(!isLogIn){
        return (
          <FaRegHeart onClick={()=>navigate('/login')}/>
      )
       }
    
        const isDuplicate=liked.findIndex(item=>item.id==val.id)
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
    let navigate=useNavigate()
   
   

  return (
    <>
    {skeleton()}
    
    </>
    
  )
}

export default Itemlist
