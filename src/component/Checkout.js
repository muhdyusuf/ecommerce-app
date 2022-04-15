import React, { useState,useEffect } from 'react'
import './Checkout.css'


function Checkout({user}) {
    let stateList=[]
    useEffect(()=>{},[
        fetch('https://jianliew.me/malaysia-api/state/v1/all.json')
        .then(res=>res.json())
        .then(json=>{
            json.map(item=>{
            stateList.push(item.state.replace(/\s/g,"").toLowerCase())
        })
        console.log(stateList)
       })
    ])
    






    const [form,updateForm]=useState({
        firstName:true,
        lastName:true,
        emailAddress:true,
        phone:true,
        address:true,
        townCity:true,
        stateProvince:true,
        country:true,
        postcodeZip:true,
        orderNote:true,

    })
    
    let camelize=(str)=> {
        let newStr=str.replace(/[\/*]/g,"")
        return newStr.replace(/(?:^\w|[A-Z]|\b\w )/g, function(word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/[\s]+/g, '');
      }

   
    
    let ewallet=100.0
    const totalPrice=user.checkout.reduce((total,item)=>item.price*item.quantity+total
    ,0)
    const shippingPrice=user.checkout.reduce((total,item)=>8+total,0)
    const receiveBy=()=>{
        const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"
        ]
        let minDate = new Date()
        minDate.setDate(minDate.getDate() + 5);
        let maxDate = new Date()
        maxDate.setDate(maxDate.getDate() + 8);
        minDate=`${minDate.getDate()} ${monthNames[minDate.getMonth()]}`
        maxDate=`${maxDate.getDate()} ${monthNames[maxDate.getMonth()]}`
       
        return [minDate,maxDate]
        

    }

    function updateInput(e){
        const newForm={...form}
        switch (e.target.name){
            case "phone":{
                const regex=/^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/g
                const isTrue=regex.test(e.target.value)
                isTrue? newForm.phone=e.target.value:newForm.phone=false
                console.log(newForm.phone)

            }
            break;
            case "postcodeZip":{
                const regex=/\d{5}/g
                const isTrue=regex.test(e.target.value)
                isTrue? newForm.postcodeZip=e.target.value:newForm.postcodeZip=false
                console.log(newForm.postcodeZip)

            }
            break;
            case "stateProvince":{
                const regex=e.target.value.replace(/\s/g,"").toLowerCase()
                let isTrue=stateList.some(item=>item==regex)
                isTrue? newForm.stateProvince=regex:newForm.stateProvince=false
                console.log(newForm.stateProvince)
                
            }

            break;
            case "emailAddress":{
                const regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                let isTrue=regex.test(e.target.value)
                isTrue? newForm.emailAddress=e.target.value:newForm.emailAddress=false
                console.log(newForm.emailAddress)
                
            }

            break;
            case "firstName":{
                const regex=/^[a-z]+$/i
                let isTrue=regex.test(e.target.value)
                isTrue? newForm.firstName=e.target.value:newForm.firstName=false
                console.log(newForm.firstName)
                
            }
            break;
            case "lastName":{
                const regex=/^[a-z]+$/i
                let isTrue=regex.test(e.target.value)
                isTrue? newForm.lastName=e.target.value:newForm.lastName=false
                console.log(newForm.lastName)
                
            }
            break;
            case "townCity":{
                const regex=/^[A-Za-z]$/i
                let isTrue=regex.test(e.target.value)
                isTrue? newForm.lastName=e.target.value:newForm.lastName=false
                console.log(newForm.lastName)
                
            }
            break;


        }
        updateForm({...newForm})

    }
    const inputList=()=>{
        const input=[
            {
                name:"First Name",
                className:"input-item"
            },
            {
                name:"Last Name",
                className:"input-item"
            },
            {
                name:"Email Address",
                className:"span input-item"
            },
            {
                name:"Phone",
                className:"span input-item"
            },
            {
                name:"Address",
                className:"span input-item"
            },
            {
                name:"Country",
                className:"input-item"
            },
            {
                name:"State/Province",
                className:"input-item"
            },
            {
                name:"Town/City",
                className:"input-item"
                
            },
            {
                name:"Postcode/Zip",
                className:"input-item"
            },
            
        ]
       return input.map(item=>{
            return(
                <div className={form[camelize(item.name)] ? item.className:`${item.className} invalid`} key={item.name}>
                    <label>{item.name}</label>
                    <input type="text" name={camelize(item.name)} onBlur={(e)=>updateInput(e)}/>

                </div>
            )
        })
        
    }
    



  return (
    <section>
        <div className='page-header'>
                <h1>Checkout</h1>
            </div>
        <div className="container">
            
            <div className="checkout-container">
                <div className="billing-form">
                    <h3>Billing address</h3>
                    <div className="billing-input">
                        {inputList()}
                        <div className="input-item span">
                    <label>Order Note</label>
                    <textarea type="text" name="orderNote" onBlur={(e)=>updateInput(e)}/>

                </div>
                    
                    </div>
                    
                </div>
                <div className="your-order">
                        <div>
                            <h3>Your order</h3>
                        </div>
                        {user.checkout.map(item=>{
                            return(
                                <div className='checkout-list'>
                                    <p>{item.title} <span>x{item.quantity}</span></p>
                                    <p>RM{item.price}</p>

                                </div>
                            )
                        })}
                        <div className="subtotal">
                            <p>Subtotal</p>
                            <p className='col-primary'>RM {totalPrice}</p>
                        </div>
                        <div className="shipping">
                            <div>
                                <p>Shipping</p>
                                <p>{`Receive by ${receiveBy()[0]} - ${receiveBy()[1]}`}</p>
                            </div>
                            
                            <p>RM{shippingPrice}</p>
                           
                        </div>
                        <div className="order-total">
                            <h3>Order total</h3>
                            <p className='col-primary'>RM {totalPrice+shippingPrice}</p>
                        </div>
                        <button className='btn-primary'>Place Order</button>
                    </div>

               
                
            </div>


        </div>
    </section>
  )
}

export default Checkout